package com.tuaminh.NThotel.repository;


import com.tuaminh.NThotel.model.BookedRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRestaurantRepository extends JpaRepository<BookedRestaurant,Long> {
    BookedRestaurant findByBookingConfirmationCode(String confirmationCode);

    List<BookedRestaurant> findByRestaurantId(Long restaurantId);
}
