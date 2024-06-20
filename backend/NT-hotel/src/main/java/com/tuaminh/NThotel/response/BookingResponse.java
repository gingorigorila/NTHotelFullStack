package com.tuaminh.NThotel.response;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    private Long id;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private String guestFullName;


    private String guestEmail;


    private int NumOfAdults;


    private int NumOfChildren;


    private int totalNumOfGuest;


    private String bookingConfirmationCode;
    private BigDecimal orderPrice;

    private RoomResponse room ;

    public BookingResponse(Long id, LocalDate checkInDate, LocalDate checkOutDate,
                           String bookingConfirmationCode,BigDecimal orderPrice) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
        this.orderPrice=orderPrice;
    }
}
