import React, { useEffect, useState } from "react";
import { FaTv, FaUtensils, FaWifi } from "react-icons/fa";
import { useParams } from "react-router-dom";
import RoomCarousel from "../common/RoomCarousel";
import { getRoomById } from "../ultils/ApiFunctions";
import BookingForm from "./BookingForm";
import { IoIosFitness } from "react-icons/io";
import CommentForm from "./CommentForm";
import { useRef } from "react";
import generatePDF from "react-to-pdf";

const CheckOut = () => {
  const targetRef = useRef();
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
          setErrMsg(e.message);
          setIsLoading(false);
        });
    }, 1000);
  }, [roomId]);

  return (
    <div ref={targetRef}>
      <section className="book-room">
        <div className=" input-form">
          <div className="col-md-6 mt-4 image-container">
            {isLoading ? (
              <p>Đang tải thông tin phòng</p>
            ) : errMsg ? (
              <p>{errMsg}</p>
            ) : (
              <div>
                <img
                  alt="Room photo"
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  className="room-photo"
                />

                <div className="sup-img">
                  <img
                    alt="Room photo"
                    src={`data:image/png;base64,${roomInfo.photo}`}
                    className="room-photo"
                  />

                  <img
                    alt="Room photo"
                    src={`data:image/png;base64,${roomInfo.photo}`}
                    className="room-photo"
                  />

<img
                    alt="Room photo"
                    src={`data:image/png;base64,${roomInfo.photo}`}
                    className="room-photo"
                  />

<img
                    alt="Room photo"
                    src={`data:image/png;base64,${roomInfo.photo}`}
                    className="room-photo"
                  />

                  
                </div>
              </div>
            )}
          </div>
          <div className="col-md-6 mb-5 ">
            <BookingForm />
          </div>
        </div>
        <div className="row flex-column align-items-center">
          <div className="col-md-12 mt-5 mb-5">
            {!isLoading && !errMsg && (
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
                    <th>Dịch vụ</th>
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
                          <IoIosFitness />
                          Phòng tập
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
      <div className="container">
        <CommentForm /> {/* Add CommentForm component */}
      </div>
      <div className="container">
        <RoomCarousel />
      </div>
      <button onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}>
        Download PDF
      </button>
    </div>
  );
};

export default CheckOut;
