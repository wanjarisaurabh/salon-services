import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../salon/pages/SellerDashboard/HomePage";
import Services from "../salon/pages/Salon Service/Services";
import ServiceForm from "../salon/pages/Salon Service/AddServiceForm";
import Profile from "../salon/pages/Account/Profile";
import Category from "../salon/pages/Category/Category";
import BookingTable from "../salon/pages/Bookings/BookingTable";
import Payment from "../salon/pages/Payment/Payment";
import TransactionTable from "../salon/pages/Payment/TransactionTable";
import Notification from "../Customer/pages/Notifications/Notification";

const SalonRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<Services />} />
      <Route path="/add-services" element={<ServiceForm />} />

      <Route path="/bookings" element={<BookingTable />} />

      <Route path="/account" element={<Profile />} />

      <Route path="/category" element={<Category />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/transaction" element={<TransactionTable />} />
      <Route path="/notifications" element={<Notification />} />
    </Routes>
  );
};

export default SalonRoutes;
