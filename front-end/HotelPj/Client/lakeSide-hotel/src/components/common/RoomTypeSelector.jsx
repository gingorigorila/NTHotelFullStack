// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { getRoomType } from "../ultils/ApiFunctions";

// eslint-disable-next-line react/prop-types
const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomType().then((data) => {
      setRoomTypes(data);
    });
  },[]);
  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
    
  };
  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };
  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            required
            className="form-select"
            name="roomType"
            onChange={(e) => {
              if (e.target.value === "Thêm loại phòng mới") {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
            // eslint-disable-next-line react/prop-types
            value={newRoom.roomType}
          >
            <option value={""}>Chọn loại phòng</option>
            <option value={"Thêm loại phòng mới"}> Thêm loại phòng</option>
            {roomTypes.map((type, index) => (
                <option key={index} value={type}>
                    {type}
                </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Ghi loại phòng"
                onChange={handleNewRoomTypeInputChange}
              />
              <button
                className="btn btn-hotel"
                type="button"
                onClick={handleAddNewRoomType}
              >
                Thêm
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
