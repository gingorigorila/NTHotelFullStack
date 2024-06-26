package com.tuaminh.NThotel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String restaurantName;
    private String restaurantType;
    private String location;
    private String hours;
    private String email;
    private String telePhone;
    private String description;
    @Lob
    private Blob photo;

    @OneToMany(mappedBy="restaurant", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedRestaurant> bookings;
    @OneToMany(mappedBy="restaurant", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<RestaurantMenu> restaurantMenus;

    public Restaurant() {
        this.bookings = new ArrayList<>();
        this.restaurantMenus=new ArrayList<>();
    }
    public void addBooking(BookedRestaurant booking){
        if (bookings == null){
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        booking.setRestaurant(this);
        String bookingCode = RandomStringUtils.randomNumeric(10);
        booking.setBookingConfirmationCode(bookingCode);
    }
    public void addRestaurantMenus(RestaurantMenu restaurantMenu){
        if(restaurantMenus == null){
            restaurantMenus = new ArrayList<>();
        }
        restaurantMenus.add(restaurantMenu);
        restaurantMenu.setRestaurant(this);
    }
}
