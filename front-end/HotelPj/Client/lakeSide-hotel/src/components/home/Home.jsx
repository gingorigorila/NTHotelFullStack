/* eslint-disable no-unused-vars */

import React from "react";
import { useLocation } from "react-router-dom";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
import MainHeader from "../layout/MainHeader";
import { TbFlower } from "react-icons/tb";
import Chat from "../chat/Chat";
const Home = () => {
  const location = useLocation();
  const message = location.state && location.state.message;
  const currentUser = localStorage.getItem("userId");
  return (
    <section>
      {message && <p className="text-warning px-5 text-center">{message}</p>}
      {currentUser && (
        <h6 className="text-success text-center my-2">
          <TbFlower />
          Chào mừng bạn {currentUser} đến khách sạn chúng tôi
          <TbFlower />
        </h6>
      )}
      <MainHeader />
      <div className="container">
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <RoomCarousel />
        <HotelService />
        <Chat/>
      </div>
    </section>
  );
};

export default Home;
