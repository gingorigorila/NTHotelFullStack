package com.tuaminh.NThotel.controller;


import com.tuaminh.NThotel.exception.InternalServerException;
import com.tuaminh.NThotel.exception.PhotoRetrievalException;
import com.tuaminh.NThotel.exception.ResourceNotFoundException;
import com.tuaminh.NThotel.model.BookedRoom;
import com.tuaminh.NThotel.model.Room;
import com.tuaminh.NThotel.model.RoomImages;
import com.tuaminh.NThotel.response.BookingResponse;
import com.tuaminh.NThotel.response.RoomImgResponse;
import com.tuaminh.NThotel.response.RoomResponse;
import com.tuaminh.NThotel.service.BookingService;
import com.tuaminh.NThotel.service.IRoomImgService;
import com.tuaminh.NThotel.service.IRoomService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {
    private final IRoomService roomService;
    private final BookingService bookingService;
    private final IRoomImgService roomImgService;
    @PostMapping("/add/new-room")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice,
            @RequestParam("maxPeople") Long maxPeople,
            @RequestParam("roomDescription") String roomDescription) throws SQLException, IOException {
        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice,maxPeople,roomDescription);
        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(),
                savedRoom.getRoomPrice(),savedRoom.getMaxPeople(),savedRoom.getRoomDescription());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/room/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }
    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : rooms) {
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String base64Photo = Base64.encodeBase64String(photoBytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(base64Photo);
                roomResponses.add(roomResponse);
            }
        }
        return ResponseEntity.ok(roomResponses);
    }

@DeleteMapping("/delete/room/{roomId}")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId){
        roomService.deleteRoom(roomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
}
    @PutMapping("/update/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long roomId,
                                                   @RequestParam(required = false)  String roomType,
                                                   @RequestParam(required = false) BigDecimal roomPrice,
                                                   @RequestParam(required = false) MultipartFile photo,
                                                   @RequestParam(required = false) Long maxPeople,
                                                   @RequestParam(required = false) String roomDescription) throws SQLException, IOException, InternalServerException, InternalServerException {
        byte[] photoBytes = photo != null && !photo.isEmpty() ?
                photo.getBytes() : roomService.getRoomPhotoByRoomId(roomId);
        Blob photoBlob = photoBytes != null && photoBytes.length >0 ? new SerialBlob(photoBytes): null;
        Room theRoom = roomService.updateRoom(roomId, roomType, roomPrice, photoBytes,maxPeople,roomDescription);
        theRoom.setPhoto(photoBlob);
        RoomResponse roomResponse = getRoomResponse(theRoom);
        return ResponseEntity.ok(roomResponse);
    }
    @GetMapping("/room/{roomId}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long roomId){
        Optional<Room> theRoom = roomService.getRoomById(roomId);
        return theRoom.map(room -> {
            RoomResponse roomResponse = getRoomResponse(room);
            return  ResponseEntity.ok(Optional.of(roomResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("Khong tim thay phong"));
    }


    private RoomResponse getRoomResponse(Room room) {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());
        List<RoomImages> roomImages = getAllImgByRoomId(room.getId());
        List<BookingResponse> bookingInfo = bookings
                .stream()
                .map(booking -> new BookingResponse(booking.getBookingId(),
                        booking.getCheckInDate(),
                        booking.getCheckOutDate(), booking.getBookingConfirmationCode(),booking.getOrderPrice())).toList();
        List<RoomImgResponse> roomImgInfo = roomImages
                .stream()
                .map(roomImage -> {
                    try {
                        return new RoomImgResponse(roomImage.getRoomImgId(),
                                Base64.encodeBase64String(roomImage.getRoomPhoto().getBytes(1,(int) roomImage.getRoomPhoto().length())).getBytes());
                    } catch (SQLException e) {
                        throw new RuntimeException(e);
                    }
                }).toList();
        byte[] photoBytes = null;
        Blob photoBlob = room.getPhoto();
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Loi truy xuat hinh anh");
            }
        }
        return new RoomResponse(room.getId(),
                room.getRoomType(), room.getRoomPrice(),
                room.isBooked(), photoBytes, room.getMaxPeople(), room.getRoomDescription(), bookingInfo,roomImgInfo);
    }

    private List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingService.getAllBookingsByRoomId(roomId);
    }
   private List<RoomImages> getAllImgByRoomId(Long roomId){
        return roomImgService.getAllImgsByRoomId(roomId);
   }
    @GetMapping("/available-rooms")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkOutDate,
            @RequestParam("roomType") String roomType
    ) throws SQLException {
        List<Room> availableRooms = roomService.getAvailableRooms(checkInDate,checkOutDate,roomType);
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : availableRooms) {
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String base64Photo = Base64.encodeBase64String(photoBytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(base64Photo);
                roomResponses.add(roomResponse);
            }
        }
        if(roomResponses.isEmpty()){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.ok(roomResponses);
        }
    }
}
