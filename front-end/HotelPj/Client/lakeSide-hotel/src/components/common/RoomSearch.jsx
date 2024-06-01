/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import moment from "moment";
import { getAvailableRooms } from "../ultils/ApiFunctions";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import RoomTypeSelector from "./RoomTypeSelector";

import RoomSearchResult from "./RoomSearchResult";
const RoomSearch = () => {
  const [searchQuerry, setSearchQuerry] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
  });
  const [err, setErr] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    const checkInMoment = moment(searchQuerry.checkInDate);
    const checkOutMoment = moment(searchQuerry.checkOutDate);
    if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
      setErr("Xin vui lòng nhập khoảng thời gian ở đúng");
      return;
    }
    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
      setErr("Ngày kết thúc phải sau ngày bắt đầu");
      return;
    }
    setIsLoading(true);
    getAvailableRooms(
      searchQuerry.checkInDate,
      searchQuerry.checkOutDate,
      searchQuerry.roomType
    )
      .then((response) => {
        setAvailableRooms(response.data);
        console.log("available :", response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuerry({ ...searchQuerry, [name]: value });
    const checkInDate = moment(searchQuerry.checkInDate);
    const checkOutDate = moment(searchQuerry.checkOutDate);
    if (checkInDate.isValid() && checkOutDate.isValid()) {
      setErr("");
    }
  };
  const ClearSearch = () => {
    setSearchQuerry({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
    setAvailableRooms([]);
  };
  return (
    <>
      <Container className="mt-5 mb-5 py-5 shadow">
        <Form onSubmit={handleSearch}>
          <Row className="justify-content-center">
            <Col xs={12} md={3}>
              <Form.Group controlId="checkIndate">
                <Form.Label>Ngày bắt đầu</Form.Label>
                <Form.Control
                  type="date"
                  name="checkInDate"
                  value={searchQuerry.checkInDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="checkOutdate">
                <Form.Label>Ngày kết thúc</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOutDate"
                  value={searchQuerry.checkOutDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="roomType">
                <Form.Label className="">Loại phòng</Form.Label>
                <div className="">
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    newRoom={searchQuerry}
                  />
                </div>
              </Form.Group>
            </Col>
            <Button variant="secondary" type="submit" className="button">
                    Tìm kiếm
            </Button>
          </Row>
        </Form>
        {isLoading ? (
          <p className="mt-4">Đang tìm phòng hiện có</p>
        ) : availableRooms ? (
          <RoomSearchResult
            results={availableRooms}
            onClearSearch={ClearSearch}
          />
        ) : (
          <p className="mt-4">
            Không phòng nào hiện có cho ngày và loại phòng được chọn{" "}
          </p>
        )}
        {err && <p className="text-danger">{err}</p>}
      </Container>
    </>
  );
};

export default RoomSearch;
