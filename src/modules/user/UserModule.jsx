import React from "react";
import MainPage from "./MainPage.jsx";
import SecurePaymentPage from "./SecurePaymentPage.jsx";
import DetailsModal from "./DetailsModal.jsx";
import BookingModal from "./BookingModal.jsx";
import PaymentModal from "./PaymentModal.jsx";
import TicketModal from "./TicketModal.jsx";
export default function UserModule() { return <>
<MainPage />
<SecurePaymentPage />
<DetailsModal />
<BookingModal />
<PaymentModal />
<TicketModal />
</>; }
