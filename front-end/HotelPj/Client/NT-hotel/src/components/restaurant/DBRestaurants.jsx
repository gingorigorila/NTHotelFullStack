/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import RestaurantFilter from "../common/RestaurantCommon/RestaurantFilter";
import RestaurantPaginator from "../common/RestaurantCommon/RestaurantPaginator";
import RestaurantTypeSelector from "../common/RestaurantCommon/RestaurantTypeSelector";
import { deleteRestaurant, getAllRestaurant } from "../ultils/ApiFunctions";

const Restaurants = () => {
  const [restaurants, setRestaurant] = useState([
    {
      restaurantName: "",
      restaurantType: "",
      restaurantAddress: "",
      restaurantHour: "",
      restaurantTelephone: "",
      restaurantEmail: "",
      restaurantDesc: "",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRestautant, setFilteredRestaurant] = useState([
    {
      restaurantName: "",
      restaurantType: "",
      restaurantAddress: "",
      hours: "",
      restaurantTelephone: "",
      restaurantEmail: "",
      restaurantDesc: "",
    },
  ]);
  const [selectedRestaurantTypes, setSelectedRestaurantTypes] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);
  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const results = await getAllRestaurant();
      console.log(results);
      setRestaurant(results);
      setIsLoading(false);
    } catch (error) {
      setErrMsg(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRestaurantTypes === "") {
      setFilteredRestaurant(restaurants);
    } else {
      const filtered = restaurants.filter(
        (restaurant) => restaurant.restaurantType === selectedRestaurantTypes
      );
      setFilteredRestaurant(filtered);
    }
    setCurrentPage(1);
  }, [restaurants, selectedRestaurantTypes]);
  const calculateTotalPages = (
    filteredRestaurant,
    restaurantPerPage,
    restaurant
  ) => {
    const totalRestaurant =
      filteredRestaurant.length > 0
        ? filteredRestaurant.length
        : restaurants.length;
    return Math.ceil(totalRestaurant / restaurantPerPage);
  };
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      const result = await deleteRestaurant(restaurantId);
      if (result === "") {
        setSuccessMsg(`Nha hang ${restaurantId} đã được xóa`);
        fetchRooms();
      } else {
        console.log(`Lỗi xóa nha hang : ${result.message}`);
      }
    } catch (e) {
      setErrMsg(e.message);
    }
    setTimeout(() => {
      setSuccessMsg("");
      setErrMsg("");
    }, 3000);
  };
  const indexOfLastRestaurant = currentPage * restaurantPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantPerPage;
  const currentRestaurants = filteredRestautant.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );
  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMsg && <p className="alert alert-success mt-5">{successMsg}</p>}

        {errMsg && <p className="alert alert-danger mt-5">{errMsg}</p>}
      </div>
      {isLoading ? (
        <p>Dang tai trang</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Nha hang</h2>
            </div>
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <RestaurantFilter
                  data={restaurants}
                  setFilteredData={setFilteredRestaurant}
                />
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Link to={"/add-room"}>
                  <FaPlus />
                  Thêm nha hang
                </Link>
              </Col>
            </Row>
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Ten nha hang</th>
                  <th>Loai nha hang</th>
                  <th>Gio hoat dong</th>
                  <th>Email </th>
                  <th>So dien thoai</th>
                  <th>Dia diem</th>
                  <th>Mo ta</th>
                  <th>Xem/Xóa/Sửa</th>
                </tr>
              </thead>
              <tbody>
                {currentRestaurants.map((restaurant) => (
                  <tr key={restaurant.id} className="text-center">
                    <td>{restaurant.id}</td>
                    <td>{restaurant.restaurantName}</td>
                    <td>{restaurant.restaurantType}</td>
                    <td>{restaurant.hours}</td>
                    <td>{restaurant.email}</td>
                    <td>{restaurant.telePhone}</td>
                    <td>{restaurant.location}</td>
                    <td>{restaurant.description}</td>
                    <td className="gap-2">
                      <Link
                        to={`/edit-restaurant/${restaurant.id}`}
                        className="gap-2"
                      >
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteRestaurant(restaurant.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RestaurantPaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(
                filteredRestautant,
                restaurantPerPage,
                restaurants
              )}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};

export default Restaurants;
