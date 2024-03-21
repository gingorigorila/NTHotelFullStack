/* eslint-disable no-unused-vars */
import React from "react";
import { Container } from "react-bootstrap";

const Parallax = () => {
  return (
    <div className="parallax mb-5">
      <Container className="justify-content-center px-5 py-5 text-center">
        <div className="animated-texts bounceIn">
          <h1>
            Chào mừng đến khách sạn
            <span className="hotel-color">Nha Trang</span>
          </h1>
          <h3>Cung cấp dịch vụ tốt nhất theo nhu cầu bạn</h3>
        </div>
      </Container>
    </div>
  );
};

export default Parallax;
