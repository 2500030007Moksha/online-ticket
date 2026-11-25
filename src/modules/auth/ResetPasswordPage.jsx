import React from "react";
export default function ResetPasswordPage() { return (
<section id={"resetPasswordPage"} className={"secure-flow-page"} style={{"display": "none"}}>
<div className={"secure-flow-card"}>
<div className={"secure-flow-brand"}>{"🎟️ TicketHub"}</div>
<div className={"secure-flow-icon"}>{"🔐"}</div>
<h1>{"Create New Password"}</h1>
<p className={"secure-flow-subtitle"}>{"Choose a strong password for your TicketHub account."}</p>
<form id={"resetPasswordForm"} onSubmit={event => { window.submitNewPassword(event) }}>
<label htmlFor={"newPassword"}>{"New password"}</label>
<input id={"newPassword"} type={"password"} minLength={"8"} autoComplete={"new-password"} placeholder={"At least 8 characters"} required={true} />
<label htmlFor={"confirmNewPassword"}>{"Confirm new password"}</label>
<input id={"confirmNewPassword"} type={"password"} minLength={"8"} autoComplete={"new-password"} placeholder={"Re-enter your password"} required={true} />
<button className={"secure-flow-primary"} type={"submit"}>{"Update Password"}</button>
<p id={"resetStatus"} className={"secure-flow-status"} aria-live={"polite"}></p>
</form>
<button className={"secure-flow-back"} type={"button"} onClick={event => { window.showLoginPage() }}>{"← Back to Login"}</button>
</div>
</section>
); }
