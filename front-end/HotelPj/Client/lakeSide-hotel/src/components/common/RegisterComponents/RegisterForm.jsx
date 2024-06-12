/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../LoginComponent/CustomButton";

const RegisterForm = ({ registration, handleInputChange, handleSubmit }) => {
  return (
    <div className="container col-12 col-lg-5">
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <div className="col-12">
          <label htmlFor="firstName" className="form-label">
              Họ
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="border border-dark border-2 form-control rounded-0"
              value={registration.firstName}
              onChange={handleInputChange}
              placeholder="Nhập họ"
              required
            ></input>
          </div>
        </div>
        <div className="form-floating mb-3">
          <div className="col-12">
          <label htmlFor="email" className="form-label">
              Tên
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="border border-dark border-2 form-control rounded-0"
              value={registration.lastName}
              onChange={handleInputChange}
              placeholder="Nhạp tên"
              required
            ></input>    
          </div>
        </div>
        <div className="form-floating mb-3">
          <div className="col-12">
          <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="border border-dark border-2 form-control rounded-0"
              value={registration.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              required
            ></input>
          </div>
        </div>

        <div className="form-floating mb-3">
          <div className="col-12">
          <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              type="password"
              className="form-control border-dark border-2 rounded-0"
              name="password"
              id="password"
              value={registration.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            ></input>
            <label htmlFor="password" className="form-label"></label>
          </div>
        </div>
        <CustomButton
          className="btn btn-lg btn-dark rounded-0 fs-6 "
          type="submit"
        >
          Đăng ký
        </CustomButton>
        <span style={{ marginLeft: "80px" }}>
          Đã có tài khoản?<Link to={"/login"}> Đăng nhập</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterForm;
