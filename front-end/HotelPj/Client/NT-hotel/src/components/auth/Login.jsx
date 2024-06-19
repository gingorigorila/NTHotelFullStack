/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import LoginForm from "../common/LoginComponent/LoginForm";
import Or from "../common/LoginComponent/Or";
import SocialLoginButton from "../common/LoginComponent/SocialLoginButtons";
import { loginUser } from "../ultils/ApiFunctions";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => {
   
    setShow(false)
  };
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login ", login);
    const success = await loginUser(login);
    console.log("token :", success);
    
    if (success) {
      setShow(true);
     
      const token = success.token;
      auth.handleLogin(token);
      navigate(redirectUrl, { replace: true }); 
      handleClose()
      
      
      
    } else {
      setErrorMessage("Tên tài khoản hoặc mật khẩu không hợp lệ");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };
  //Login Modal

  return (
    <section>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <div className="container login ">
        <div className="row">
          <div className="col-12">
            <div className="mt-5 ">
              <h2 className="display-5 fw-bold text-center">Đăng nhập</h2>
            </div>
          </div>
        </div>
        <div className="py-3 py-md-5 py-xl-8 ">
          <LoginForm
            login={login}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <Link to="/"></Link>
          <Or />
          <SocialLoginButton />
        </div>
      </div>

      {/* Modal Đăng nhập thành công */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="modal-dialog-centered modal-dialog-scrollable"
        contentClassName="p-8"
      >
        <Modal.Header closeButton>
          <Modal.Title>{"Đăng nhập thành công"}</Modal.Title>
        </Modal.Header>
      </Modal>
    </section>
  );
};

export default Login;
