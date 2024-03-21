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
} from "react-icons/fa";
import Header from "./Header";

const HotelService = () => {
  return (
    <>
      <Container className="mb-2">
        <Header title={"Dịch vụ của chúng tôi"} />
        <Row>
          <h4 className="text-center">
            Dịch vụ tại khách sạn <span className="hotel-color">Nha Trang</span>
            <span className="gap-2">
              <FaClock />
              Phục vụ 24h
            </span>
          </h4>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
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
            <Card>
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
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaUtensils />
                  Ăn sáng
                </Card.Title>
                <Card.Text>Sao</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTshirt />
                  Giặt đồ
                </Card.Title>
                <Card.Text>Giữ sạch đồ với hệ thống giặt ủi</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaCocktail />
                  Bar mini
                </Card.Title>
                <Card.Text>
                  Tận hưởng đồ uống ngon trong quán bar mini
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaParking />
                  Đậu xe
                </Card.Title>
                <Card.Text>
                  Đậu xe tiện lợi trong bãi đậu xe của chúng tôi
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWifi />
                  Điều hòa
                </Card.Title>
                <Card.Text>
                  Mát mẻ và thoải mái với hệ thống điều hòa của chúng tôi
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
