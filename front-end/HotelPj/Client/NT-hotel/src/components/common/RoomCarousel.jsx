/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Row, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllRoom } from "../ultils/ApiFunctions";
import { facility, roomItems } from "../Data/Data";
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
      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <div className="row g-4">
                {rooms.slice(index * 3, index * 3 + 3).map((room) => (
                  <div
                    className="col-lg-4 col-md-6 wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <div className="room-item shadow rounded overflow-hidden">
                      <div className="position-relative">
                        <img
                          className="img-fluid"
                          src={`data:image/png;base64, ${room.photo}`}
                          alt="img"
                        />
                        <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                          {room.roomPrice} đồng/đêm
                        </small>
                      </div>
                      <div className="p-4 mt-2">
                        <div className="d-flex justify-content-between mb-3">
                          <h5 className="mb-0">{room.roomType}</h5>
                          <div className="ps-2">⭐⭐⭐⭐⭐</div>
                        </div>
                        <div className="d-flex mb-3">
                          
                            <small className="border-end me-3 pe-3">
                            <i className="fa fa-brands fa-github-square"></i>
                              3 giường
                            </small>
                          
                        </div>

                        <div className="d-flex justify-content-between">
                          <a
                            className="btn btn-sm btn-primary rounded py-2 px-4"
                            href="/room"
                          >
                            Xem chi tiết
                          </a>
                          <a
                            className="btn btn-sm btn-dark rounded py-2 px-4"
                            href={`/book-room/${room.id}`}
                          >
                            Đặt ngay
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;
