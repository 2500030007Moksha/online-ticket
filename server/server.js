require("dotenv").config();
const express = require("express");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const twilio = require("twilio");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "..", "dist")));

const db = new Database(path.join(__dirname, "tickethub.sqlite"));
db.pragma("journal_mode = WAL");
db.exec(`
CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL,
 password_hash TEXT NOT NULL, mobile TEXT, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS reset_tokens (
 token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL, expires_at INTEGER NOT NULL,
 used INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS payments (
 id INTEGER PRIMARY KEY AUTOINCREMENT, gateway_order_id TEXT UNIQUE,
 qr_code_id TEXT UNIQUE, user_email TEXT NOT NULL, event_id TEXT NOT NULL,
 payload_json TEXT NOT NULL, amount_paise INTEGER NOT NULL,
 status TEXT NOT NULL DEFAULT 'created', gateway_payment_id TEXT,
 created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS bookings (
 id TEXT PRIMARY KEY, user_email TEXT NOT NULL, event_id TEXT NOT NULL,
 event_name TEXT NOT NULL, seats_json TEXT NOT NULL, amount_paise INTEGER NOT NULL,
 payment_id TEXT NOT NULL, created_at TEXT NOT NULL
);
`);

const mailer = process.env.SMTP_HOST ? nodemailer.createTransport({
 host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587),
 secure: String(process.env.SMTP_SECURE) === "true",
 auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
}) : null;

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
 ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET }) : null;

const smsClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
 ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) : null;

function requireRazorpay(res) {
 if (!razorpay) { res.status(503).json({ message: "Payment gateway is not configured. Add Razorpay credentials to server/.env." }); return false; }
 return true;
}
function hashToken(token) { return crypto.createHash("sha256").update(token).digest("hex"); }
function safeEmail(value) { return String(value || "").trim().toLowerCase(); }
function validateBooking(body) {
 const amount = Number(body.amount);
 if (!body.eventId || !body.eventName || !Array.isArray(body.seats) ||
     body.seats.length < 1 || body.seats.length > 10 ||
     !Number.isFinite(amount) || amount <= 0) return false;
 return true;
}
function makeBookingId() { return "TH" + Date.now().toString(36).toUpperCase() + crypto.randomBytes(3).toString("hex").toUpperCase(); }
async function sendConfirmation(email, booking, mobile) {
 const text = `TicketHub: Your payment of INR ${(booking.amount_paise/100).toFixed(2)} was successful. Booking ${booking.id} for ${booking.event_name}, ${booking.seats.length} ticket(s), is confirmed.`;
 if (mailer && process.env.MAIL_FROM) {
   await mailer.sendMail({ from: process.env.MAIL_FROM, to: email, subject: "TicketHub booking confirmation", text });
 }
 if (smsClient && mobile && process.env.TWILIO_FROM) {
   await smsClient.messages.create({ body: text, from: process.env.TWILIO_FROM, to: mobile });
 }
}

