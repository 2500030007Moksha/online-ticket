import React from "react";
export default function EventFormModal() { return (
<div className={"modal"} id={"eventFormModal"}>
<div className={"modal-box"}>
<span className={"close"} onClick={event => { window.closeEventForm() }}>{"×"}</span>
<h2 id={"formTitle"}>{"Add New Event"}</h2>
<form onSubmit={event => { window.saveEvent(event) }} noValidate={true}>
<label htmlFor={"eventName"}>{"Event Name"}</label>
<input type={"text"} id={"eventName"} placeholder={"Event name"} />
<label htmlFor={"eventCategory"}>{"Event Category"}</label>
<select id={"eventCategory"}>
<option value={""}>{"Select category"}</option>
<option>{"Movies"}</option>
<option>{"Concerts"}</option>
<option>{"Sports"}</option>
<option>{"Theatre"}</option>
</select>
<label htmlFor={"eventDate"}>{"Event Date"}</label>
<input type={"date"} id={"eventDate"} />
<label htmlFor={"eventTime"}>{"Event Time"}</label>
<input type={"time"} id={"eventTime"} />
<label htmlFor={"eventVenue"}>{"Venue"}</label>
<input type={"text"} id={"eventVenue"} placeholder={"Venue, City"} />
<label htmlFor={"eventPrice"}>{"Ticket Price (₹)"}</label>
<input type={"number"} id={"eventPrice"} min={"1"} placeholder={"250"} />
<label htmlFor={"eventSeats"}>{"Available Seats (total seats for this event)"}</label>
<input type={"number"} id={"eventSeats"} min={"1"} max={"2000"} placeholder={"100"} />
<label htmlFor={"eventImage"}>{"Event Image URL"}</label>
<input type={"text"} id={"eventImage"} placeholder={"https://images.unsplash.com/..."} />
<label htmlFor={"eventDescription"}>{"Event Description"}</label>
<textarea id={"eventDescription"} rows={"3"} placeholder={"Short description"}></textarea>
<label htmlFor={"eventDiscount"}>{"Promotion Discount % (optional, 0 to 90)"}</label>
<input type={"number"} id={"eventDiscount"} min={"0"} max={"90"} placeholder={"0"} />
<p className={"form-error"} id={"formError"}></p>
<button type={"submit"} className={"payment-btn"}>{"Save Event"}</button>
</form>
</div>
</div>
); }
