package com.tuaminh.lakesidehotel.service;

import com.tuaminh.lakesidehotel.exception.InternalServerException;
import com.tuaminh.lakesidehotel.exception.ResourceNotFoundException;
import com.tuaminh.lakesidehotel.model.Restaurant;
import com.tuaminh.lakesidehotel.model.Room;
import com.tuaminh.lakesidehotel.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantService implements IRestaurantService{
    private final RestaurantRepository restaurantRepository;
    public Restaurant addNewRestaurant(MultipartFile file, String restaurantName, String restaurantType, String restaurantAddress, String restaurantHour, String restaurantTelephone, String restaurantEmail, String restaurantDesc) throws SQLException, IOException{
        Restaurant restaurant = new Restaurant();
        restaurant.setRestaurantName(restaurantName);
        restaurant.setRestaurantType(restaurantType);
        restaurant.setLocation(restaurantAddress);
        restaurant.setHours(restaurantHour);
        restaurant.setTelePhone(restaurantTelephone);
        restaurant.setEmail(restaurantEmail);
        restaurant.setDescription(restaurantDesc);
        if (!file.isEmpty()){
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            restaurant.setPhoto(photoBlob);
        }
        return restaurantRepository.save(restaurant);
    }

    @Override
    public List<String> getAllRestaurantTypes() {
        return restaurantRepository.findDistinctRestaurantTypes();
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public byte[] getPhotoByteByRestaurantId(Long restaurantId) throws SQLException {
        Optional<Restaurant> theRestaurant = restaurantRepository.findById(restaurantId);
        if (theRestaurant.isEmpty()){
        throw new ResourceNotFoundException("Xin loi, Khong tim thay nha hang !");
        }
        Blob photoBlob = theRestaurant.get().getPhoto();
        if(photoBlob !=null){
            return photoBlob.getBytes(1,(int) photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteRestaurant(long restaurantId) {
        Optional<Restaurant> theRestaurant = restaurantRepository.findById(restaurantId);
        if(theRestaurant.isPresent()){
            restaurantRepository.deleteById(restaurantId);
        }
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, String restaurantName, String restaurantType, String restaurantAddress, String restaurantHour, String restaurantTelephone, String restaurantEmail, String restaurantDesc, byte[] photoBytes) throws InternalServerException {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).get();
        System.out.print(restaurant);
        if (restaurantName != null) restaurant.setRestaurantName(restaurantName);
        if (restaurantType != null) restaurant.setRestaurantType(restaurantType);
        if (restaurantAddress != null) restaurant.setLocation(restaurantAddress);
        if(restaurantHour != null) restaurant.setHours(restaurantHour);
        if(restaurantEmail !=null) restaurant.setEmail(restaurantEmail);
        if(restaurantTelephone !=null) restaurant.setTelePhone(restaurantTelephone);
        if(restaurantDesc !=null) restaurant.setDescription(restaurantDesc);
        if (photoBytes != null && photoBytes.length > 0) {
            try {
                restaurant.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Fail updating restaurant");
            }
        }
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Optional<Restaurant> getRestaurantById(Long restaurantId) {
        return Optional.of(restaurantRepository.findById(restaurantId).get());
    }
}
