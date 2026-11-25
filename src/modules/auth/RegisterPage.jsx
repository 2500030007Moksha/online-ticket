import React from "react";
export default function RegisterPage() { return (
<div id={"registerPage"} className={"login-body"} style={{"display": "none"}}>
<div className={"login-container"}>
<h1>{"MOVIEBOX"}</h1>
<div className={"line"}></div>
<h2 className={"auth-title"}>{"CREATE ACCOUNT"}</h2>
<form onSubmit={event => { window.registerUser(event) }}>
<label>{"EMAIL ADDRESS"}</label>
<div className={"input-box"}>
<span>{"✉️"}</span>
<input type={"email"} id={"registerEmail"} placeholder={"Enter your email"} required={true} />
</div>
<label>{"PASSWORD"}</label>
<div className={"input-box"}>
<span>{"🔒"}</span>
<input type={"password"} id={"registerPassword"} placeholder={"Create password"} minLength={"6"} required={true} />
</div>
<label>{"CONFIRM PASSWORD"}</label>
<div className={"input-box"}>
<span>{"🔒"}</span>
<input type={"password"} id={"confirmPassword"} placeholder={"Confirm password"} minLength={"6"} required={true} />
</div>
<button type={"submit"} className={"signin-btn"}>{"CREATE ACCOUNT"}</button>
</form>
<button type={"button"} className={"signup-btn"} onClick={event => { window.showLoginPage() }}>{"ALREADY HAVE AN ACCOUNT? LOGIN"}</button>
<div className={"bottom-line"}></div>
<p className={"footer-text"}>{"With "}<span>{"♡"}</span>{" TicketHub"}</p>
</div>
</div>
); }
