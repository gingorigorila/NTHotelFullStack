package com.tuaminh.lakesidehotel.controller;

import com.tuaminh.lakesidehotel.exception.InvalidBookingRequest;
import com.tuaminh.lakesidehotel.exception.ResourceNotFoundException;
import com.tuaminh.lakesidehotel.model.BookedRoom;
import com.tuaminh.lakesidehotel.model.Room;
import com.tuaminh.lakesidehotel.response.BookingResponse;
import com.tuaminh.lakesidehotel.response.RoomResponse;
import com.tuaminh.lakesidehotel.service.BookingService;
import com.tuaminh.lakesidehotel.service.IBookingService;
import com.tuaminh.lakesidehotel.service.IRoomService;
import com.tuaminh.lakesidehotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {
    private final IBookingService bookingService;
    private final IRoomService roomService;
    @GetMapping("/all-bookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for(BookedRoom booking: bookings ){
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }



    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode){
        try {
            BookedRoom booking = bookingService.findByBookingConfimationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        }catch(ResourceNotFoundException ex){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }


    @PostMapping ("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId,@RequestBody BookedRoom bookingRequest){
        try{
            String confimationCode = bookingService.saveBooking(roomId,bookingRequest);
            return ResponseEntity.ok("Bạn đã đặt thành công, mã xác nhận là : "+confimationCode);
        }catch(InvalidBookingRequest e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelBooking(bookingId);
    }
    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse room = new RoomResponse(theRoom.getId(),theRoom.getRoomType(),theRoom.getRoomPrice());
        return new BookingResponse(booking.getBookingId(), booking.getCheckInDate(),
                booking.getCheckOutDate(),booking.getGuestFullName(),
                booking.getGuestEmail(),booking.getNumOfAdults(),
                booking.getNumOfChildren(),booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(), room);
    }
}
