package com.tuaminh.NThotel.controller;

import com.tuaminh.NThotel.model.Room;
import com.tuaminh.NThotel.model.RoomImages;
import com.tuaminh.NThotel.response.RoomImgResponse;
import com.tuaminh.NThotel.response.RoomResponse;
import com.tuaminh.NThotel.service.IRoomImgService;
import com.tuaminh.NThotel.service.IRoomService;
import com.tuaminh.NThotel.service.RoomImgService;
import com.tuaminh.NThotel.service.RoomService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/roomImg")
public class RoomImgController {
    private final RoomImgService roomImgService;
    private final IRoomService roomService;
    @GetMapping("/display")
    public ResponseEntity<byte[]> displayImage(@RequestParam("id") Long id) throws SQLException {
    RoomImages roomImage = roomImgService.viewById(id);
    byte[] imageBytes = null;
    imageBytes = roomImage.getRoomPhoto().getBytes(1,(int) roomImage.getRoomPhoto().length());
    return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
}
    @GetMapping("/all")
    public ResponseEntity<List<RoomImgResponse>> displayAllRoomImg() throws SQLException {
     List<RoomImages> imageList = roomImgService.viewAll();
     List<RoomImgResponse> roomImgResponses = new ArrayList<>();
     for (RoomImages roomImage : imageList){
         byte[] imageBytes = null;
         imageBytes = roomImage.getRoomPhoto().getBytes(1,(int) roomImage.getRoomPhoto().length());
         String base64Photo = Base64.encodeBase64String(imageBytes);
         RoomImgResponse roomImgResponse = getRoomImgResponse(roomImage);
         roomImgResponse.setRoomPhoto(base64Photo);
         roomImgResponses.add(roomImgResponse);
     }
     return ResponseEntity.ok(roomImgResponses);
}
    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<RoomImgResponse>> displayRoomImgByRoomId(@PathVariable("roomId") Long roomId) throws SQLException {
        List<RoomImages> imageList = roomImgService.getAllImgsByRoomId(roomId);
        List<RoomImgResponse> roomImgResponses = new ArrayList<>();
        for (RoomImages roomImage : imageList) {
            byte[] imageBytes = null;
            imageBytes = roomImage.getRoomPhoto().getBytes(1, (int) roomImage.getRoomPhoto().length());
            String base64Photo = Base64.encodeBase64String(imageBytes);
            RoomImgResponse roomImgResponse = getRoomImgResponse(roomImage);
            roomImgResponse.setRoomPhoto(base64Photo);
            roomImgResponses.add(roomImgResponse);
        }
        return ResponseEntity.ok(roomImgResponses);
    }

    private RoomImgResponse getRoomImgResponse(RoomImages roomImage) {
        Room theRoom = roomService.getRoomById(roomImage.getRoom().getId()).get();
        RoomResponse room = new RoomResponse(theRoom.getId(),theRoom.getRoomType(),theRoom.getRoomPrice(), theRoom.getMaxPeople(), theRoom.getRoomDescription());
        return new RoomImgResponse(roomImage.getRoomImgId(), roomImage.getRoomPhoto().toString(),room);
    }

    @PostMapping("/add-roomImg/room/{roomId}")
    public String addImagePost(@PathVariable Long roomId, @RequestParam(required = false,name="image")MultipartFile file) throws IOException, SQLException {
     byte[] bytes = file.getBytes();
     Blob blob= new javax.sql.rowset.serial.SerialBlob(bytes);

     RoomImages roomImage = new RoomImages();
     roomImage.setRoomPhoto(blob);
     roomImgService.createImg(roomId,roomImage);
     return "redirect:/all";
}
    @DeleteMapping("/delete-roomImg/{roomImgId}/delete")
    public void deleteRoomImg(@PathVariable Long roomImgId){
         roomImgService.deleteRoomImg(roomImgId);
    }
}
