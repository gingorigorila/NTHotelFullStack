/* eslint-disable no-unused-vars */
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGoogle,
  FaTiktok,
  FaHotel,
  FaMapMarkerAlt,
  FaFax,
  FaPhoneAlt

} from "react-icons/fa";
const Footer = () => {
  let today = new Date();
  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="https://facebook.com" className="me-4 text-reset">
            <FaFacebookF />
          </a>
          <a href="https://tiktok.com" className="me-4 text-reset">
            <FaTiktok />
          </a>
          <a href="https://twitter.com" className="me-4 text-reset">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="me-4 text-reset">
            <FaInstagram />
          </a>
        
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 hotel-color">
                
                <i className="fas fa-gem me-3"></i><FaHotel/> Khách sạn Nha Trang
              </h6>
              <p>
                Tự hào là khách sạn 5 sao hàng đầu tại Nha Trang, chúng tôi luôn mang đến cho quý khách những trải nghiệm tuyệt vời nhất.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Về chúng tôi</h6>
              <p>
                <a href="" className="text-reset text-decoration-none">Giới thiệu</a>
              </p>
              <p>
                <a href="" className="text-reset text-decoration-none">Dịch vụ</a>
              </p>
              <p>
                <a href="" className="text-reset text-decoration-none">Điều khoản dịch vụ</a>
              </p>
              <p>
                <a href="" className="text-reset text-decoration-none">Chăm sóc khách hàng</a>
              </p>
            </div>

          

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
              <p><i className="fas fa-home me-3"></i><FaMapMarkerAlt/> Số 3 Quang Trung, Nha Trang</p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                <FaGoogle/> NThotel@gmail.com
              </p>
              <p><i className="fas fa-phone me-3"></i><FaPhoneAlt/> + 01 234 567 88</p>
              <p><i className="fas fa-print me-3"></i><FaFax/> + 01 234 567 89</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
        © 2024 Copyright:
        <a className="text-reset fw-bold text-decoration-none" > NhatrangHotel.com</a>      </div>
    </footer>
  );
};

export default Footer;
