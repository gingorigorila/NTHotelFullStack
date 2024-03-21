package com.tuaminh.lakesidehotel.repository;

import com.tuaminh.lakesidehotel.model.BookedRoom;
import com.tuaminh.lakesidehotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<BookedRoom, Long> {
    Optional<BookedRoom> findByBookingConfimationCode(String confirmationCode);
    List<BookedRoom> findByRoomId(Long roomId);
}
