package com.tuaminh.NThotel.service;

//import com.tuaminh.lakesidehotel.exception.InvalidBookingRequest;
//import com.tuaminh.lakesidehotel.exception.ResourceNotFoundException;
//import com.tuaminh.lakesidehotel.model.BookedRoom;
//import com.tuaminh.lakesidehotel.model.Room;
//import com.tuaminh.lakesidehotel.repository.BookingRepository;
import com.tuaminh.NThotel.exception.InvalidBookingRequest;
import com.tuaminh.NThotel.exception.ResourceNotFoundException;
import com.tuaminh.NThotel.model.BookedRoom;
import com.tuaminh.NThotel.model.Room;
import com.tuaminh.NThotel.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService{
   private final BookingRepository bookingRepository;
   private final IRoomService roomService;
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {

        return bookingRepository.findByRoomId(roomId);
    }

    @Override
    public void cancelBooking(Long bookingId) {
       bookingRepository.deleteById(bookingId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequest("Check-in date must come before check-out date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest,existingBookings);
        if (roomIsAvailable){
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }else{
            throw  new InvalidBookingRequest("Sorry, This room is not available for the selected dates;");
        }
        return bookingRequest.getBookingConfimationCode();
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }

    @Override
    public BookedRoom findByBookingConfimationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfimationCode(confirmationCode).
                orElseThrow(() -> new ResourceNotFoundException("No booking found with booking code :"+confirmationCode));
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<BookedRoom> findBookingByEmail(String email) {
        return bookingRepository.findBookingByGuestEmail(email);
    }
}
