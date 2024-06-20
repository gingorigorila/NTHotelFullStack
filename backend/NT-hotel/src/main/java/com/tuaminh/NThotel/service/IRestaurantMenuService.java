package com.tuaminh.NThotel.service;

import com.tuaminh.NThotel.model.RestaurantMenu;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface IRestaurantMenuService {
    List<RestaurantMenu> getMenuByRestaurantId(Long restaurantId);

    byte[] getItemImgByMenuId(Long id) throws SQLException;

    void deleteMenu(Long menuId);

    RestaurantMenu savedMenu(Long restaurantId, MultipartFile photo, String menuItemName, String menuItemDescription) throws IOException, SQLException;
}
