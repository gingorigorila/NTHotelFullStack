/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Trang Admin</h2>
      <hr />
      <Link to={"/add-room"}>Thêm phòng</Link>
      <br />
      <Link to={"/existing-rooms"}>Quản lý phòng</Link>
      <br />
      <Link to={"/existing-bookings"}>Quản lý đơn đặt phòng</Link>
      <br/>
      <Link to={"/add-restaurant"}>Thêm nha hang</Link>
      <br />
    </section>
  );
};

export default Admin;
