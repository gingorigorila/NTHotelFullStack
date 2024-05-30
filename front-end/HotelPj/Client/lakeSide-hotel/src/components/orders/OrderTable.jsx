/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import DateSlider from "../common/DateSlider";

const OrderTable = ({ orderInfo, handleCancellationOrder }) => {
    const [filteredBookings, setFilteredBookings] = useState(orderInfo);

    const filterBookings = (startDate, endDate) => {
      let filtered = orderInfo;
      if (startDate && endDate) {
        filtered = orderInfo.filter((order) => {
          const bookingDate = parseISO(order.bookingDate);
          return (
            bookingDate >= startDate &&
            bookingDate <= endDate 
          );
        });
      }
      setFilteredBookings(filtered);
    };
    useEffect(() => {
      setFilteredBookings(orderInfo);
      console.log(orderInfo)
    }, [orderInfo]);
  return (
    <section>
     
      <table>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Mã nha hang</th>
            <th>Ngày dat</th>
            <th>Gio dat</th>
            <th>Tên người đặt</th>
            <th>Email</th>
            <th>So dien thoai</th>
            <th>Số lượng khach</th>
            <th>Yeu cau</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>{booking.id}</td>
              <td>{booking.restaurant.id}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.bookingTime}</td>
              <td>{booking.guestFullName}</td>
              <td>{booking.guestEmail}</td>
              <td>{booking.guestTelephone}</td>
              <td>{booking.numOfGuest}</td>
              <td>{booking.bookingRequest}</td>
              <td>{booking.bookingConfirmationCode}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancellationOrder(booking.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filterBookings.length ===0 && <p>Không tìm thấy đơn đặt theo ngày được chọn</p>}
    </section>
  )
}

export default OrderTable
