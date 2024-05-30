/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ key, room }) => {
  return (
    <Col key={room.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
              <Card.Img
                variant="top"
                alt="Card img"
                src={`data:image/png;base64,${room.photo}`}
                style={{ width: "100%", height: "auto", maxWidth: "200px" }}
              />
            </Link>
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">{room.roomType}</Card.Title>

            <Card.Text> ⭐ ⭐ ⭐ ⭐ ⭐</Card.Text>
            <Card.Text>📶 Free Wifi</Card.Text>
          </div>
          <div className="pay">
            <Card.Title className="room-price">{room.roomPrice}đ</Card.Title>
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
