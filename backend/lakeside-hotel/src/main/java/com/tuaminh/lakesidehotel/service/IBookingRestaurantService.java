package com.tuaminh.lakesidehotel.service;

import com.tuaminh.lakesidehotel.model.BookedRestaurant;

import java.util.List;

public interface IBookingRestaurantService {
    List<BookedRestaurant> getAllBookingsByRestaurantId(Long restaurantId);

    void cancelBooking(Long bookingId);

    String saveBooking(Long restaurantId, BookedRestaurant bookingRequest);

    BookedRestaurant findOrderByConfirmationCode(String confirmationCode);

    List<BookedRestaurant> getAllBookingsRestaurant();
}
