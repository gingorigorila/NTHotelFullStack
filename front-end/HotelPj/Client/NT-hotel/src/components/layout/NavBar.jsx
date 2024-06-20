/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logout from "../auth/Logout";

import { navList } from "../Data/Data";
import logo from "../../assets/logo.png";



const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };
  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };
  const handleMouseEnter = (itemId) => {
    setActiveDropdown(itemId);
  };
  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

	return (

		<>
      <div className="container-fluid bg-dark px-0">
      <div className="row gx-0">
      <div className="col-lg-3 bg-dark d-none d-lg-block">
            <Link
              to="/"
              className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
            >
            <img src={logo} alt="logo" width="220"  color="red" />
            </Link>
      </div>
      <div className="col-lg-9">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
      <Link to="/" className="navbar-brand d-block d-lg-none">
                <h1 className="m-0 text-primary text-uppercase">The Sun</h1>
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                onClick={() => setNavbarCollapse(!navbarCollapse)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={
                  navbarCollapse
                    ? "navbar-collapse justify-content-around navbarCollapse"
                    : "collapse navbar-collapse justify-content-around"
                }
              >
                <div className="navbar-nav mr-auto py-0">
                  {navList.map((item, index) => (
                    <div key={index}>
                      {item.subItems ? (
                        <div
                          className="nav-item dropdown"
                          onMouseEnter={() => handleMouseEnter(item.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Link className="nav-link dropdown-toggle text-white">
                            {item.text}
                          </Link>
                          <div
                            className={`dropdown-menu rounded-0 m-0 ${
                              activeDropdown === item.id ? "show" : ""
                            }`}
                          >
                            {item.subItems.map((sub) => (
                              <Link to={sub.path} className="dropdown-item text-white">
                                {sub.text}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link to={item.path} className="nav-item nav-link text-white">
                          {item.text}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                <ul className="d-flex navbar-nav">

            <li className="nav-item dropdown">
            <div className="col-lg-3 px-5"></div>
              <a
                className={`text-white nav-link dropdown-toggle ${
                  showAccount ? "show" : ""
                }`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleAccountClick}
              >
                {" "}
                Tài khoản
              </a>

              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                {isLoggedIn ? (
                  <Logout />
                ) : (
                  <li>
                  <li>
									<Link className="dropdown-item" to={"/login"}>
										Đăng nhập
									</Link>
                  
								</li>
                  </li>
                  
                )}
              </ul>
            </li>
          </ul>
              </div>
      </nav>
      </div>
      </div>
      </div>
    </>
  );
};

export default NavBar;
