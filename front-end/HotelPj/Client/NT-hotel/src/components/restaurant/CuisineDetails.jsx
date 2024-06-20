/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { displayMenuByRetaurantId } from "../ultils/ApiFunctions";
const CuisineDetails = () => {
  const { restaurantId } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    displayMenuByRetaurantId(restaurantId).then((data) => {
      setData(data);
    });
    console.log("data:", data);
  }, [data, restaurantId]);

  return (
    <div>
      <img
        style={{ width: "100%" }}
        src="https://www.icsaigon.com/sites/icsaigon/files/styles/home_slider/public/2018-08/Market%2039%20banner_0.jpg?itok=RPOPGTCb"
      ></img>
      <div className="cuisine-content-top">
        <div>
          <img
            style={{ width: "139px" }}
            src="https://www.icsaigon.com/sites/icsaigon/files/inline-images/Market%2039%20-%20transparent%20-%20small_0.png"
          ></img>
          <p>
            <span className="address-email">NTHotel@Gmail.com</span>{" "}
            <span className="address-phone">(028) 3520 9999</span>&nbsp;Tầng
            Trệt
            <span className="address-location">
              , NT Hotel&nbsp;
            </span>
          </p>
        </div>
      </div>
      
        <div className="dining-offer-container">
          <div className="dining-offer-wrapper">
          {data.map((menu) => (
            <div className="dining-offer-items">
              <div className="dining-offer-header">{menu.menuItemName}</div>
              <div className="dining-offer-description">
                {menu.menuItemDescription}
              </div>
              <img
                style={{ marginTop: "24px" }}
                src={`data:image/png;base64, ${menu.menuItemPhoto}`}
              ></img>
            </div>
            ))}
          </div>
          
        </div>
        
      
      <div
            className="cuisine-options-button"
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <div className="options-button">
              <a
                className="cuisine-details-button"
                // onClick={() => handleViewDetails(content)}
              >
                Đặt bàn
              </a>
            </div>
          </div>
    </div>
  );
};
export default CuisineDetails;
