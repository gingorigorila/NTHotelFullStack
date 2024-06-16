/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { displayRoomImg } from "../ultils/ApiFunctions";

const RoomImgs = () => {
  const [imagePreview, setImagePreview] = useState([]);
  useEffect(() => {
    const fetchRoomImgs = async () => {
      try {
        const roomImg = await displayRoomImg();

        setImagePreview(roomImg);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoomImgs();
  }, [setImagePreview]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add">
                  Add Image
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="mt-5 mb-5 container">
        <div className="d-flex justify-content-between mb-3 mt-5">
          <h2>Phòng hiện có</h2>
        </div>
        <Row>
          <Col md={6} className="mb-3 mb-md-0"></Col>
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
              <th>Hinh anh</th>
            </tr>
          </thead>
          <tbody>
            {imagePreview.map((room) => (
              <tr key={room.id} className="text-center">
                <td>
                  <img
                    src={`data:image/jpeg;base64,${room}`}
                    alt="Room preview"
                    style={{ maxWidth: "400px", maxHeight: "400" }}
                    className="mt-3"
                  />
                </td>

                <td className="gap-2">
                  <Link to={`/edit-room/${room.id}`} className="gap-2">
                    <span className="btn btn-info btn-sm">
                      <FaEye />
                    </span>
                    <span className="btn btn-warning btn-sm">
                      <FaEdit />
                    </span>
                  </Link>
                  <button className="btn btn-danger btn-sm">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default RoomImgs;
