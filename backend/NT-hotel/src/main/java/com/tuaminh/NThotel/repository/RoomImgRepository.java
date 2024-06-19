package com.tuaminh.NThotel.repository;

import com.tuaminh.NThotel.model.RoomImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomImgRepository extends JpaRepository<RoomImages,Long> {
    List<RoomImages> findImgsByRoomId(Long roomId);
}
