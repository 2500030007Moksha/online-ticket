import React from "react";
export default function PaymentModal() { return (
<div className={"modal"} id={"paymentModal"}>
<div className={"modal-box"}>
<span className={"close"} onClick={event => { window.closePayment() }}>{"×"}</span>
<h2>{"💳 Checkout"}</h2>
<div id={"checkoutSummary"} className={"price-lines"}></div>
<p>{"Select Payment Method"}</p>
<select id={"paymentMethod"}>
<option>{"UPI"}</option>
<option>{"Credit Card"}</option>
<option>{"Debit Card"}</option>
<option>{"Net Banking"}</option>
</select>
<div className={"notice"}>{"\n            Demo payment: no money is taken and no card or UPI details are collected.\n            A real payment gateway is needed for real payments.\n        "}</div>
<button className={"payment-btn"} onClick={event => { window.makePayment() }}>{"Confirm Booking (Demo Payment)"}</button>
</div>
</div>
); }
