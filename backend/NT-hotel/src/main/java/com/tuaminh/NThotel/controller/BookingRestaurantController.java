package com.tuaminh.NThotel.controller;


import com.tuaminh.NThotel.exception.InvalidBookingRequest;
import com.tuaminh.NThotel.exception.ResourceNotFoundException;
import com.tuaminh.NThotel.model.BookedRestaurant;
import com.tuaminh.NThotel.model.Restaurant;
import com.tuaminh.NThotel.response.BookingRestaurantResponse;
import com.tuaminh.NThotel.response.RestaurantResponse;
import com.tuaminh.NThotel.service.IBookingRestaurantService;
import com.tuaminh.NThotel.service.IRestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/order-restaurant")
public class BookingRestaurantController {
    private final IBookingRestaurantService bookingRestaurantService;
    private final IRestaurantService restaurantService;
    @GetMapping("/all-orders")
    public ResponseEntity<List<BookingRestaurantResponse>> getAllBookingRestaurant(){
        List<BookedRestaurant> bookings = bookingRestaurantService.getAllBookingsRestaurant();
        List<BookingRestaurantResponse> bookingRestaurantResponses = new ArrayList<>();
        for (BookedRestaurant booking : bookings){
            BookingRestaurantResponse bookingRestaurantResponse = getBookingResponse(booking);
            bookingRestaurantResponses.add(bookingRestaurantResponse);
        }
        return ResponseEntity.ok(bookingRestaurantResponses);
    }
    @GetMapping("/confirmation-order/{confirmationCode}")
    public ResponseEntity<?> getOrderByConfirmationCode(@PathVariable String confirmationCode){
        try {
            BookedRestaurant bookings = bookingRestaurantService.findOrderByConfirmationCode(confirmationCode);
            BookingRestaurantResponse bookingRestaurantResponse = getBookingResponse(bookings);
            return ResponseEntity.ok(bookingRestaurantResponse);
        }catch(ResourceNotFoundException ex){
          return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }



    @PostMapping("/restaurant/{restaurantId}/order")
    public ResponseEntity<?> saveBooking(@PathVariable Long restaurantId,
                                         @RequestBody BookedRestaurant bookingRequest){
        try {
            String confirmationCode = bookingRestaurantService.saveBooking(restaurantId, bookingRequest);
            return ResponseEntity.ok("Đặt bàn thành công, mã đơn la :" +confirmationCode);
        }catch(InvalidBookingRequest e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/order/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingRestaurantService.cancelBooking(bookingId);
    }
    private BookingRestaurantResponse getBookingResponse(BookedRestaurant booking) {
        Restaurant theRestaurant = restaurantService.getRestaurantById(booking.getRestaurant().getId()).get();
        RestaurantResponse restaurant = new RestaurantResponse(theRestaurant.getId(), theRestaurant.getRestaurantName(),
                                        theRestaurant.getRestaurantType(), theRestaurant.getLocation(), theRestaurant.getHours(),
                                        theRestaurant.getEmail(), theRestaurant.getTelePhone(),
                                        theRestaurant.getDescription());
        return new BookingRestaurantResponse(
                booking.getBookingId(),booking.getBookingDate(),
                booking.getBookingTime(), booking.getBookingRequest(),
                booking.getGuestFullName(), booking.getGuestEmail(),
                booking.getGuestTelephone(), booking.getNumOfGuest(),
                booking.getBookingConfirmationCode(),restaurant);

    }
}
