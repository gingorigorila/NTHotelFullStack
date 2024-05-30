/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RestaurantCard = ({ key, restaurant }) => {
  return (
    <Col key={restaurant.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            <Link
              to={`/order-restaurant/${restaurant.id}`}
              className="btn btn-hotel btn-sm"
            >
              <Card.Img
                variant="top"
                alt="Card img"
                src={`data:image/png;base64,${restaurant.photo}`}
                style={{ width: "100%", height: "auto", maxWidth: "200px" }}
              />
            </Link>
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">
              {restaurant.restaurantName}
            </Card.Title>
            <Card.Title className="hotel-color">
              {restaurant.restaurantType}
            </Card.Title>
            <Card.Title className="hotel-color">
              {restaurant.location}
            </Card.Title>
            <Card.Title className="hotel-color">{restaurant.hours}</Card.Title>
            <Card.Title className="hotel-color">{restaurant.email}</Card.Title>
            <Card.Title className="hotel-color">
              {restaurant.telePhone}
            </Card.Title>
            <Card.Title className="hotel-color">
              {restaurant.description}
            </Card.Title>
            <Card.Text>Thông tin về nhà hàng</Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link
              to={`/order-restaurant/${restaurant.id}`}
              className="btn btn-hotel btn-sm"
            >
              Dat ban ngay
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RestaurantCard;
