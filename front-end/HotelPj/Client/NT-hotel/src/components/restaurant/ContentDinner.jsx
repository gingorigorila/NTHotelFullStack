/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ContentCard = ({ key, restaurant }) => {
  return (
    <div className="cuisine-content">
      {restaurant.id % 2 == 0 ? (
        <div className="cuisine-content-items">
          <img
            src={`data:image/png;base64,${restaurant.photo}`}
            alt="Background"
          />
          <div className="cuisine-content-item">
            <div className="cuisine-content-items-header">
            Tên: {restaurant.restaurantName}
            </div>
            <div className="cuisine-content-items-description">
              {restaurant.description}
            </div>
            <div className="cuisine-content-items-description">
            Giờ mở cửa: {restaurant.hours}
            </div>
            <div className="cuisine-content-items-description">
            Địa điểm : {restaurant.location}
            </div>
            <div className="cuisine-content-items-description">
            Email: {restaurant.email}
            </div>
            <div className="cuisine-content-items-description">
            Email: {restaurant.email}
            </div>
          </div>
          <div className="cuisine-options-button">
            <div className="options-button">
              <a href={`/order-restaurant/${restaurant.id}`} className="cuisine-details-button">Đặt bàn</a>
            </div>
            <div className="options-button">
              <a href={`/restaurant-details/${restaurant.id}`} className="cuisine-details-button">Xem chi tiết</a>
            </div>
          </div>
        </div>
      ) : (
        <div className="cuisine-content-items">
          <div className="cuisine-options-button">
            <div className="options-button">
              <a href={`/order-restaurant/${restaurant.id}`} className="cuisine-details-button">Đặt bàn</a>
            </div>
            <div className="options-button">
              <a href={`/restaurant-details/${restaurant.id}`} className="cuisine-details-button">Xem chi tiết</a>
            </div>
          </div>

          <div className="cuisine-content-item">
            <div className="cuisine-content-items-header">
              {restaurant.restaurantName}
            </div>
            <div className="cuisine-content-items-description">
              {restaurant.description}
            </div>
          </div>
          <img
            src={`data:image/png;base64,${restaurant.photo}`}
            alt="Background"
          />
        </div>
      )}
    </div>
  );
};

export default ContentCard;
