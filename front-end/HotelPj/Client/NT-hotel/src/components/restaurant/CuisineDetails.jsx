/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation, useParams } from "react-router-dom";
const CuisineDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  console.log(state);
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
          <p>&nbsp;</p>
          <h1>{state.header}</h1>
          <p>&nbsp;</p>
          <p>{state.description}</p>
          <p>&nbsp;</p>
          <p>
            <span className="address-email">dine@icsaigon.com</span>{" "}
            <span className="address-phone">(028) 3520 9999</span>&nbsp;Tầng Trệt
            <span className="address-location">
              , InterContinental Saigon&nbsp;
            </span>
          </p>
        </div>
      </div>
      <div className="dining-offer-container">
        <div className="dining-offer-wrapper">
          {state.diningOffer.map((offer, index) => (
            <div key={index} className="dining-offer-items">
              <div className="dining-offer-header">{offer.header}</div>
              <div className="dining-offer-description">
                {offer.description}
              </div>
              <img style={{ marginTop: "24px" }} src={offer.image}></img>
            </div>
          ))}
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
    </div>
  );
};
export default CuisineDetails;
