/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RestaurantFilter from "../common/RestaurantCommon/RestaurantFilter";
import RestaurantPaginator from "../common/RestaurantCommon/RestaurantPaginator";
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
    return <div>Dang tai trang</div>;
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
      
      <Row>{renderRestaurants()}</Row>
      
    </Container>
  );
};

export default Restaurant;
