/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import DateSlider from "../common/DateSlider";

const BookingsTable = ({ bookingInfo, handleCancellationBooking }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const formattedCheckInDate = `${booking.checkInDate[0]}-0${booking.checkInDate[1]}-${booking.checkInDate[2]}`;
        const formattedCheckOutDate = `${booking.checkOutDate[0]}-0${booking.checkOutDate[1]}-${booking.checkOutDate[2]}`;
        const bookingStartDate = parseISO(formattedCheckInDate);
        const bookingEndDate = parseISO(formattedCheckOutDate);
        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBookings(filtered);
  };
  useEffect(() => {
    setFilteredBookings(bookingInfo);
    console.log(bookingInfo);
  }, [bookingInfo]);
  return (
    <section>
      <DateSlider
        onDateChange={filterBookings}
        onFilterChange={filterBookings}
      />
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Mã đơn</th>
            <th>Tên phòng</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Tên người đặt</th>
            <th>Email</th>
            <th>Người lớn</th>
            <th>Trẻ em</th>
            <th>Số lượng người ở</th>
            <th>Tình trạng</th>
            <th>Mã xác nhận</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>{booking.id}</td>
              <td>{booking.room.roomType}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              <td>{booking.guestFullName}</td>
              <td>{booking.guestEmail}</td>
              <td>{booking.numOfAdults}</td>
              <td>{booking.numOfChildren}</td>
              <td>{booking.totalNumOfGuest}</td>
              <td>{booking.bookingStatus}</td>
              <td>{booking.bookingConfirmationCode}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancellationBooking(booking.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filterBookings.length === 0 && (
        <p>Không tìm thấy đơn đặt theo ngày được chọn</p>
      )}
    </section>
  );
};

export default BookingsTable;
