package com.tuaminh.lakesidehotel.service;

import com.tuaminh.lakesidehotel.exception.InternalServerException;
import com.tuaminh.lakesidehotel.model.Restaurant;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface IRestaurantService {
    Restaurant addNewRestaurant(MultipartFile file, String restaurantName, String restaurantType, String restaurantAddress, String restaurantHour, String restaurantTelephone, String restaurantEmail, String restaurantDesc) throws SQLException, IOException;

    List<String> getAllRestaurantTypes();

    List<Restaurant> getAllRestaurants();

    byte[] getPhotoByteByRestaurantId(Long id) throws SQLException;

    void deleteRestaurant(long restaurantId);

    Restaurant updateRestaurant(Long restaurantId, String restaurantName, String restaurantType, String restaurantAddress, String restaurantHour, String restaurantTelephone, String restaurantEmail, String restaurantDesc, byte[] photoBytes) throws InternalServerException;

    Optional<Restaurant> getRestaurantById(Long restaurantId);
}
