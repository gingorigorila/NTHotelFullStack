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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurantMenu")
public class RestaurantMenuController {
    private final IRestaurantMenuService restaurantMenuService;
    private final IRestaurantService restaurantService;
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
   @PostMapping("/add-menu/restaurant/{restaurantId}")
   public ResponseEntity<RestaurantMenuResponse> addMenu(@PathVariable Long restaurantId,
                                                         @RequestParam("photo") MultipartFile photo,
                                                         @RequestParam("menuItemName") String menuItemName,
                                                         @RequestParam("menuItemDescription") String menuItemDescription) throws SQLException, IOException {
        RestaurantMenu savedRestaurantMenu = restaurantMenuService.savedMenu(restaurantId,photo,menuItemName,menuItemDescription);
        RestaurantMenuResponse response = new RestaurantMenuResponse(savedRestaurantMenu.getId(), savedRestaurantMenu.getMenuItemName(), savedRestaurantMenu.getMenuItemDescription());
        return ResponseEntity.ok(response);
   }
   @DeleteMapping("/delete-menu/{menuId}")
   public void deleMenu(@PathVariable Long menuId){
        restaurantMenuService.deleteMenu(menuId);
   }
    private RestaurantMenuResponse getRestaurantMenuResponse(RestaurantMenu restaurantMenu) {
            Restaurant theRestaurant = restaurantService.getRestaurantById(restaurantMenu.getRestaurant().getId()).get();
            RestaurantResponse restaurant = new RestaurantResponse(theRestaurant.getId(),  theRestaurant.getRestaurantName(), theRestaurant.getRestaurantType(), theRestaurant.getLocation(), theRestaurant.getHours(), theRestaurant.getEmail(), theRestaurant.getTelePhone(),theRestaurant.getDescription());
            return new RestaurantMenuResponse(restaurantMenu.getId(), restaurantMenu.getMenuItemName(), restaurantMenu.getMenuItemDescription(),restaurantMenu.getPhoto().toString(),restaurant );
    }

}
