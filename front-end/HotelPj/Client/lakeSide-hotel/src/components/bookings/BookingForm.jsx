/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { bookRoom, getRoomById } from "../ultils/ApiFunctions";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: "",
  });
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });
  const { roomId } = useParams();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrMsg("");
  };
  const getRoomPriceByRoomId = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (e) {
      throw new Error(e);
    }
  };
  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const paymentPerDay = roomPrice ? roomPrice : 0;
    return diffInDays * paymentPerDay;
  };
  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numOfAdults);
    const childrenCount = parseInt(booking.numOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };
  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrMsg("Ngày ra phòng phải đến trước ngày đặt phòng");
      return false;
    } else {
      setErrMsg("");
      return true;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestCountValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      return setIsSubmitted(true);
    }
    setIsValidated(true);
  };
  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      console.log(booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (e) {
      setErrMsg(e.message);
      navigate("/booking-success", { state: { error: errMsg } });
    }
  };
  useEffect(() => {
    getRoomPriceByRoomId(roomId);
    console.log(roomPrice);
  }, [roomId, roomPrice]);
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card card-body mt-5">
              <h4 className="card card-title">Lưu phòng</h4>
              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="guestFullName">Họ tên</Form.Label>

                  <FormControl
                    required
                    type="text"
                    id="guestFullName"
                    name="guestFullName"
                    value={booking.guestFullName}
                    placeholder="Nhập họ và tên"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Nhập họ tên đầy đủ
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="guestEmail">Họ tên</Form.Label>

                  <FormControl
                    required
                    type="email"
                    id="guestEmail"
                    name="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Nhập email"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Nhập email
                  </Form.Control.Feedback>
                </Form.Group>
                <fieldset style={{ border: "2px" }}>
                  <legend>Thời gian ở</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="checkInDate">Ngày ở</Form.Label>

                      <FormControl
                        required
                        type="date"
                        id="checkIndate"
                        name="checkInDate"
                        value={booking.checkInDate}
                        placeholder="Ngày đặt"
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Hãy chọn ngày ở
                      </Form.Control.Feedback>
                    </div>

                    <div className="col-6">
                      <Form.Label htmlFor="checkOutDate">
                        Ngày kết thúc
                      </Form.Label>

                      <FormControl
                        required
                        type="date"
                        id="checkOutdate"
                        name="checkOutDate"
                        value={booking.checkOutDate}
                        placeholder="Ngày kết thúc"
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Hãy chọn ngày kết thúc
                      </Form.Control.Feedback>
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
                      <Form.Label htmlFor="numOfAdults">Người lớn</Form.Label>

                      <FormControl
                        required
                        type="number"
                        id="numOfAdults"
                        name="numOfAdults"
                        value={booking.numOfAdults}
                        placeholder="0"
                        min={1}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Chọn ít nhất 1 người lớn
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-6">
                      <Form.Label htmlFor="numOfChildren">Trẻ em</Form.Label>

                      <FormControl
                        required
                        type="number"
                        id="numOfChildren"
                        name="numOfChildren"
                        value={booking.numOfChildren}
                        placeholder="0"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </fieldset>
                <div className="form-group mt-2 mb-2">
                  <button type="submit" className="btn btn-hotel">
                    Tiếp theo
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-md-8">
            {isSubmitted && (
              <BookingSummary
                booking={booking}
                payment={calculatePayment()}
                isFormValid={isValidated}
                onConfirm={handleBooking}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
