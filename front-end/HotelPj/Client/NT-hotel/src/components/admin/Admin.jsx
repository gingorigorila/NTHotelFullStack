/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container1 mt-5">
      <h2>Trang Admin</h2>
      <hr />
      <div className="link-container">
        <div className="header_admin">Nhà hàng</div>
        <div className="link-row">
          <Link className="link-button" to={"/add-restaurant"}>
            Thêm nhà hàng
          </Link>
          <br />
          <Link className="link-button" to={"/all-restaurants"}>
            Quản lý nhà hàng
          </Link>
          <br />
          <Link className="link-button" to={"/existing-orders"}>
            Quản lý đơn đặt bàn
          </Link>
          <br />
        </div>
        <div>Khách sạn</div>
        <div className="link-row">
          <Link className="link-button" to={"/add-room"}>
            Thêm phòng
          </Link>
          <br />
          <Link className="link-button" to={"/existing-rooms"}>
            Quản lý phòng
          </Link>
          <br />
          <Link className="link-button" to={"/existing-bookings"}>
            Quản lý đơn đặt phòng
          </Link>
          <br />
          <Link className="link-button" to={"/all-roomImgs"}>
            Quản lý hinh anh phong
          </Link>
          <br />
        </div>
        <div>Danh sách khách hàng</div>
        <div className="link-row">
          <Link className="link-button" to={"/existing-users"}>
            Quản lý danh sách người dùng
          </Link>
          <br />
        </div>
      </div>
    </section>
  );
};

export default Admin;
