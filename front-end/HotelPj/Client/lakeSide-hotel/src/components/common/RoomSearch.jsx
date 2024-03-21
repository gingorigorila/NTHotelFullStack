/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import moment from "moment";
import { getAvailableRooms } from "../ultils/ApiFunctions";
import { Col, Container, Form, Row,Button } from "react-bootstrap";
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
  const [isLoading, setIsLoading] = useState(true);
  const handleSearch = (e) => {
    e.preventDefault();
    const checkIn = moment(searchQuerry.checkInDate);
    const checkOut = moment(searchQuerry.checkOutDate);
    if (!checkIn.isValid() || !checkOut.isValid()) {
      setErr("Xin vui lòng nhập khoảng thời gian ở đúng");
      return;
    }
    if (!checkIn.isSameOrAfter(checkIn)) {
      setErr("Ngày bắt đầu phải trước ngày kết thúc");
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
    const checkIn = moment(searchQuerry.checkInDate);
    const checkOut = moment(searchQuerry.checkOutDate);
    if (checkIn.isValid() && checkOut.isValid()) {
      setErr("");
    }
  };
  const ClearSearch = () => {
    setSearchQuerry({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
  };
  return (
    <>
      <Container>
        <Form>
          <Row>
            <Col xs={12} md={3}>
              <Form.Group controlId="checkIndate">
                <Form.Label>Ngày bắt đầu</Form.Label>
                <Form.Control
                  type="date"
                  name="checkInDate"
                  value={searchQuerry.checkInDate}
                  onChange={handleInputChange}
                  min={moment().format("DD-MM-YYYY")}
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
                  min={moment().format("DD-MM-YYYY")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="checkOutdate">
                <Form.Label>Loại phòng</Form.Label>
                <div className="d-flex">
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    newRoom={searchQuerry}
                  />
                  <Button variant="secondary" type="submit">
                    Tìm kiếm
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {isLoading ? (
          <p className="mt-4">Đang tìm phòng hiện có</p>
        ) : availableRooms ? (
          <RoomSearchResult
            results={availableRooms}
            onClearSearch={handleSearch}
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
