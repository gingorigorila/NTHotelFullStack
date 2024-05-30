/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RestaurantFilter from "../common/RestaurantCommon/RestaurantFilter";
import RestaurantPaginator from "../common/RestaurantCommon/RestaurantPaginator";
import { getAllRestaurant } from "../ultils/ApiFunctions";
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
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(filteredData.length / restaurantPerPage);
  const renderRestaurants = () => {
    const startIndex = (currentPage - 1) * restaurantPerPage;
    const lastIndex = startIndex + restaurantPerPage;
    return filteredData
      .slice(startIndex, lastIndex)
      .map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />);
  };
  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <RestaurantFilter data={data} setFilteredData={setFilteredData} />
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RestaurantPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
      <Row>{renderRestaurants()}</Row>
      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RestaurantPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Restaurant;
