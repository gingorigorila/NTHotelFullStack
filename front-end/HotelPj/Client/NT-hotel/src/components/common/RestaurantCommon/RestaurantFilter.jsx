/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";


const RestaurantFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedType = e.target.value;
    setFilter(selectedType);
    const filteredRestaurant = data.filter((restaurant) =>
    restaurant.restaurantType.toLowerCase().includes(selectedType.toLowerCase())
    );
    setFilteredData(filteredRestaurant);
  };
  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };
  const restaurantTypes = ["", ...new Set(data.map((restaurant) => restaurant.restaurantType))];
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Tìm nha hang theo loại 
      </span>
      <select
        className="form-select"
        aria-label="room type filter"
        value={filter}
        onChange={handleSelectChange}>
        <option value="">Chọn kiểu phòng để tìm </option>
        {restaurantTypes.map((type, index) => (
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

export default RestaurantFilter;
