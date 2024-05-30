package com.tuaminh.lakesidehotel.service;

import com.tuaminh.lakesidehotel.model.BookedRestaurant;
import com.tuaminh.lakesidehotel.model.Restaurant;
import com.tuaminh.lakesidehotel.repository.BookingRestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingRestaurantService implements IBookingRestaurantService{
    private final BookingRestaurantRepository bookingRestaurantRepository;
    private final IRestaurantService restaurantService;
    @Override
    public List<BookedRestaurant> getAllBookingsByRestaurantId(Long restaurantId) {
        return bookingRestaurantRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRestaurantRepository.deleteById(bookingId);
    }

    @Override
    public String saveBooking(Long restaurantId, BookedRestaurant bookingRequest) {
        Restaurant restaurant=restaurantService.getRestaurantById(restaurantId).get();
        restaurant.addBooking(bookingRequest);
        bookingRestaurantRepository.save(bookingRequest);
        return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public BookedRestaurant findOrderByConfirmationCode(String confirmationCode) {
        return bookingRestaurantRepository.findByBookingConfirmationCode(confirmationCode);
    }

    @Override
    public List<BookedRestaurant> getAllBookingsRestaurant() {
        return bookingRestaurantRepository.findAll();
    }
}
