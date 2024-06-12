/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { deleteRoom, getAllRoom } from "../ultils/ApiFunctions";
import { Link } from "react-router-dom";

const ExsistingRooms = () => {
  const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "" }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRoom, setFilteredRoom] = useState([
    { id: "", roomType: "", roomPrice: "" },
  ]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);
  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const results = await getAllRoom();
      setRooms(results);
      setIsLoading(false);
    } catch (error) {
      setErrMsg(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRoomTypes === "") {
      setFilteredRoom(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.roomType === selectedRoomTypes
      );
      setFilteredRoom(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomTypes]);
  const calculateTotalPages = (filteredRoom, roomsPerPage, rooms) => {
    const totalRooms =
      filteredRoom.length > 0 ? filteredRoom.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDeleteRoom = async (roomId) => {
    try {
      const result = await deleteRoom(roomId);
      if (result === "") {
        setSuccessMsg(`Phòng số ${roomId} đã được xóa`);
        fetchRooms();
      } else {
        console.log(`Lỗi xóa phòng : ${result.message}`);
      }
    } catch (e) {
      setErrMsg(e.message);
    }
    setTimeout(() => {
      setSuccessMsg("");
      setErrMsg("");
    }, 3000);
  };
  const indexOfLastRooms = currentPage * roomsPerPage;
  const indexOfFirstRooms = indexOfLastRooms - roomsPerPage;
  const currentRooms = filteredRoom.slice(indexOfFirstRooms, indexOfLastRooms);
  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMsg && <p className="alert alert-success mt-5">{successMsg}</p>}

        {errMsg && <p className="alert alert-danger mt-5">{errMsg}</p>}
      </div>
      {isLoading ? (
        <p>Dang tai trang</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Phòng hiện có</h2>
            </div>
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <RoomFilter data={rooms} setFilteredData={setFilteredRoom} />
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Link to={"/add-room"}>
                  <FaPlus />
                  Thêm phòng
                </Link>
              </Col>
            </Row>
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Kiểu phòng</th>
                  <th>Giá phòng</th>
                  <th>Xem/Sửa/Xóa</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className="text-center">
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}</td>
                    <td className="gap-2">
                      <Link to={`/edit-room/${room.id}`} className="gap-2">
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(
                filteredRoom,
                roomsPerPage,
                rooms
              )}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ExsistingRooms;
