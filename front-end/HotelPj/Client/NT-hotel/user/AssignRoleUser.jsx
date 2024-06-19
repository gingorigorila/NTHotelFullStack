/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RoleFilter from "../src/components/common/RoleFilter";
import {
  assignRoleToUser,
  getAllRoles,
  getUser,
} from "../src/components/ultils/ApiFunctions";

const AssignRoleUser = () => {
  //   const [user, setUser] = useState(
  //     {
  //       id: "",
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       roles: [{ idRole: "", name: "" }],
  //     },
  //   );
  const { userId } = useParams();
  const [userRoles, setUserRoles] = useState([]);
  const [assignRole, setAssignRole] = useState("");
  const [assignUserRole, setAssignUserRole] = useState({
    userId: userId,
    roleId: assignRole,
  });
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     setUser({ ...user, [name]: value });
  //   };
  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       try {
  //         const userData = await getUser(userEmail);
  //         console.log("User data", userData);
  //         setUser(userData);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchUser();
  //   }, [userEmail]);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const userRole = await getAllRoles();

        setUserRoles(userRole);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRole();
    assignUserRole.roleId = assignRole;
    console.log("assignUserRole 1", assignUserRole);
  }, [assignUserRole, assignRole]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("assignUserRole 2", assignUserRole);
    try {
      const response = await assignRoleToUser(assignUserRole);
      
      // if (response.status === 200) {
      //   setSuccessMsg("Da them role cho account thanh cong!");

      //   setErrMsg("");
      // } else {
      //   setErrMsg("Loi khong them role cho account");
      // }
    } catch (error) {
      console.error(error);
      setErrMsg(error.message);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center mb-5 mt-5">Gan role cho account</h3>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {successMsg && (
            <div className="alert alert-success" role="alert">
              {successMsg}
            </div>
          )}
          {errMsg && (
            <div className="alert alert-danger" role="alert">
              {errMsg}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label hotel-color">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="roomType"
                name="roomType"
                value={userId}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label hotel-color">
                Role
              </label>
              <RoleFilter data={userRoles} setAssignRole={setAssignRole} />
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link to={""} className="btn btn-outline-info ml-5">
                back
              </Link>
              <button type="submit" className="btn btn-outline-warning">
                Them
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignRoleUser;
