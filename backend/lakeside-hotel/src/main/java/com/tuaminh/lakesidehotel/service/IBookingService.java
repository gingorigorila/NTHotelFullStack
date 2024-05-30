package com.tuaminh.lakesidehotel.service;

import com.tuaminh.lakesidehotel.model.BookedRoom;

import java.util.List;

public interface IBookingService {
    void cancelBooking(Long bookingId);

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    BookedRoom findByBookingConfimationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();

    List<BookedRoom> findBookingByEmail(String email);
}
