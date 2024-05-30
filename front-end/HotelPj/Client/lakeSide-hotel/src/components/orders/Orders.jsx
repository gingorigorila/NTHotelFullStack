/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { cancelOrders, getAllOrders } from "../ultils/ApiFunctions";
import OrderTable from "./OrderTable";

const Orders = () => {
    const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");
  useEffect(() => {
    setTimeout(() => {
      getAllOrders()
        .then((data) => {
          setBookingInfo(data);
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
      await cancelOrders(bookingId);
      const data = await getAllOrders();
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
        <OrderTable
          orderInfo={bookingInfo}
          handleCancellationOrder={handleCancellationBooking}
        />
      )}
    </section>
  )
}

export default Orders
