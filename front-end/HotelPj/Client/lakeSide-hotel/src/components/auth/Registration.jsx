import { useState } from "react";
import { registerUser } from "../ultils/ApiFunctions/";
import { Link } from "react-router-dom";
import RegisterForm from "../common/RegisterComponents/RegisterForm";
import Or from "../common/LoginComponent/Or";
import SocialLoginButton from "../common/LoginComponent/SocialLoginButtons";
import { Modal, Form, Button } from "react-bootstrap";

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistration({ firstName: "", lastName: "", email: "", password: "" });
      setShow(true);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Lỗi đăng ký : ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <section>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}

      <section>
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        <div className="container login ">
          <div className="row">
            <div className="col-12">
              <div className="mt-5 ">
                <h2 className="display-5 fw-bold text-center">Đăng ký</h2>
              </div>
            </div>
          </div>
          <div className="py-3 py-md-5 py-xl-8 ">
            <RegisterForm
              registration={registration}
              handleInputChange={handleInputChange}
              handleSubmit={handleRegistration}
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
            <Modal.Title>{"Đăng ký thành công, xin chào abcxyz"}</Modal.Title>
          </Modal.Header>
        </Modal>
      </section>
    </section>
  );
};

export default Registration;