// Customer registration stores only a password hash.
app.post("/api/auth/register", async (req, res) => {
 try {
  const email = safeEmail(req.body.email), password = String(req.body.password || "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) return res.status(400).json({message:"Enter a valid email and a password of at least 8 characters."});
  const hash = await bcrypt.hash(password, 12);
  db.prepare("INSERT INTO users(email,password_hash,mobile,created_at) VALUES(?,?,?,?)")
    .run(email, hash, String(req.body.mobile || ""), new Date().toISOString());
  res.json({message:"Registration successful. Please log in."});
 } catch (e) { res.status(409).json({message:"Unable to create account. The email may already be registered."}); }
});
app.post("/api/auth/login", async (req, res) => {
 const email = safeEmail(req.body.email), user = db.prepare("SELECT * FROM users WHERE email=?").get(email);
 if (!user || !(await bcrypt.compare(String(req.body.password || ""), user.password_hash))) return res.status(401).json({message:"Incorrect email or password."});
 res.json({email:user.email});
});
app.post("/api/auth/forgot-password", async (req, res) => {
 const email = safeEmail(req.body.email);
 const generic = "If an account exists for this email, password reset instructions have been sent.";
 const user = db.prepare("SELECT * FROM users WHERE email=?").get(email);
 if (user && mailer && process.env.MAIL_FROM && process.env.PUBLIC_BASE_URL) {
   const token = crypto.randomBytes(32).toString("hex"), expires = Date.now() + 30*60*1000;
   db.prepare("INSERT INTO reset_tokens(token_hash,user_id,expires_at) VALUES(?,?,?)").run(hashToken(token), user.id, expires);
   const link = `${process.env.PUBLIC_BASE_URL}/?resetToken=${token}`;
   try { await mailer.sendMail({from:process.env.MAIL_FROM,to:user.email,subject:"Reset your TicketHub password",text:`Use this secure link within 30 minutes to reset your password:\n\n${link}\n\nIf you did not request this, ignore this email.`}); }
   catch (e) { console.error("Reset email delivery failed:", e.message); }
 } else if (user) console.warn("Password reset requested, but SMTP or PUBLIC_BASE_URL is not configured.");
 res.json({message:generic});
});
app.post("/api/auth/reset-password", async (req, res) => {
 const token = String(req.body.token || ""), password = String(req.body.password || "");
 if (password.length < 8) return res.status(400).json({message:"Password must contain at least 8 characters."});
 const row = db.prepare("SELECT * FROM reset_tokens WHERE token_hash=? AND used=0 AND expires_at>?").get(hashToken(token), Date.now());
 if (!row) return res.status(400).json({message:"Reset link is invalid, expired or already used."});
 const hash = await bcrypt.hash(password, 12);
 const update = db.transaction(() => {
  db.prepare("UPDATE users SET password_hash=? WHERE id=?").run(hash, row.user_id);
  db.prepare("UPDATE reset_tokens SET used=1 WHERE token_hash=?").run(row.token_hash);
 });
 update();
 res.json({message:"Password updated successfully."});
});

// Razorpay Checkout order for cards, UPI intent and net banking.
app.post("/api/payments/order", async (req, res) => {
 if (!requireRazorpay(res)) return;
 if (!validateBooking(req.body)) return res.status(400).json({message:"Invalid booking details."});
 try {
  const amountPaise = Math.round(Number(req.body.amount)*100);
  const order = await razorpay.orders.create({amount:amountPaise,currency:"INR",receipt:makeBookingId(),notes:{event_id:String(req.body.eventId),customer_email:safeEmail(req.body.email)}});
  db.prepare("INSERT INTO payments(gateway_order_id,user_email,event_id,payload_json,amount_paise,status,created_at) VALUES(?,?,?,?,?,'created',?)")
   .run(order.id,safeEmail(req.body.email),String(req.body.eventId),JSON.stringify(req.body),amountPaise,new Date().toISOString());
  res.json({keyId:process.env.RAZORPAY_KEY_ID,orderId:order.id,amount:order.amount});
 } catch(e) { console.error(e); res.status(502).json({message:"Unable to create payment order."}); }
});

// Razorpay single-use, fixed-amount UPI QR. UPI account/phone must be configured with the gateway.
app.post("/api/payments/upi-qr", async (req, res) => {
 if (!requireRazorpay(res)) return;
 if (!validateBooking(req.body)) return res.status(400).json({message:"Invalid booking details."});
 try {
  const amountPaise = Math.round(Number(req.body.amount)*100);
  const auth = Buffer.from(process.env.RAZORPAY_KEY_ID+":"+process.env.RAZORPAY_KEY_SECRET).toString("base64");
  const qrResponse = await fetch("https://api.razorpay.com/v1/payments/qr_codes", {
   method:"POST", headers:{"Authorization":"Basic "+auth,"Content-Type":"application/json"},
   body:JSON.stringify({type:"upi_qr",name:"TicketHub booking",usage:"single_use",fixed_amount:true,payment_amount:amountPaise,
    description:"TicketHub "+String(req.body.eventName).slice(0,80),close_by:Math.floor(Date.now()/1000)+300})
  });
  const qr = await qrResponse.json();
  if (!qrResponse.ok) throw new Error(qr.error?.description || "QR creation failed");
  db.prepare("INSERT INTO payments(qr_code_id,user_email,event_id,payload_json,amount_paise,status,created_at) VALUES(?,?,?,?,?,'created',?)")
   .run(qr.id,safeEmail(req.body.email),String(req.body.eventId),JSON.stringify(req.body),amountPaise,new Date().toISOString());
  res.json({qrCodeId:qr.id,imageUrl:qr.image_url});
 } catch(e) { console.error(e); res.status(502).json({message:"Unable to create UPI QR. Confirm that QR payments are enabled for your Razorpay account and credentials are configured."}); }
});
app.get("/api/payments/upi-qr/:id", async (req, res) => {
 if (!requireRazorpay(res)) return;
 const row = db.prepare("SELECT * FROM payments WHERE qr_code_id=?").get(req.params.id);
 if (!row) return res.status(404).json({message:"QR payment not found."});
 try {
  const auth = Buffer.from(process.env.RAZORPAY_KEY_ID+":"+process.env.RAZORPAY_KEY_SECRET).toString("base64");
  const response = await fetch(`https://api.razorpay.com/v1/payments?count=100`,{headers:{"Authorization":"Basic "+auth}});
  const data = await response.json();
  const payment = (data.items || []).find(p => p.qr_code_id === req.params.id && p.status === "captured");
  if (payment && row.status !== "paid") {
    db.prepare("UPDATE payments SET status='paid',gateway_payment_id=? WHERE qr_code_id=?").run(payment.id,req.params.id);
    const booking = await createBookingFromPayment(row,payment.id);
    return res.json({status:"paid",booking});
  }
  res.json({status:row.status === "paid" ? "paid" : "pending"});
 } catch(e) { res.status(502).json({message:"Could not check QR payment status."}); }
});

async function createBookingFromPayment(paymentRow, paymentId) {
 const payload = JSON.parse(paymentRow.payload_json);
 const id = makeBookingId();
 const booking = {id,user_email:paymentRow.user_email,event_id:paymentRow.event_id,event_name:payload.eventName,seats:payload.seats,amount_paise:paymentRow.amount_paise,payment_id:paymentId};
 db.prepare("INSERT OR IGNORE INTO bookings(id,user_email,event_id,event_name,seats_json,amount_paise,payment_id,created_at) VALUES(?,?,?,?,?,?,?,?)")
  .run(id,booking.user_email,booking.event_id,booking.event_name,JSON.stringify(booking.seats),booking.amount_paise,paymentId,new Date().toISOString());
 const user = db.prepare("SELECT mobile FROM users WHERE email=?").get(booking.user_email);
 try { await sendConfirmation(booking.user_email,booking,user?.mobile); } catch(e) { console.error("Notification failed:",e.message); }
 return {id:booking.id,amount:booking.amount_paise/100,status:"Confirmed"};
}
app.post("/api/payments/verify", async (req, res) => {
 if (!requireRazorpay(res)) return;
 const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
 const expected = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id+"|"+razorpay_payment_id).digest("hex");
 if (!razorpay_signature || !crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(String(razorpay_signature)))) return res.status(400).json({verified:false,message:"Payment signature verification failed."});
 const row = db.prepare("SELECT * FROM payments WHERE gateway_order_id=?").get(razorpay_order_id);
 if (!row) return res.status(404).json({verified:false,message:"Payment order not found."});
 try {
  const payment = await razorpay.payments.fetch(razorpay_payment_id);
  if (payment.status !== "captured" || payment.order_id !== razorpay_order_id || payment.amount !== row.amount_paise) return res.status(400).json({verified:false,message:"Payment is not captured or amount does not match."});
  db.prepare("UPDATE payments SET status='paid',gateway_payment_id=? WHERE gateway_order_id=?").run(payment.id,razorpay_order_id);
  const booking = await createBookingFromPayment(row,payment.id);
  res.json({verified:true,booking:{id:booking.id,amount:booking.amount,status:booking.status}});
 } catch(e) { console.error(e); res.status(502).json({verified:false,message:"Unable to verify payment with gateway."}); }
});

// Webhook: configure this endpoint in Razorpay Dashboard and set RAZORPAY_WEBHOOK_SECRET.
app.post("/api/payments/webhook", express.raw({type:"application/json"}), async (req,res) => {
 const signature = req.headers["x-razorpay-signature"];
 const expected = crypto.createHmac("sha256",process.env.RAZORPAY_WEBHOOK_SECRET || "").update(req.body).digest("hex");
 if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET || signature !== expected) return res.status(400).send("Invalid webhook signature");
 const event = JSON.parse(req.body.toString());
 if (event.event === "payment.captured") {
  const p = event.payload?.payment?.entity;
  if (p?.order_id) db.prepare("UPDATE payments SET status='paid',gateway_payment_id=? WHERE gateway_order_id=?").run(p.id,p.order_id);
 }
 res.json({received:true});
});

app.get("/api/health", (req,res) => res.json({ok:true,service:"TicketHub backend"}));
const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`TicketHub running at http://localhost:${port}`));
