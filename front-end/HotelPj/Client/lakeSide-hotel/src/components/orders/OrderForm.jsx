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
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card card-body mt-5">
              <h4 className="card card-title">Dat ban</h4>

              <form onSubmit={handleBooking}>
                <div className="mb-3 row">
                  <label
                    htmlFor="guestFullName"
                    className="col-sm-2 col-form-label"
                  >
                    Họ tên
                  </label>
                  <div className="col-sm-10">
                    <input
                      id="guestFullName"
                      name="guestFullName"
                      type="text"
                      className="form-control"
                      value={booking.guestFullName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    htmlFor="guestEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      id="guestEmail"
                      name="guestEmail"
                      type="email"
                      className="form-control"
                      value={booking.guestEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="guestTelephone"
                    className="col-sm-2 col-form-label"
                  >
                    So dien thoai
                  </label>
                  <div className="col-sm-10">
                    <input
                      id="guestTelephone"
                      name="guestTelephone"
                      type="text"
                      className="form-control"
                      value={booking.guestTelephone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <fieldset style={{ border: "2px" }}>
                  <legend>Thời gian dat</legend>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="bookingDate">Ngày dat ban</label>

                      <input
                        required
                        type="date"
                        id="bookingDate"
                        name="bookingDate"
                        value={booking.bookingDate}
                        placeholder="Ngày đặt"
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-6">
                      <label htmlFor="bookingTime">Gio dat</label>

                      <FormControl
                        required
                        type="time"
                        id="bookingTime"
                        name="bookingTime"
                        value={booking.bookingTime}
                        placeholder="Gio dat"
                        onChange={handleInputChange}
                      />
                    </div>
                    {errMsg && (
                      <p className="error-message text-danger">{errMsg}</p>
                    )}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Số lượng khách</legend>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="numOfAdults">So luong khach</label>
                      <input
                        required
                        type="number"
                        id="numOfGuest"
                        name="numOfGuest"
                        value={booking.numOfGuest}
                        placeholder="0"
                        min={1}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </fieldset>
                <div className="mb-3 row">
                  <label
                    htmlFor="guestTelephone"
                    className="col-sm-2 col-form-label"
                  >
                    Yeu cau
                  </label>
                  <div className="col-sm-10">
                    <input
                      required
                      type="text"
                      id="bookingRequest"
                      name="bookingRequest"
                      value={booking.bookingRequest}
                      placeholder="Nhập yeu cau"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-hotel"
                    style={{ marginRight: "10px" }}
                  >
                    Gui yeu cau
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderForm;
