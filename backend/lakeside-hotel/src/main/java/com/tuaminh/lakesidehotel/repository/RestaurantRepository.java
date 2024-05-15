package com.tuaminh.lakesidehotel.repository;

import com.tuaminh.lakesidehotel.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {
    @Query("SELECT DISTINCT r.restaurantType FROM Restaurant r")
    List<String> findDistinctRestaurantTypes();
}
