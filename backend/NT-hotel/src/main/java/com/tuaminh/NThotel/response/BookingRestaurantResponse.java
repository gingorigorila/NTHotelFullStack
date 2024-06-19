package com.tuaminh.NThotel.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRestaurantResponse {
    private Long bookingId;
    private LocalDate bookingDate;
    private LocalTime bookingTime;

    private String bookingRequest;

    private String guestFullName;

    private String guestEmail;

    private String guestTelephone;

    private int NumOfGuest;

    private String bookingConfirmationCode;

    private RestaurantResponse restaurant;

    public BookingRestaurantResponse(Long bookingId, LocalDate bookingDate, LocalTime bookingTime, String bookingRequest, String guestFullName, String guestEmail, String guestTelephone, int numOfGuest, String bookingConfirmationCode) {
        this.bookingId = bookingId;
        this.bookingDate = bookingDate;
        this.bookingTime = bookingTime;
        this.bookingRequest = bookingRequest;
        this.guestFullName = guestFullName;
        this.guestEmail = guestEmail;
        this.guestTelephone = guestTelephone;
        this.NumOfGuest = numOfGuest;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }

}
