import React from "react";
export default function TicketModal() { return (
<div className={"modal"} id={"ticketModal"}>
<div className={"digital-ticket"} id={"ticketPrintArea"}>
<h2>{"🎟️ DIGITAL TICKET"}</h2>
<div className={"ticket-line"}></div>
<h3 id={"ticketEvent"}></h3>
<p id={"ticketWhen"}></p>
<p id={"ticketVenue"}></p>
<p>{"Booking ID: "}<strong id={"bookingId"}></strong></p>
<p>{"Seats: "}<strong id={"ticketSeats"}></strong></p>
<p>{"Amount: ₹"}<strong id={"ticketAmount"}></strong></p>
<p className={"success"}>{"✓ Booking Confirmed"}</p>
<p className={"small-text"}>{"Demo ticket. Payment not verified by a real gateway."}</p>
<button className={"no-print"} onClick={event => { window.printTicket() }}>{"Print Ticket"}</button>
<button className={"no-print"} onClick={event => { window.closeTicket() }}>{"Close"}</button>
</div>
</div>
); }
