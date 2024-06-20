package com.tuaminh.NThotel.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.util.List;

@Data
@NoArgsConstructor
public class RestaurantResponse {
    private  Long id;
    private String restaurantName;
    private String restaurantType;
    private String location;
    private String hours;
    private String email;
    private String telePhone;
    private String description;
    private String photo;
    private List<BookingRestaurantResponse> bookings;
    private List<RestaurantMenuResponse> restaurantMenus;

    public RestaurantResponse(Long id, String restaurantName, String restaurantType, String location, String hours, String email, String telePhone, String description) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.restaurantType = restaurantType;
        this.location = location;
        this.hours = hours;
        this.email = email;
        this.telePhone = telePhone;
        this.description = description;
    }


    public RestaurantResponse(Long id, String restaurantName, String restaurantType, String location, String hours, String email, String telePhone, String description, byte[] photoBytes,List<BookingRestaurantResponse> bookings,List<RestaurantMenuResponse> restaurantMenus) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.restaurantType = restaurantType;
        this.location = location;
        this.hours = hours;
        this.email = email;
        this.telePhone = telePhone;
        this.description = description;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.bookings = bookings;
        this.restaurantMenus=restaurantMenus;
    }



    public void add(List<RestaurantResponse> restaurantResponses) {
    }
}
