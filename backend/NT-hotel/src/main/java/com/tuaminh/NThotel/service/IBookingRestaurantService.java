package com.tuaminh.NThotel.service;



import com.tuaminh.NThotel.model.BookedRestaurant;

import java.util.List;

public interface IBookingRestaurantService {
    List<BookedRestaurant> getAllBookingsByRestaurantId(Long restaurantId);

    void cancelBooking(Long bookingId);

    String saveBooking(Long restaurantId, BookedRestaurant bookingRequest);

    BookedRestaurant findOrderByConfirmationCode(String confirmationCode);

    List<BookedRestaurant> getAllBookingsRestaurant();
}
