/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

const LoginForm = ({ login, handleInputChange, handleSubmit }) => {
  return (
    <div className="container col-12 col-lg-5">
      <form  onSubmit={handleSubmit}>
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
              value={login.email}
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
              value={login.password}
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
          Login
        </CustomButton>
        <span style={{ marginLeft: "60px" }}>
          Chưa có tài khoản?<Link to={"/register"}> Đăng ký</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
