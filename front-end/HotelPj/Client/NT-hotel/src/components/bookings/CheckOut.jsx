/* eslint-disable no-unused-vars */

import React,{ useEffect, useState  } from "react";

import {
  FaTv,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import RoomCarousel from "../common/RoomCarousel";
import { getRoomById } from "../ultils/ApiFunctions";
import BookingForm from "./BookingForm";
import { IoIosFitness } from "react-icons/io";


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
        <div className="row flex-column flex-md-row align-items-center input-form">
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
                      <th>Kiểu phòng</th>
                      <td>{roomInfo.roomType}</td>
                    </tr>
                    <tr>
                      <th>Giá phòng</th>
                      <td>{roomInfo.roomPrice}đ/đêm</td>
                    </tr>
                    <tr>
                      <th>Giá phòng</th>
                      <td>{roomInfo.roomPrice}đ/đêm</td>
                    </tr>
                    <tr>
                    
                    <tr>Dịch vụ</tr>
                      <td>
                        <ul className="list-unstyled sv-list">
                          <li>
                            <FaWifi />
                            Wifi
                          </li>
                          <li>
                            <FaTv />
                            Xem phim
                          </li>
                          <li>
                            <FaUtensils />
                            Bữa sáng
                          </li>
                          <li>
                            <IoIosFitness/>
                            Phòng tập
                          </li>
                        </ul>
                      </td>

                    </tr>
                    <tr>
                    <th>Mo ta</th>
                    <td>{roomInfo.roomDescription}</td>
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
