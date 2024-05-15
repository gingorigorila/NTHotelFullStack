/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRestaurantTypes } from "../../ultils/ApiFunctions";

const RestaurantTypeSelector = ({
  handleRestaurantInputChange,
  newRestaurant,
}) => {
  const [newRestaurantType, setNewRestaurantType] = useState("");
  const [showNewRestaurantTypeInput, setShowNewRestaurantTypeInput] =
    useState(false);
  const [restaurantTypes, setRestaurantTypes] = useState([""]);
  useEffect(() => {
    getRestaurantTypes().then((data) => {
      setRestaurantTypes(data);

    });
  }, []);
  const handleNewRestaurantTypeInputChange = (e) => {
    setNewRestaurantType(e.target.value);
  };
  const handleAddNewRestaurantType = () => {
    if (newRestaurantType !== "") {
      setRestaurantTypes([...restaurantTypes, newRestaurantType]);
      newRestaurantType("");
      setShowNewRestaurantTypeInput(false);
    }
  };
  
  return (
    <div>
      {restaurantTypes.length > 0 && (
        <div>
          <select
            id="restaurantType"
            name="restaurantType"
            value={newRestaurant.restaurantType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRestaurantTypeInput(true);
              } else {
                handleRestaurantInputChange(e);
              }
            }}
          >
            <option value={""}>Chon loai nha hang</option>
            <option value={"Add New"}>Them moi</option>
            {restaurantTypes.map((type, index) => (
              <option value={type} key={index}>
                {type}
              </option>
            ))}
          </select>
          {showNewRestaurantTypeInput && (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Nhap loai khach san"
                onChange={handleNewRestaurantTypeInputChange}
              />
              <button
                className="btn btn-hotel"
                type="button"
                onClick={handleAddNewRestaurantType}
              >
                Them
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantTypeSelector;
