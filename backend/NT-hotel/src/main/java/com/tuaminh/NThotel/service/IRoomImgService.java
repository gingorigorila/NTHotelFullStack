package com.tuaminh.NThotel.service;

import com.tuaminh.NThotel.model.RoomImages;

import java.util.List;

public interface IRoomImgService {
    RoomImages createImg(Long roomId,RoomImages image);
    public List<RoomImages> viewAll();
    public RoomImages viewById(long id);

    public List<RoomImages> getAllImgsByRoomId(Long roomId);

    void deleteRoomImg(Long roomImgId);


}
