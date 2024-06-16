package com.tuaminh.NThotel.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;


@Data
@NoArgsConstructor
public class RoomResponse {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private Long maxPeople;
    private String roomDescription;
    private boolean isBooked;
    private String photo;
    private List<BookingResponse>bookings;

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice,Long maxPeople,String roomDescription) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.maxPeople=maxPeople;
        this.roomDescription=roomDescription;
    }

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice, boolean isBooked,
                        byte[] photoBytes,Long maxPeople,String roomDescription, List<BookingResponse> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.maxPeople=maxPeople;
        this.roomDescription=roomDescription;
        this.bookings = bookings;

    }


    public void add(List<RoomResponse> roomResponses) {
    }

}