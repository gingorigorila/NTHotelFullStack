/* eslint-disable no-unused-vars */
import { getAdapter } from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import  {getAllRoom}  from "../ultils/ApiFunctions";
import RoomCard from "./RoomCard";

const Room = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState([{ id: "" }]);
  useEffect(() => {
    setIsLoading(true);
    getAllRoom()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setErr(e);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <div>Dang tai trang</div>;
  }
  if (err) {
    return <div className="text-danger">Error :{err}</div>;
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(filteredData.length / roomsPerPage);
  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const lastIndex = startIndex + roomsPerPage;
    return filteredData
      .slice(startIndex, lastIndex)
      .map((room) => <RoomCard key={room.id} room={room} />);
  };
  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <RoomFilter data={data} setFilteredData={setFilteredData} />
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
      <Row>{renderRooms()}</Row>
      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
