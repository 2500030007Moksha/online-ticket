import React from "react";
export default function LoginPage() { return (
<div id={"loginPage"} className={"login-body"}>
<div className={"login-container"}>
<h1>{"MOVIEBOX"}</h1>
<div className={"line"}></div>
<div className={"role-tabs"}>
<button type={"button"} id={"customerTab"} className={"active"} onClick={event => { window.setLoginRole('customer') }}>{"CUSTOMER LOGIN"}</button>
<button type={"button"} id={"adminTab"} onClick={event => { window.setLoginRole('admin') }}>{"ADMIN LOGIN"}</button>
</div>
<h2 className={"auth-title"} id={"loginTitle"}>{"CUSTOMER LOGIN"}</h2>
<form onSubmit={event => { window.loginUser(event) }}>
<label>{"EMAIL ADDRESS"}</label>
<div className={"input-box"}>
<span>{"✉️"}</span>
<input type={"email"} id={"loginEmail"} placeholder={"Enter your email"} required={true} />
</div>
<label>{"PASSWORD"}</label>
<div className={"input-box"}>
<span>{"🔒"}</span>
<input type={"password"} id={"loginPassword"} placeholder={"Password"} required={true} />
</div>
<div className={"login-options"}>
<label className={"remember"}>
<input type={"checkbox"} id={"keepSignedIn"} />{" Keep me Signed in\n                "}</label>
<a href={"#"} id={"forgotLink"} onClick={event => { window.forgotPassword(); event.preventDefault(); }}>{"Forgot Password?"}</a>
</div>
<p className={"demo-hint"} id={"adminHint"} style={{"display": "none"}}>{"\n                Demo admin login:"}<br />{"\n                admin@tickethub.com / admin123"}<br />{"\n                (Frontend demo only. Real admin login needs a secure backend.)\n            "}</p>
<button type={"submit"} className={"signin-btn"}>{"SIGN IN"}</button>
</form>
<button type={"button"} className={"signup-btn"} id={"registerBtn"} onClick={event => { window.showRegisterPage() }}>{"NEW CUSTOMER? REGISTER"}</button>
<div className={"bottom-line"}></div>
<p className={"footer-text"}>{"With "}<span>{"♡"}</span>{" TicketHub"}</p>
</div>
</div>
); }
