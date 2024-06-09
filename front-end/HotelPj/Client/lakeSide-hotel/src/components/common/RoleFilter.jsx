/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const RoleFilter = ({ data, setAssignRole }) => {
  const [filter, setFilter] = useState("");
  const handleSelectChange = (e) => {
    console.log(e.target.value);
    const selectedType = e.target.value;
    setFilter(selectedType);
    setAssignRole(selectedType);
  };
  const clearFilter = () => {
    setFilter("");
  };
  const roles = ["", ...new Set(data.map((role) => role.name))];
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Cac role
      </span>
      <select
        className="form-select"
        aria-label="room type filter"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value="">Chọn role de them </option>
        {roles.map((type, index) => (
          <option key={index} value={String(index)}>
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

export default RoleFilter;
