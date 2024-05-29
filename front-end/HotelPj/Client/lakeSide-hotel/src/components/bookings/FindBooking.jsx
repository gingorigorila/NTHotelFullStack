/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  cancelBookings,
  getBookingByConfimationCode,
} from "../ultils/ApiFunctions";
import moment from "moment";
const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [successMsg,setSuccessMsg]=useState("")
  const [isDeleted, setIsDeleted] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: ""
  });
  const clearBookingInfo = {
    id: "",
    room: { id: "" },
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuest: "",
  };
  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await getBookingByConfimationCode(confirmationCode);
      setBookingInfo(data);
      setErr(null)
    } catch (e) {
      setBookingInfo(clearBookingInfo);
      if (e.response && e.response.status == 404) {
        setErr(e.response.data.message);
      } else {
        setErr(e.message);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBookings(bookingInfo.id);
      setIsDeleted(true);
      setSuccessMsg("Đơn đặt đã được hủy bỏ")
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("")
      setErr(null);
    } catch (e) {
      setErr(e.message);
    }
    setTimeout(() => {
        setSuccessMsg("");
        setIsDeleted(false)
      }, 2000);
  };
  useEffect(()=>{
      console.log("booking:",bookingInfo)
  })
  return (
    <>
      <div className="container mt-5 flex-column align-items-center justify-content-center d-flex flex-column">
        <h2 className="text-center mb-4">Tìm đơn đặt phòng</h2>
        <form onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Nhập mã đơn đặt phòng"
            />
            <button type="submit" className="btn btn-hotel input-group-text">
              Tìm đơn đặt
            </button>
          </div>
        </form>
        {isLoading ? (
          <div>Đang tải đơn đặt ...</div>
        ) : err ? (
          <p className="text-danger">Lỗi: {err}</p>
        ) : bookingInfo.bookingConfirmationCode ? (
          <div className="col-md-6 mt-4 mb-5">
            <h3>Thông tin đơn đặt phòng</h3>
            <p>Mã xác nhận đơn: {bookingInfo.bookingConfirmationCode}</p>
            <p>Mã đơn : {bookingInfo.id}</p>
            <p>Mã phòng : {bookingInfo.room.id}</p>
            <p>Ngày bắt đầu: {bookingInfo.checkInDate}</p>
            <p>Ngày kết thúc: {bookingInfo.checkOutDate}</p>
            <p>Họ và tên khách: {bookingInfo.guestFullName}</p>
            <p>Email: {bookingInfo.guestEmail}</p>
            <p>Số người lớn: {bookingInfo.numOfAdults}</p>
            <p>Số trẻ em: {bookingInfo.numOfChildren}</p>
            <p>Tổng số lượng khách: {bookingInfo.totalNumOfGuest}</p>

            { !isDeleted && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleBookingCancellation(bookingInfo.id)}
                >
                  Hủy đơn
                </button>
              )} 
          </div>
        ): (
          <div>Tìm đơn ...</div>
        )}
        {isDeleted && (
            <div className="alert alert-success mt-3" role="alert">
              {successMsg}
            </div>
          )}
      </div>
    </>
  );
};

export default FindBooking;
