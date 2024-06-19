/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookRestaurant, getRestaurantById } from "../ultils/ApiFunctions";
import moment from "moment";
import { Form, FormControl, Button } from "react-bootstrap";
const OrderForm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const currentUser = localStorage.getItem("userId");
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: currentUser,
    guestTelephone: "",
    bookingTime: "",
    bookingDate: "",
    numOfGuest: "",
    bookingRequest: "",
  });
  const [restaurantInfo, setRestaurantInfo] = useState({
    photo: "",
    restaurantName: "",
    restaurantType: "",
    restaurantAddress: "",
    restaurantHour: "",
    restaurantTelephone: "",
    restaurantEmail: "",
    restaurantDesc: "",
  });
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrMsg("");
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const confirmationCode = await bookRestaurant(restaurantId, booking);
      console.log(booking);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (e) {
      setErrMsg(e.message);
      navigate("/booking-success", { state: { error: errMsg } });
    }
  };

  return (
    <div className="container mt-5">
    <h4 className="card card-title">Dat ban</h4>
    <form onSubmit={handleBooking} className="container mt-5">
      <div className="form-group">
        <label htmlFor="guestFullName">Tên:</label>
        <input
        id="guestFullName"
        name="guestFullName"
        type="text"
        className="form-control"
        value={booking.guestFullName}
        onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="guestEmail">Email:</label>
        <input
        id="guestEmail"
        name="guestEmail"
        type="email"
        className="form-control"
        value={booking.guestEmail}
        onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Ngày:</label>
        <input
          type="date"
          className="form-control"
          id="bookingDate"
          name="bookingDate"
          value={booking.bookingDate}
          placeholder="Ngày đặt"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="bookingTime">Giờ:</label>
        <input
          type="time"
          className="form-control"
          id="bookingTime"
          name="bookingTime"
          value={booking.bookingTime}
          placeholder="Gio dat"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="numberOfGuests">Số lượng khách:</label>
        <input
          type="number"
          className="form-control"
          id="numOfGuest"
          name="numOfGuest"
          value={booking.numOfGuest}
          placeholder="0"
          min={1}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="guestTelephone">Số điện thoại:</label>
        <input
          type="tel"
          className="form-control"
          id="guestTelephone"
          name="guestTelephone"
          value={booking.guestTelephone}
          onChange={handleInputChange}
          required
          pattern="[0-9]{10}"
        />
      </div>
      <div className="form-group">
        <label htmlFor="notes">Chú thích:</label>
        <textarea
          className="form-control"
          id="bookingRequest"
          name="bookingRequest"
          value={booking.bookingRequest}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-success mt-5">
        Đặt chỗ ngay
      </button>
    </form>
  </div>
  );
};

export default OrderForm;
