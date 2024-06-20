package com.tuaminh.NThotel.repository;

import com.tuaminh.NThotel.model.RestaurantMenu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantMenuRepository extends JpaRepository<RestaurantMenu,Long> {
    List<RestaurantMenu> findByRestaurantId(Long restaurantId);
}
