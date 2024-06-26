/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";


const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedType = e.target.value;
    setFilter(selectedType);
    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedType.toLowerCase())
    );
    setFilteredData(filteredRooms);
  };
  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };
  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Tìm phòng theo loại 
      </span>
      <select
        className="form-select"
        aria-label="room type filter"
        value={filter}
        onChange={handleSelectChange}>
        <option value="">Chọn kiểu phòng để tìm </option>
        {roomTypes.map((type, index) => (
          <option key={index} value={String(type)}>
            {String(type)}
          </option>
        ))}
      </select>
      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        Xóa
      </button>
    </div>
  );
};

export default RoomFilter;
