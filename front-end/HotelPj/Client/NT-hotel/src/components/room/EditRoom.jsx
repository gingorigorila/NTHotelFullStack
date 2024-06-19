/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../ultils/ApiFunctions";
import { Link, useParams } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
    maxPeople: "",
    roomDescription: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { roomId } = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(roomData.photo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        setSuccessMessage("Cập nhập thông tin phòng thành công!");
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);
        setImagePreview(updatedRoomData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Lỗi cập nhập thông tin phòng");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center mb-5 mt-5">Chỉnh sửa thông tin phòng</h3>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label hotel-color">
                Tên phòng
              </label>
              <input
                type="text"
                className="form-control"
                id="roomType"
                name="roomType"
                value={room.roomType}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label hotel-color">
                Giá phòng
              </label>
              <input
                type="number"
                className="form-control"
                id="roomPrice"
                name="roomPrice"
                value={room.roomPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label hotel-color">
                Số lượng người
              </label>
              <input
                type="number"
                className="form-control"
                id="maxPeople"
                name="maxPeople"
                value={room.maxPeople}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label hotel-color">
                Mô tả phòng
              </label>
              <input
                type="text"
                className="form-control"
                id="roomDescription"
                name="roomDescription"
                value={room.roomDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label hotel-color">
                Hình ảnh
              </label>
              <input
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={`data:image/jpeg;base64,${imagePreview}`}
                  alt="Room preview"
                  style={{ maxWidth: "400px", maxHeight: "400" }}
                  className="mt-3"
                />
              )}
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link
                to={"/existing-rooms"}
                className="btn btn-outline-info ml-5"
              >
                Trở lại
              </Link>
              <button type="submit" className="btn btn-outline-warning">
                Chỉnh sửa
              </button>
              <button
                type="submit"
                className="btn btn-outline-warning btn-delete"
                onClick={() => {
                  setShow(true);
                }}
              >
                Xóa
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="modal-dialog-centered modal-dialog-scrollable"
        contentClassName="p-8"
      >
        <Modal.Header>
          <Modal.Title>
            {"Bạn có thật sự muốn xóa phòng này không?"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Đồng ý
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Không đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default EditRoom;
