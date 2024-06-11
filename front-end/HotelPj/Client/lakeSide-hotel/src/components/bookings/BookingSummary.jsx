/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfdays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();
  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };
  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);
  return (
    <div className="row">
      <div className="col-md-6"></div>
      <div className="card card-body mt-5">
        <h4>Tóm tắt đơn đặt phòng</h4>
        <div>
          <p>
            Họ tên : <strong>{booking.guestFullName}</strong>
          </p>
        </div>
        <div>
          <p>
            Email : <strong>{booking.guestEmail}</strong>
          </p>
        </div>
        <div>
          <p>
            Ngày đặt :{" "}
            <strong>{moment(booking.checkInDate).format("DD/MM/YYYY")}</strong>
          </p>
        </div>
        <div>
          <p>
            Ngày kết thúc :{" "}
            <strong>{moment(booking.checkOutDate).format("DD/MM/YYYY")}</strong>
          </p>
        </div>
        <div>
          <p>
            Số ngày đặt phòng : <strong>{numOfdays}</strong>
          </p>
        </div>
        <div>
          <p>
            Số lượng khách hàng :{" "}
            <strong>
              Người lớn: {booking.numOfAdults}
              {booking.numOfChildren === 0
                ? null
                : `, Trẻ em: ${booking.numOfChildren}`}
            </strong>
          </p>

        </div>
        {payment > 0 ? (
          <>
            <p>
              Tổng tiền: <strong>{payment} đồng</strong>
            </p>

            {isFormValid ? (
              <Button variant="success" onClick={handleConfirmBooking}>
                {isProcessingPayment ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Booking Confirmed, redirecting to payment...
                  </>
                ) : (
                  "Xác nhận đơn đặt phòng và tới trang thanh toán"
                )}
              </Button>
            ) : isBookingConfirmed ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-danger">Ngày kết thúc phải sau ngày bắt đầu đặt</p>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
