package com.tuaminh.NThotel.service;

import com.tuaminh.NThotel.exception.ResourceNotFoundException;
import com.tuaminh.NThotel.model.Restaurant;
import com.tuaminh.NThotel.model.RestaurantMenu;
import com.tuaminh.NThotel.repository.RestaurantMenuRepository;
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
public class RestaurantMenuService implements IRestaurantMenuService{
    private final RestaurantMenuRepository restaurantMenuRepository;
    private final IRestaurantService restaurantService;
    @Override
    public List<RestaurantMenu> getMenuByRestaurantId(Long restaurantId) {
        return restaurantMenuRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public byte[] getItemImgByMenuId(Long id) throws SQLException {
        Optional<RestaurantMenu> theRestaurantMenu = restaurantMenuRepository.findById(id);
        if(theRestaurantMenu.isEmpty()) {
            throw new ResourceNotFoundException("Xin loi, khong tim thay anh menu");
        }
        Blob photoBlob = theRestaurantMenu.get().getPhoto();
        if(photoBlob !=null){
            return photoBlob.getBytes(1,(int)photoBlob.length());
        }
        return null;
    }

//    @Override
//    public RestaurantMenu savedMenu(Long restaurantId, RestaurantMenu restaurantMenuRequest) {
//        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId).get();
//        restaurant.addRestaurantMenus(restaurantMenuRequest);
//        return restaurantMenuRepository.save(restaurantMenuRequest);
//    }

    @Override
    public void deleteMenu(Long menuId) {
        restaurantMenuRepository.deleteById(menuId);
    }

    @Override
    public RestaurantMenu savedMenu(Long restaurantId, MultipartFile photo, String menuItemName, String menuItemDescription) throws IOException, SQLException {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId).get();
        RestaurantMenu restaurantMenu = new RestaurantMenu();
        restaurantMenu.setMenuItemName(menuItemName);
        restaurantMenu.setMenuItemDescription(menuItemDescription);
        if(!photo.isEmpty()){
            byte[] photoBytes = photo.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            restaurantMenu.setPhoto(photoBlob);
            restaurant.addRestaurantMenus(restaurantMenu);
        }


        return restaurantMenuRepository.save(restaurantMenu);
    }


}
