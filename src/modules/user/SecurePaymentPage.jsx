import React from "react";
export default function SecurePaymentPage() { return (
<section id={"securePaymentPage"} className={"secure-flow-page"} style={{"display": "none"}}>
<div className={"secure-payment-shell"}>
<div className={"secure-payment-heading"}>
<div className={"secure-flow-brand"}>{"🎟️ TicketHub Checkout"}</div>
<h1>{"Complete Your Booking"}</h1>
<p>{"Secure payment protected by your payment provider"}</p>
</div>
<div className={"secure-payment-grid"}>
<div className={"secure-payment-card"}>
<h2>{"Booking Summary"}</h2>
<div id={"secureCheckoutSummary"} className={"secure-summary-lines"}></div>
<div className={"secure-security-note"}>{"🔒 Your card and banking credentials are handled only by the payment gateway. TicketHub never stores your card number, CVV or banking password."}</div>
</div>
<div className={"secure-payment-card"}>
<h2>{"Choose Payment Method"}</h2>
<div className={"secure-method-list"}>
<label><input type={"radio"} name={"secureMethod"} defaultValue={"upi"} defaultChecked={true} /> <span>{"▦"}</span>{" UPI / Scan QR"}</label>
<label><input type={"radio"} name={"secureMethod"} defaultValue={"card"} /> <span>{"💳"}</span>{" Credit / Debit Card"}</label>
<label><input type={"radio"} name={"secureMethod"} defaultValue={"netbanking"} /> <span>{"🏦"}</span>{" Net Banking"}</label>
</div>
<div id={"secureUpiPanel"} className={"secure-upi-panel"}>
<p>{"Generate a single-use QR code for this booking amount."}</p>
<button type={"button"} className={"secure-flow-primary"} onClick={event => { window.startUpiQrPayment() }}>{"Generate UPI QR Code"}</button>
<div id={"upiQrResult"} className={"secure-qr-result"} aria-live={"polite"}></div>
</div>
<div id={"secureGatewayPanel"} className={"secure-gateway-panel"} style={{"display": "none"}}>
<p>{"Continue to the secure payment gateway to pay using your selected method."}</p>
<button type={"button"} className={"secure-flow-primary"} onClick={event => { window.startGatewayPayment() }}>{"Continue to Secure Payment"}</button>
</div>
<button type="button" className="secure-flow-primary" onClick={() => window.confirmDemoCheckout()}>Confirm Demo Booking (No Charge)</button><p id={"paymentStatus"} className={"secure-flow-status"} aria-live={"polite"}></p>
<button type={"button"} className={"secure-flow-back"} onClick={event => { window.cancelSecurePayment() }}>{"← Back to seat selection"}</button>
</div>
</div>
</div>
</section>
); }
