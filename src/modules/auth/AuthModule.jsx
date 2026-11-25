import React from "react";
import RegisterPage from "./RegisterPage.jsx";
import LoginPage from "./LoginPage.jsx";
import ForgotPasswordPage from "./ForgotPasswordPage.jsx";
import ResetPasswordPage from "./ResetPasswordPage.jsx";
export default function AuthModule() { return <>
<RegisterPage />
<LoginPage />
<ForgotPasswordPage />
<ResetPasswordPage />
</>; }
