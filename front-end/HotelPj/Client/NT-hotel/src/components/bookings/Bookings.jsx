/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { cancelBookings, getAllBookings } from "../ultils/ApiFunctions";
import BookingsTable from "./BookingsTable";

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");
  useEffect(() => {
    setTimeout(() => {
      getAllBookings()
        .then((data) => {
          setBookingInfo(data);
          console.log("data",data)
          setIsLoading(false);
        })
        .catch((e) => {
          setErr(e);
          setIsLoading(false);
        });
    }, 1000);
    
  }, []);
  const handleCancellationBooking = async (bookingId) => {
    try {
      await cancelBookings(bookingId);
      const data = await getAllBookings();
      setBookingInfo(data);
    } catch (e) {
      setErr(e.message);
    }
  };
  return (
    <section className="container" style={{ backgroundColor: "whitesmoke" }}>
      <Header title="Danh sách các đơn đặt phòng hiện có" />
      {err && <div className="text-danger">{err}</div>}
      {isLoading ? (
        <p>Đang tải dữ liệu</p>
      ) : (
        <BookingsTable
          bookingInfo={bookingInfo}
          handleCancellationBooking={handleCancellationBooking}
        />
      )}
    </section>
  );
};

export default Bookings;
