/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";

import {
  FaCar,
  FaParking,
  FaTshirt,
  FaTv,
  FaUtensils,
  FaWifi,
  FaWineGlassAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import RoomCarousel from "../common/RoomCarousel";
import { getRestaurantById, getRoomById } from "../ultils/ApiFunctions";

import OrderForm from "./OrderForm";

const CheckOutRestaurant = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantInfo, setRestaurantInfo] = useState({
    photo: "",
    restaurantName: "",
    restaurantType: "",
    restaurantAddress: "",
    restaurantHour: "",
    restaurantTelephone: "",
    restaurantEmail: "",
    restaurantDesc: "",
  });
  const { restaurantId } = useParams();
  useEffect(() => {
    setTimeout(() => {
      getRestaurantById(restaurantId)
        .then((data) => {
          setRestaurantInfo(data);
          setIsLoading(false);
        })
        .catch((e) => {
          setErrMsg(e);
          setIsLoading(false);
        });
    }, 1000);
  }, [restaurantId]);
  return (
    <div>
      <section className="container">
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <p>Đang tải thông tin nhà hàng</p>
            ) : errMsg ? (
              <p>{errMsg}</p>
            ) : (
              <div className="room-info">
                <img
                  alt="Room photo"
                  src={`data:image/png;base64,${restaurantInfo.photo}`}
                  style={{ width: "100%", height: "auto", maxWidth: "200px" }}
                />
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Tên nhà hàng</th>
                      <th>{restaurantInfo.restaurantName}</th>
                    </tr>

                    <tr>
                      <th>Dịch vụ nhà hàng</th>
                      <td>
                        <ul className="list-unstyled">
                          <li>
                            <FaWifi />
                            Wifi
                          </li>
                          <li>
                            <FaTv />
                            Film
                          </li>
                          <li>
                            <FaUtensils />
                            Breakfast
                          </li>
                          <li>
                            <FaWineGlassAlt />
                            Mini bar refresment
                          </li>
                          <li>
                            <FaCar />
                            Car Service
                          </li>
                          <li>
                            <FaParking />
                            Parking space
                          </li>
                          <li>
                            <FaTshirt />
                            Laundry
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <OrderForm />
          </div>
        </div>
      </section>
      <div className="container">
        <RoomCarousel />
      </div>
    </div>
  );
};

export default CheckOutRestaurant;
