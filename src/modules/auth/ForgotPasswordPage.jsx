import React from "react";
export default function ForgotPasswordPage() { return (
<section id={"forgotPasswordPage"} className={"secure-flow-page"} style={{"display": "none"}}>
<div className={"secure-flow-card"}>
<div className={"secure-flow-brand"}>{"🎟️ TicketHub"}</div>
<div className={"secure-flow-icon"}>{"✉️"}</div>
<h1>{"Forgot Password?"}</h1>
<p className={"secure-flow-subtitle"}>{"Enter your registered email address. We'll send you a secure password reset link."}</p>
<form id={"forgotPasswordForm"} onSubmit={event => { window.requestPasswordReset(event) }}>
<label htmlFor={"forgotEmail"}>{"Email address"}</label>
<input id={"forgotEmail"} type={"email"} placeholder={"you@example.com"} required={true} />
<button className={"secure-flow-primary"} type={"submit"}>{"Send Reset Link"}</button>
<p id={"forgotStatus"} className={"secure-flow-status"} aria-live={"polite"}></p>
</form>
<button className={"secure-flow-back"} type={"button"} onClick={event => { window.showLoginPage() }}>{"← Back to Login"}</button>
</div>
</section>
); }
