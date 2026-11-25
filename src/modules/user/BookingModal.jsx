import React from "react";
export default function BookingModal() { return (
<div className={"modal"} id={"bookingModal"}>
<div className={"modal-box"}>
<span className={"close"} onClick={event => { window.closeBooking() }}>{"×"}</span>
<h2>{"🎟️ Book Your Ticket"}</h2>
<h3 id={"bookingEvent"}></h3>
<div className={"price-lines"}>
<p><span>{"Original Price"}</span><span id={"bookingPrice"}></span></p>
<p id={"discountRow"}><span>{"Discounted Price"}</span><span id={"bookingFinalPrice"}></span></p>
</div>
<h3>{"Select Seats (max 10)"}</h3>
<div className={"screen"}>{"SCREEN"}</div>
<div className={"seat-container seat-map"} id={"seatMap"}></div>
<p className={"legend"}>{"Green = available, Blue = selected, Grey = booked"}</p>
<div className={"price-lines"}>
<p><span>{"Selected Seats"}</span><span id={"selectedSeats"}>{"None"}</span></p>
<p><span>{"Number of Tickets"}</span><span id={"seatCount"}>{"0"}</span></p>
<p className={"total-line"}><span>{"Total Payable"}</span><span>{"₹"}<span id={"totalAmount"}>{"0"}</span></span></p>
</div>
<button className={"payment-btn"} onClick={event => { window.showPayment() }}>{"Proceed to Checkout"}</button>
</div>
</div>
); }
