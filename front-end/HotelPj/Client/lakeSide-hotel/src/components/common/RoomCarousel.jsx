/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Row, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllRoom } from "../ultils/ApiFunctions";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([
    { id: "", roomType: "", roomPrice: "", photo: "" },
  ]);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getAllRoom()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setErrMsg(e.message);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <div>Loading room...</div>;
  }
  if (errMsg) {
    return <div className="text-danger mb-5 mt-5">Error : {errMsg}</div>;
  }
  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link to={"/browse-all-rooms"} className="hotel-color text-center">
        Browse all rooms
      </Link>
      <Container >
        <Carousel indicators={false}>
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card className="love">
                    <div className="hot-icon">HOT</div>
                      <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64, ${room.photo}`}
                          alt="Room Photo"
                          className="w-100"
                          style={{ height: "200px" }}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="hotel-colo">
                          {room.roomType}
                        </Card.Title>
                        <Card.Title className="room-price">
                          {room.roomPrice}đ/đêm
                          <Card.Text className="mt-3"> ⭐⭐⭐⭐⭐</Card.Text>
                        </Card.Title>
                        
                        <div className="book-button">
                          <Link
                            to={`/book-room/${room.id}`}
                            className="btn btn-hotel"
                          >
                            Book Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;