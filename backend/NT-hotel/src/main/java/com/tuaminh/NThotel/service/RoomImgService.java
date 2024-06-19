package com.tuaminh.NThotel.service;

import com.tuaminh.NThotel.model.Room;
import com.tuaminh.NThotel.model.RoomImages;
import com.tuaminh.NThotel.repository.RoomImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class RoomImgService implements IRoomImgService{
    private final RoomImgRepository roomImgRepository;
    private final IRoomService roomService;
    @Override
    public RoomImages createImg(Long roomId,RoomImages image) {
        Room room = roomService.getRoomById(roomId).get();
        room.addRoomImages(image);

        return  roomImgRepository.save(image);
    }

    @Override
    public List<RoomImages> viewAll() {
        return (List<RoomImages>) roomImgRepository.findAll();
    }

    @Override
    public RoomImages viewById(long id) {
        return roomImgRepository.findById(id).get();
    }

    @Override
    public List<RoomImages> getAllImgsByRoomId(Long roomId) {
        return roomImgRepository.findImgsByRoomId(roomId);
    }

    @Override
    public void deleteRoomImg(Long roomImgId) {
       roomImgRepository.deleteById(roomImgId);
    }
}
