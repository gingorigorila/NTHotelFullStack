package com.tuaminh.lakesidehotel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class BookedRestaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(name = "booking_date")
    private LocalDate bookingDate;

    @Column(name = "booking_time")
    private LocalTime bookingTime;

    @Column(name = "booking_request")
    private String bookingRequest;

    @Column(name = "guest_fullName")
    private String guestFullName;

    @Column(name = "guest_Email")
    private String guestEmail;

    @Column(name = "guest_Telephone")
    private String guestTelephone;

    @Column(name = "numOf_guest")
    private int NumOfGuest;

    @Column(name = "confirmation_Code")
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;


    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant=restaurant;
    }

    public String getBookingConfirmationCode() {
        return this.bookingConfirmationCode;
    }
}
