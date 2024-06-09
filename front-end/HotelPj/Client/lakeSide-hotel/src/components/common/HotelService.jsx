/* eslint-disable no-unused-vars */
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaTshirt,
  FaUtensils,
  FaWifi,
  FaWind
} from "react-icons/fa";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";


const HotelService = () => {
  return (
    <>
      <Container className="mb-2 ">
        <h1 className="font-bold">
        <LiaUmbrellaBeachSolid className="bg-red" />
Khám phá <span style={{ color: "orange" }}>dịch vụ của chúng tôi<LiaUmbrellaBeachSolid />
</span>
        </h1>
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card className="service-card">
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWifi />
                  Wifi
                </Card.Title>
                <Card.Text>Kết nối mạng với tốc độ cao</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="service-card">
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWind />
                  Điều hòa
                </Card.Title>
                <Card.Text>
                  Nhiệt độ luôn luôn lý tưởng
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="service-card">
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaUtensils />
                  Ẩm thực
                </Card.Title>
                <Card.Text>Đa dạng và đẳng cấp</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card  className="service-card">
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTshirt />
                  Giặt đồ
                </Card.Title>
                <Card.Text>Hệ thống giặt ủi hiện đại</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card  className="service-card">
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaCocktail />
                  Bar
                </Card.Title>
                <Card.Text>
                  Thư giãn với những thức uống ngon
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card  className="service-card">
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaParking />
                  Đậu xe
                </Card.Title>
                <Card.Text>
                  Diện tích rộng rãi và an toàn
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HotelService;
