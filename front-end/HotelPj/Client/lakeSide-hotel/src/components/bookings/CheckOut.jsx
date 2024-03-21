/* eslint-disable no-unused-vars */

import React,{ useEffect, useState  } from "react";

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
import { getRoomById } from "../ultils/ApiFunctions";
import BookingForm from "./BookingForm";

const CheckOut = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });
  const { roomId } = useParams();
  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((data) => {
          setRoomInfo(data);
          setIsLoading(false);
        })
        .catch((e) => {
          setErrMsg(e);
          setIsLoading(false);
        });
    }, 1000);
  }, [roomId]);
  return (
    <div>
      <section className="container">
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <p>Đang tải thông tin phòng</p>
            ) : errMsg ? (
              <p>{errMsg}</p>
            ) : (
              <div className="room-info">
                <img
                  alt="Room photo"
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  style={{ width: "100%", height: "auto", maxWidth: "200px" }}
                />
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Room Type:</th>
                      <th>{roomInfo.roomType}</th>
                    </tr>
                    <tr>
                      <th>Room Price:</th>
                      <th>{roomInfo.roomPrice}</th>
                    </tr>
                    <tr>
                    <th>Room service</th>
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
            <BookingForm />
          </div>
        </div>
      </section>
      <div className="container">
      <RoomCarousel/>
     </div>
    </div>
  );
};

export default CheckOut;
