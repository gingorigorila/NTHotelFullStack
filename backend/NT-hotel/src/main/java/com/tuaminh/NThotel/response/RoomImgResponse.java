package com.tuaminh.NThotel.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomImgResponse {
    private Long roomImgId;
    private String roomPhoto;
    private RoomResponse room ;
    public RoomImgResponse(Long roomImgId,  byte[] photoBytes){
        this.roomImgId=roomImgId;
        this.roomPhoto=photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
    }
}
