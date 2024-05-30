package com.tuaminh.lakesidehotel.controller;

import com.tuaminh.lakesidehotel.exception.InternalServerException;
import com.tuaminh.lakesidehotel.exception.PhotoRetrievalException;
import com.tuaminh.lakesidehotel.exception.ResourceNotFoundException;
import com.tuaminh.lakesidehotel.model.BookedRestaurant;
import com.tuaminh.lakesidehotel.model.Restaurant;

import com.tuaminh.lakesidehotel.response.BookingRestaurantResponse;
import com.tuaminh.lakesidehotel.response.RestaurantResponse;

import com.tuaminh.lakesidehotel.service.BookingRestaurantService;
import com.tuaminh.lakesidehotel.service.IBookingRestaurantService;
import com.tuaminh.lakesidehotel.service.IRestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import org.apache.tomcat.util.codec.binary.Base64;

import javax.sql.rowset.serial.SerialBlob;
import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurants")
public class RestaurantController {
    private final IRestaurantService restaurantService;
    private final BookingRestaurantService bookingRestaurantService;

    @PostMapping("/add/new-restaurant")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RestaurantResponse> addNewRestaurant(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("restaurantName") String restaurantName,
            @RequestParam("restaurantType") String restaurantType,
            @RequestParam("location") String restaurantAddress,
            @RequestParam("hours") String restaurantHour,
            @RequestParam("telePhone") String restaurantTelephone,
            @RequestParam("email") String restaurantEmail,
            @RequestParam("description") String restaurantDesc) throws SQLException, IOException {
        Restaurant savedRestaurant = restaurantService.addNewRestaurant(photo, restaurantName, restaurantType,restaurantAddress,
                restaurantHour,restaurantTelephone,restaurantEmail,restaurantDesc);
        RestaurantResponse response = new RestaurantResponse(savedRestaurant.getId(), savedRestaurant.getRestaurantName(),savedRestaurant.getRestaurantType(),savedRestaurant.getLocation(),savedRestaurant.getHours(),savedRestaurant.getTelePhone(),savedRestaurant.getEmail(),savedRestaurant.getDescription());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/restaurant/types")
    public List<String> getRestaurantTypes(){
        return restaurantService.getAllRestaurantTypes();
    }

    @GetMapping("/all-restaurants")
    public ResponseEntity<List<RestaurantResponse>> getAllRestaurants() throws SQLException {
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        List<RestaurantResponse> restaurantResponses=new ArrayList<>();

        for (Restaurant restaurant : restaurants){
          byte[] photoBytes = restaurantService.getPhotoByteByRestaurantId(restaurant.getId());
          if (photoBytes !=null && photoBytes.length>0){
              String base64Photo= Base64.encodeBase64String(photoBytes);
              RestaurantResponse restaurantResponse = getRestaurantResponse(restaurant);
              restaurantResponse.setPhoto(base64Photo);
              restaurantResponses.add(restaurantResponse);
          }
        }
        return ResponseEntity.ok(restaurantResponses);
    }
    @DeleteMapping("/delete/restaurant/{restaurantId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long restaurantId){
        restaurantService.deleteRestaurant(restaurantId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/update/{restaurantId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RestaurantResponse> updateRestaurant(@PathVariable Long restaurantId,
                                                               @RequestParam(required = false) MultipartFile photo,
                                                               @RequestParam(required = false) String restaurantName,
                                                               @RequestParam(required = false) String restaurantType,
                                                               @RequestParam(required = false) String restaurantAddress,
                                                               @RequestParam(required = false) String restaurantHour,
                                                               @RequestParam(required = false) String restaurantTelephone,
                                                               @RequestParam(required = false) String restaurantEmail,
                                                               @RequestParam(required = false) String restaurantDesc ) throws IOException, SQLException, InternalServerException {
        byte[] photoBytes = photo !=null && !photo.isEmpty()?
                photo.getBytes() : restaurantService.getPhotoByteByRestaurantId(restaurantId);
        Blob photoBlob = photoBytes != null && photoBytes.length >0 ? new SerialBlob(photoBytes): null;
        Restaurant theRestaurant = restaurantService.updateRestaurant(restaurantId, restaurantName, restaurantType, restaurantAddress,restaurantHour,restaurantTelephone,restaurantEmail,restaurantDesc,photoBytes);
        theRestaurant.setPhoto(photoBlob);
        RestaurantResponse restaurantResponse = getRestaurantResponse(theRestaurant);
        return ResponseEntity.ok(restaurantResponse);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<Optional<RestaurantResponse>> getRestaurantById(@PathVariable Long restaurantId){
        Optional<Restaurant> theRestaurant = restaurantService.getRestaurantById(restaurantId);
        return theRestaurant.map(restaurant -> {
            RestaurantResponse restaurantResponse = getRestaurantResponse(restaurant);
            return  ResponseEntity.ok(Optional.of(restaurantResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("Khong tim thay nha hang"));
    }
    private RestaurantResponse getRestaurantResponse(Restaurant restaurant) {
        List<BookedRestaurant> bookings = getAllBookingsByRestaurantId(restaurant.getId());
//        List<BookingRestaurantResponse> bookingInfo = bookings
//                .stream()
//                .map(booking->new BookingRestaurantResponse(
//                        booking.getBookingId(),
//                        booking.getBookingDate(),
//                        booking.getBookingTime(),
//                        booking.getBookingRequest(),
//                        booking.getGuestFullName(),
//                        booking.getGuestEmail(),
//                        booking.getGuestTelephone(),
//                        booking.getNumOfGuest(),
//                        booking.getBookingConfirmationCode())).toList();
        byte[] photoBytes = null;
        Blob photoBlob = restaurant.getPhoto();
        if (photoBlob !=null){
            try{
                photoBytes = photoBlob.getBytes(1,(int)photoBlob.length());
            }catch(SQLException e){
                throw new PhotoRetrievalException("Loi truy xuat hinh anh");
            }
        }
        return new RestaurantResponse(restaurant.getId(),
                restaurant.getRestaurantName(), restaurant.getRestaurantType(),
                restaurant.getLocation(), restaurant.getHours(),
                restaurant.getEmail(), restaurant.getTelePhone(),
                restaurant.getDescription(),photoBytes);
    }

    private List<BookedRestaurant> getAllBookingsByRestaurantId(Long restaurantId) {

        return bookingRestaurantService.getAllBookingsByRestaurantId(restaurantId);
    }
}
