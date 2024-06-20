package com.tuaminh.NThotel.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantMenuResponse {
    private Long id;
    private String menuItemName;
    private String menuItemDescription;
    private String menuItemPhoto;
    private RestaurantResponse restaurant;

    public RestaurantMenuResponse(Long id,String menuItemName,String menuItemDescription,byte[] photoBytes){
        this.id=id;
        this.menuItemName=menuItemName;
        this.menuItemDescription=menuItemDescription;
        this.menuItemPhoto=photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
    }
}
