/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import RoomPaginator from "../src/components/common/RoomPaginator";
import { deleteUser, getAllUsers } from "../src/components/ultils/ApiFunctions";

const ExsistingUsers = () => {
  const [users, setUsers] = useState([
    {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      roles: [{ idRole: "", name: "" }],
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([
    {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      roles: [{ idRole: "", name: "" }],
    },
  ]);
  const [selectedRoleType, setSelectedRoleType] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const results = await getAllUsers();
      setUsers(results);
      setIsLoading(false);
      console.log("result", results);
    } catch (error) {
      setErrMsg(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (selectedRoleType === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.roles.filter((role) => role.name === selectedRoleType)
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1);
  }, [users, selectedRoleType]);
  const handleDeleteUser = async (userId)=>{
    try {
      const result = await deleteUser(userId);
      if (result === "") {
        setSuccessMsg(`Tai khoan ${userId} đã được xóa`);
        fetchUsers();
      } else {
        console.log(`Lỗi xóa tai khoan : ${result.message}`);
      }
    } catch (e) {
      setErrMsg(e.message);
    }
    setTimeout(() => {
      setSuccessMsg("");
      setErrMsg("");
    }, 3000);
  }
  const calculateTotalPages = (filteredUsers, usersPerPage, users) => {
    const totalUsers =
      filteredUsers.length > 0 ? filteredUsers.length : usersPerPage.length;
    return Math.ceil(totalUsers / usersPerPage);
  };
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  return (
    <div>
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
              <h2>Danh sách thành viên</h2>
            </div>
            <Row>
              <Col md={6} className="mb-3 mb-md-0"></Col>
            </Row>
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Họ</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Xem/Sửa/Xóa</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="text-center">
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    {user.roles.map((role) => (
                      <ul key={role.id}>
                        <li>{role.name}</li>
                      </ul>
                    ))}
                    <td className="gap-2">
                      <Link
                        to={`/existing-users/assignRole/${user.id}`}
                        className="gap-2"
                      >
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm">
                          <FaEdit />
                        </span>
                      </Link>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.email)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </section>
        </>
      )}
    </div>
  );
};

export default ExsistingUsers;
