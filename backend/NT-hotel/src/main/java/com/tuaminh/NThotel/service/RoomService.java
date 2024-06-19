package com.tuaminh.NThotel.service;


import com.tuaminh.NThotel.exception.InternalServerException;
import com.tuaminh.NThotel.exception.ResourceNotFoundException;
import com.tuaminh.NThotel.model.Room;
import com.tuaminh.NThotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService{
    private final RoomRepository roomRepository ;

    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice, Long maxPeople, String roomDescription) throws SQLException, IOException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if (!file.isEmpty()){
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        room.setMaxPeople(maxPeople);
        room.setRoomDescription((roomDescription));
        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isEmpty()){
            throw new ResourceNotFoundException("Xin loi, khong the tim thay phong");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if(photoBlob != null){
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteRoom(Long roomId){
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isPresent()){
            roomRepository.deleteById(roomId);
        }
    }

    @Override
    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes,Long maxPeople,String roomDescription) throws InternalServerException {
        Room room = roomRepository.findById(roomId).get();
        System.out.print(room);
        if (roomType != null) room.setRoomType(roomType);
        if (roomPrice != null) room.setRoomPrice(roomPrice);
        if(maxPeople !=null) room.setMaxPeople((maxPeople));
        if(roomDescription !=null) room.setRoomDescription((roomDescription));
        if (photoBytes != null && photoBytes.length > 0) {
            try {
                room.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Khong the cap nhap thong tin phong");
            }
        }
        return roomRepository.save(room);
    }
    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(roomRepository.findById(roomId).get());
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return  roomRepository.findByDatesAndRoomType(checkInDate,checkOutDate,roomType);
    }

//    @Override
//    public byte[] getRoomPhotoById(Long roomId) throws SQLException {
//        Optional<Room> theRoom = roomRepository.findById(roomId);
//        if(theRoom.isEmpty()){
//            throw new ResourceNotFoundException("Xin loi, phong khong tim thay");
//        }
//        Blob photoBlob  = theRoom.get().getPhoto();
//        if(photoBlob!=null){
//            return photoBlob.getBytes(1,(int)photoBlob.length());
//        }
//        return null;
//    }
}
