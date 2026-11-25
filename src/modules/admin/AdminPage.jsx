import React from "react";
export default function AdminPage() { return (
<div id={"adminPage"} className={"main-page"}>
<header>
<div className={"logo"}>{"🎟️ TicketHub Admin"}</div>
<div className={"menu"}>
<span onClick={event => { window.scrollToId('adminDashboard') }}>{"Dashboard"}</span>
<span onClick={event => { window.scrollToId('adminEvents') }}>{"Events"}</span>
<span onClick={event => { window.scrollToId('adminBookings') }}>{"Bookings"}</span>
<span onClick={event => { window.scrollToId('adminSales') }}>{"Sales"}</span>
<span onClick={event => { window.scrollToId('adminCollections') }}>{"Collections"}</span>
<span onClick={event => { window.logout() }}>{"Logout"}</span>
</div>
</header>
<div className={"category-bar"} id={"adminCategoryBar"}>
<button data-cat={"All"} onClick={event => { window.adminFilter('All') }}>{"🏠 All"}</button>
<button data-cat={"Movies"} onClick={event => { window.adminFilter('Movies') }}>{"🎬 Movies"}</button>
<button data-cat={"Concerts"} onClick={event => { window.adminFilter('Concerts') }}>{"🎵 Concerts"}</button>
<button data-cat={"Sports"} onClick={event => { window.adminFilter('Sports') }}>{"🏏 Sports"}</button>
<button data-cat={"Theatre"} onClick={event => { window.adminFilter('Theatre') }}>{"🎭 Theatre"}</button>
</div>
<section className={"welcome"} id={"adminDashboard"}>
<h1>{"Admin Dashboard"}</h1>
<p>{"Manage events, monitor bookings and view ticket sales."}</p>
</section>
<section className={"section"}>
<div className={"stat-grid"}>
<div className={"stat-card"}><h3 id={"statEvents"}>{"0"}</h3><p>{"Total Events"}</p></div>
<div className={"stat-card"}><h3 id={"statBookings"}>{"0"}</h3><p>{"Total Bookings"}</p></div>
<div className={"stat-card"}><h3 id={"statTickets"}>{"0"}</h3><p>{"Tickets Sold"}</p></div>
<div className={"stat-card"}><h3 id={"statAmount"}>{"₹0"}</h3><p>{"Total Collections"}</p><small>{"Booking amount, payment not verified"}</small></div>
</div>
<div className={"notice"}>{"\n            Demo notice: data is saved in this browser only (localStorage). Booking amounts are not real money\n            collected. Real collections need a payment gateway and a backend database.\n        "}</div>
</section>
<section className={"section"} id={"adminEvents"}>
<div className={"section-head"}>
<h2>{"Manage Events"}</h2>
<div>
<button className={"small-btn"} onClick={event => { window.openEventForm() }}>{"+ Add New Event"}</button>
<button className={"small-btn danger"} onClick={event => { window.resetDemoData() }}>{"Reset Demo Data"}</button>
</div>
</div>
<p className={"filter-note"} id={"adminFilterNote"}></p>
<div className={"table-wrap"}>
<table>
<thead>
<tr>
<th>{"Image"}</th><th>{"Event"}</th><th>{"Category"}</th><th>{"Date & Time"}</th><th>{"Venue"}</th>
<th>{"Price"}</th><th>{"Seats (Available / Total)"}</th><th>{"Actions"}</th>
</tr>
</thead>
<tbody id={"adminEventsBody"}></tbody>
</table>
</div>
</section>
<section className={"section"} id={"adminBookings"}>
<div className={"section-head"}><h2>{"Customer Bookings"}</h2></div>
<div className={"table-wrap"}>
<table>
<thead>
<tr>
<th>{"Booking ID"}</th><th>{"Customer"}</th><th>{"Event"}</th><th>{"Seats"}</th>
<th>{"Qty"}</th><th>{"Amount"}</th><th>{"Status"}</th><th>{"Booked On"}</th>
</tr>
</thead>
<tbody id={"adminBookingsBody"}></tbody>
</table>
</div>
</section>
<section className={"section"} id={"adminSales"}>
<div className={"section-head"}><h2>{"Ticket Sales Details"}</h2></div>
<div className={"table-wrap"}>
<table>
<thead>
<tr>
<th>{"Event"}</th><th>{"Category"}</th><th>{"Total Seats"}</th><th>{"Tickets Sold"}</th>
<th>{"Seats Left"}</th><th>{"Booking Amount"}</th>
</tr>
</thead>
<tbody id={"adminSalesBody"}></tbody>
</table>
</div>
</section>
<section className={"section"} id={"adminCollections"}>
<div className={"section-head"}><h2>{"Collection Summary"}</h2></div>
<div className={"table-wrap"}>
<table>
<thead>
<tr><th>{"Category"}</th><th>{"Bookings"}</th><th>{"Tickets Sold"}</th><th>{"Booking Amount"}</th></tr>
</thead>
<tbody id={"adminCollectionBody"}></tbody>
</table>
</div>
<div className={"notice"}>{"\n            Booking amount = value of tickets booked in this demo. Verified collection (confirmed by a real\n            payment gateway): "}<strong>{"₹0"}</strong>{". Bookings for deleted events stay in the records.\n        "}</div>
</section>
<footer>
<h2>{"TicketHub Admin"}</h2>
<p>{"Copyright © 2026 TicketHub"}</p>
</footer>
</div>
); }
