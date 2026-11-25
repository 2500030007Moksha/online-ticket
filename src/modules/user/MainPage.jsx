import React from "react";
export default function MainPage() { return (
<div id={"mainPage"} className={"main-page"}>
<header>
<div className={"logo"}>{"🎟️ TicketHub"}</div>
<div className={"search-box"}>
<input type={"text"} id={"searchInput"} placeholder={"Search Movies, Concerts, Sports, Theatre..."} />
<button onClick={event => { window.searchEvents() }}>{"Search"}</button>
</div>
<div className={"menu"}>
<span onClick={event => { window.goHome() }}>{"Home"}</span>
<span onClick={event => { window.showBookings() }}>{"My Bookings"}</span>
<span onClick={event => { window.logout() }}>{"Logout"}</span>
</div>
</header>
<div className={"category-bar"} id={"customerCategoryBar"}>
<button data-cat={"All"} onClick={event => { window.filterEvents('All') }}>{"🏠 All"}</button>
<button data-cat={"Movies"} onClick={event => { window.filterEvents('Movies') }}>{"🎬 Movies"}</button>
<button data-cat={"Concerts"} onClick={event => { window.filterEvents('Concerts') }}>{"🎵 Concerts"}</button>
<button data-cat={"Sports"} onClick={event => { window.filterEvents('Sports') }}>{"🏏 Sports"}</button>
<button data-cat={"Theatre"} onClick={event => { window.filterEvents('Theatre') }}>{"🎭 Theatre"}</button>
</div>

<div id={"homeView"}>
<section className={"banner"}>
<div>
<h1>{"ONLINE TICKET BOOKING"}</h1>
<p>{"Book Movies, Concerts, Sports & Theatre Events"}</p>
<button onClick={event => { window.scrollToEvents() }}>{"Explore Events"}</button>
</div>
</section>
<section className={"welcome"}>
<h1>{"Welcome to TicketHub"}</h1>
<p id={"welcomeText"}>{"Book your favourite events quickly, securely and conveniently."}</p>
</section>
<section className={"section"}>
<h2>{"Categories"}</h2>
<div className={"category-container"}>
<div className={"category-card"} onClick={event => { window.filterEvents('Movies') }}>
<div>{"🎬"}</div><h3>{"Movies"}</h3><p>{"Latest Movies"}</p>
</div>
<div className={"category-card"} onClick={event => { window.filterEvents('Concerts') }}>
<div>{"🎵"}</div><h3>{"Concerts"}</h3><p>{"Live Music Events"}</p>
</div>
<div className={"category-card"} onClick={event => { window.filterEvents('Sports') }}>
<div>{"🏏"}</div><h3>{"Sports"}</h3><p>{"Sports Matches"}</p>
</div>
<div className={"category-card"} onClick={event => { window.filterEvents('Theatre') }}>
<div>{"🎭"}</div><h3>{"Theatre"}</h3><p>{"Drama & Shows"}</p>
</div>
</div>
</section>
<section className={"section"} id={"events"}>
<h2 id={"eventsHeading"}>{"Upcoming Events"}</h2>
<div className={"event-container"} id={"eventContainer"}></div>
<p className={"empty-message"} id={"noEvents"} style={{"display": "none"}}>{"No events found for this selection."}</p>
</section>
<section className={"section"}>
<h2>{"Popular Events"}</h2>
<div className={"popular-container"} id={"popularContainer"}></div>
</section>
<section className={"services"}>
<div><h3>{"🎟️ Easy Booking"}</h3><p>{"Book tickets easily online."}</p></div>
<div><h3>{"🔒 Secure Payment"}</h3><p>{"Safe and secure payment."}</p></div>
<div><h3>{"📱 Digital Ticket"}</h3><p>{"Get your ticket instantly."}</p></div>
<div><h3>{"🎧 24 × 7 Support"}</h3><p>{"Customer support anytime."}</p></div>
</section>
<section className={"organizer"}>
<h2>{"Organizers"}</h2>
<p>{"Organizers manage event details, monitor ticket sales and offer promotions through the TicketHub admin dashboard."}</p>
</section>
</div>

<div id={"bookingsView"} style={{"display": "none"}}>
<section className={"section"}>
<h2>{"My Bookings"}</h2>
<div className={"table-wrap"}>
<table>
<thead>
<tr>
<th>{"Booking ID"}</th><th>{"Event"}</th><th>{"Date & Time"}</th><th>{"Seats"}</th>
<th>{"Amount"}</th><th>{"Status"}</th><th>{"Ticket"}</th>
</tr>
</thead>
<tbody id={"myBookingsBody"}></tbody>
</table>
</div>
<p className={"empty-message"} id={"noMyBookings"} style={{"display": "none"}}>{"You have no bookings yet."}</p>
</section>
</div>
<footer>
<h2>{"TicketHub"}</h2>
<p className={"footer-links"}>
<span onClick={event => { window.goHome() }}>{"Home"}</span>{" |\n            "}<span onClick={event => { window.scrollToEvents() }}>{"Events"}</span>{" |\n            "}<span onClick={event => { window.filterEvents('All') }}>{"Categories"}</span>{" |\n            "}<span onClick={event => { window.showBookings() }}>{"My Bookings"}</span>{" |\n            "}<span onClick={event => { window.showInfo('Contact us at support@tickethub.example (demo).') }}>{"Contact Us"}</span>{" |\n            "}<span onClick={event => { window.showInfo('Help: choose an event, select seats, pay, and get your digital ticket.') }}>{"Help"}</span>
</p>
<p>{"Copyright © 2026 TicketHub"}</p>
</footer>
</div>
); }
