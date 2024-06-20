package com.tuaminh.NThotel.service;

import com.tuaminh.NThotel.model.RestaurantMenu;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface IRestaurantMenuService {
    List<RestaurantMenu> getMenuByRestaurantId(Long restaurantId);

    byte[] getItemImgByMenuId(Long id) throws SQLException;
}
