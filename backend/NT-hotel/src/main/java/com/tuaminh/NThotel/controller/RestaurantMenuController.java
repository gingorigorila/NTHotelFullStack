package com.tuaminh.NThotel.controller;

import com.tuaminh.NThotel.model.Restaurant;
import com.tuaminh.NThotel.model.RestaurantMenu;
import com.tuaminh.NThotel.response.RestaurantMenuResponse;
import com.tuaminh.NThotel.response.RestaurantResponse;
import com.tuaminh.NThotel.service.IRestaurantMenuService;
import com.tuaminh.NThotel.service.IRestaurantService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurantMenu")
public class RestaurantMenuController {
    private final IRestaurantMenuService restaurantMenuService;
    private IRestaurantService restaurantService;
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<RestaurantMenuResponse>> displayMenuByRestaurantId(@PathVariable("restaurantId") Long restaurantId) throws SQLException {
        List<RestaurantMenu> restaurantMenus = restaurantMenuService.getMenuByRestaurantId(restaurantId);
        List<RestaurantMenuResponse> restaurantMenuResponses = new ArrayList<>();
        for (RestaurantMenu restaurantMenu : restaurantMenus){
            byte[] imageBytes = restaurantMenuService.getItemImgByMenuId(restaurantMenu.getId());
            if (imageBytes != null && imageBytes.length > 0) {
                String base64Photo = Base64.encodeBase64String(imageBytes);
                RestaurantMenuResponse restaurantMenuResponse = getRestaurantMenuResponse(restaurantMenu);
                restaurantMenuResponse.setMenuItemPhoto(base64Photo);
                restaurantMenuResponses.add(restaurantMenuResponse);
            }
        }
        return ResponseEntity.ok(restaurantMenuResponses);
    }

    private RestaurantMenuResponse getRestaurantMenuResponse(RestaurantMenu restaurantMenu) {
            Restaurant theRestaurant = restaurantService.getRestaurantById(restaurantMenu.getRestaurant().getId()).get();
            RestaurantResponse restaurant = new RestaurantResponse(theRestaurant.getId(),  theRestaurant.getRestaurantName(), theRestaurant.getRestaurantType(), theRestaurant.getLocation(), theRestaurant.getHours(), theRestaurant.getEmail(), theRestaurant.getTelePhone(),theRestaurant.getDescription());
            return new RestaurantMenuResponse(restaurantMenu.getId(), restaurantMenu.getMenuItemName(), restaurantMenu.getMenuItemDescription(),restaurantMenu.getPhoto().toString(),restaurant );
    }

}
