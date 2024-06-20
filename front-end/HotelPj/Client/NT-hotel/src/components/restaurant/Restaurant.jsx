/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getAllRestaurant } from "../ultils/ApiFunctions";
import ContentCard from "./ContentDinner";
import RestaurantCard from "./RestaurantCard";





const Restaurant = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState([{ id: "" }]);
  useEffect(() => {
    setIsLoading(true);
    getAllRestaurant()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setErr(e);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <div>Đang tải trang</div>;
  }
  if (err) {
    return <div className="text-danger">Error :{err}</div>;
  }
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  // const totalPages = Math.ceil(filteredData.length / restaurantPerPage);
  const renderRestaurants = () => {
    const startIndex = (currentPage - 1) * restaurantPerPage;
    const lastIndex = startIndex + restaurantPerPage;
    return filteredData
      .slice(startIndex, lastIndex)
      .map((restaurant) => 
      restaurant.id % 2 == 0 ? <ContentCard key={restaurant.id} restaurant={restaurant} /> : <ContentCard key={restaurant.id} restaurant={restaurant} reverse/>);
  };
  return (
    <Container>
      
    <img
    style={{ width: "100%" }}
    src="https://www.icsaigon.com/sites/icsaigon/files/styles/home_slider/public/2018-08/InterContinental-Saigon-Restaurants-2_0_0.jpg?itok=l_t57k2M"
  ></img>
  <div className="cuisine-header">
    <h1 className="cuisine-header-content">Ẩm thực</h1>
    <p>
      Một thế giới ẩm thực phong phú với nhiều hương vị đặc sắc đang chờ đợi
      những thực khách khi đến với InterContinental Saigon. Khám phá những
      lựa chọn chất lượng ở ba nhà hàng của khách sạn, từ các quầy buffet
      đẳng cấp tại Market 39, tới ẩm thực Trung Hoa-Quảng Đông tại Yu Chu
      với dim sum All-You-Can-Eat, vịt quay Bắc Kinh, hay ẩm thực Ý tại
      Basilico với nhiều món Ý đúng điệu.
    </p>
  </div>
      <Row>{renderRestaurants()}</Row>
    </Container>
  );
};

export default Restaurant;
