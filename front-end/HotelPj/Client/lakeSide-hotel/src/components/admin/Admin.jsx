/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container1 mt-5">
      <h2>Trang Admin</h2>
      <hr />
      <Link className="link-button" to={"/add-room"}>Thêm phòng</Link>
      <br />
      <Link className="link-button" to={"/existing-rooms"}>Quản lý phòng</Link>
      <br />
      <Link className="link-button" to={"/existing-bookings"}>Quản lý đơn đặt phòng</Link>
      <br/>
      <Link className="link-button" to={"/add-restaurant"}>Thêm nhà hàng</Link>
      <br />
      <Link className="link-button" to={"/all-restaurants"}>Quan ly nhà hàng</Link>
      <br />
      <Link className="link-button" to={"/existing-orders"}>Quản lý đơn đặt ban</Link>
      <br/>
      <Link className="link-button" to={"/existing-users"}>Quản lý danh sách người dùng</Link>
      <br/>
    </section>
  );
};

export default Admin;
