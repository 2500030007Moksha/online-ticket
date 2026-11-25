import React from "react";
export default function DetailsModal() { return (
<div className={"modal"} id={"detailsModal"}>
<div className={"modal-box"}>
<span className={"close"} onClick={event => { window.closeDetails() }}>{"×"}</span>
<h2>{"Event Details"}</h2>
<h3 id={"detailName"}></h3>
<p>{"Category: "}<span id={"detailCategory"}></span></p>
<p>{"Date: "}<span id={"detailDate"}></span></p>
<p>{"Time: "}<span id={"detailTime"}></span></p>
<p>{"Venue: "}<span id={"detailVenue"}></span></p>
<p>{"Ticket Price: "}<span id={"detailPrice"}></span></p>
<p>{"Available Seats: "}<span id={"detailSeats"}></span></p>
<p id={"detailDescription"}></p>
<button className={"book-btn"} id={"detailBookBtn"}>{"Book Now"}</button>
<button className={"details-btn"} onClick={event => { window.closeDetails() }}>{"Close"}</button>
</div>
</div>
); }
