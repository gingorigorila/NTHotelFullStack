package com.tuaminh.NThotel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomImgId;
    @Lob
    private Blob roomPhoto;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;
    public void setRoom(Room room) {
        this.room=room;
    }
}
