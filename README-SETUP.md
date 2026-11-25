# TicketHub – Updated Project

## What changed
- Added separately styled Forgot Password and Reset Password pages.
- Added a separate secure checkout page with UPI QR, Credit/Debit Card and Net Banking choices.
- Added a Node.js backend scaffold for password reset, Razorpay payments, and email/SMS notifications.
- Existing home, login/register layout, event cards, admin dashboard, and existing site CSS rules are preserved. New CSS is isolated under `.secure-flow-*` selectors.

## Run locally
1. Install Node.js 18 or newer.
2. Open a terminal in `ONLINE_TICKET/server`.
3. Run `npm install`.
4. Copy `.env.example` to `.env` and fill in your provider credentials.
5. Run `npm start`.
6. Open `http://localhost:3000/online_ticket_admin.html`.

## Configure email password reset
Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, and PUBLIC_BASE_URL.
Reset links expire after 30 minutes and are single-use. Passwords are hashed with bcrypt.

## Configure Razorpay
Use Razorpay TEST credentials first. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.
Enable UPI QR Codes for the merchant account if using the single-use QR endpoint.
Configure the webhook URL as `https://YOUR_DOMAIN/api/payments/webhook` and set RAZORPAY_WEBHOOK_SECRET.
The supplied phone number 9392536699 is not automatically a UPI ID or verified merchant account. Link/verify the intended UPI account with the payment provider before live transactions.

## Configure SMS
Set Twilio account credentials and an approved sender number. Set the customer's mobile number at registration in the backend API. SMS delivery requires a valid provider account, sender configuration and applicable regional compliance.

## Important implementation notes / remaining setup
- Real email, payments and SMS cannot operate until valid service credentials and a deployed HTTPS backend are configured.
- Razorpay Checkout handles sensitive card/bank authentication; this website does not store card numbers, CVV or banking passwords.
- The current legacy front-end registration/login still stores demo accounts in Local Storage. To use the new server-side password reset in a real deployment, customer registration/login must be fully switched to `/api/auth/register` and `/api/auth/login`, and existing demo accounts must be re-registered. Do not use Local Storage authentication for a live production service.
- For production ticket inventory, event and seat availability must also be moved from Local Storage into the backend database with atomic seat reservation. This ZIP preserves the original demo event/admin workflow and provides the payment/auth integration foundation, not a complete production ticketing platform.
- Do not use live credentials in source code or commit `.env`.
