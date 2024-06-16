/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import RestaurantTypeSelector from "../common/RestaurantCommon/RestaurantTypeSelector";
import { addRestaurant } from "../ultils/ApiFunctions";

const AddRestaurant = () => {
  const [newRestaurant, setNewRestaurant] = useState({
    photo: null,
    restaurantName: "",
    restaurantType: "",
    restaurantAddress: "",
    restaurantHour: "",
    restaurantTelephone: "",
    restaurantEmail: "",
    restaurantDesc: "",
  });
  const [imgPreview, setImgPreview] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleRestaurantInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setNewRestaurant({ ...newRestaurant, [name]: value });
  };

  const handleImgChange = (e) => {
    const selectedImg = e.target.files[0];
    setNewRestaurant({ ...newRestaurant, photo: selectedImg });
    setImgPreview(URL.createObjectURL(selectedImg));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRestaurant(
        newRestaurant.photo,
        newRestaurant.restaurantName,
        newRestaurant.restaurantType,
        newRestaurant.restaurantAddress,
        newRestaurant.restaurantHour,
        newRestaurant.restaurantEmail,
        newRestaurant.restaurantTelephone,
        newRestaurant.restaurantDesc
      );
      console.log("a")
      if (success !== undefined) {
        setSuccessMsg("Da them nha hang moi vao database");
        setNewRestaurant({
          photo: null,
          restaurantName: "",
          restaurantType: "",
          restaurantAddress: "",
          restaurantHour: "",
          restaurantTelephone: "",
          restaurantEmail: "",
          restaurantDesc: "",
        });
        setImgPreview("");
        setErrMsg("");
      } else {
        setErrMsg("Loi khong them nha hang");
      }
    } catch (e) {
      setErrMsg(e.message);
    }
    setTimeout(()=>{
      setSuccessMsg("")
      setErrMsg("")
    },3000)
  };
  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Them nha hang</h2>
            {successMsg && (
              <div className="alert alert-success fade show">{successMsg}</div>
            )}
            {errMsg && (
              <div className="alert alert-danger fade show">{errMsg}</div>
            )}
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="restaurantName" className="form-label">
                  Ten nha hang
                </label>
                <input
                  className="form-control"
                  id="restaurantName"
                  name="restaurantName"
                  type="text"
                  value={newRestaurant.restaurantName}
                  onChange={handleRestaurantInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="restaurantType" className="form-label">
                  Loai nha hang
                </label>
                <div>
                  <RestaurantTypeSelector
                    handleRestaurantInputChange={handleRestaurantInputChange}
                    newRestaurant={newRestaurant}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="restaurantAddress" className="form-label">
                  Dia diem nha hang
                </label>
                <input
                  className="form-control"
                  id="restaurantAddress"
                  name="restaurantAddress"
                  type="text"
                  value={newRestaurant.restaurantAddress}
                  onChange={handleRestaurantInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="restaurantHour" className="form-label">
                  Gio hoat dong
                </label>
                <input
                  id="restaurantHour"
                  name="restaurantHour"
                  type="text"
                  className="form-control"
                  value={newRestaurant.restaurantHour}
                  onChange={handleRestaurantInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="restaurantTelephone" className="form-label">
                  So dien thoai nha hang
                </label>
                <input
                  id="restaurantTelephone"
                  name="restaurantTelephone"
                  type="text"
                  className="form-control"
                  value={newRestaurant.restaurantTelephone}
                  onChange={handleRestaurantInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="restaurantEmail" className="form-label">
                  Email nha hang
                </label>
                <input
                  id="restaurantEmail"
                  name="restaurantEmail"
                  type="text"
                  className="form-control"
                  value={newRestaurant.restaurantEmail}
                  onChange={handleRestaurantInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="restaurantDesc" className="form-label">
                  Chi tiet nha hang
                </label>
                <input
                  id="restaurantDesc"
                  name="restaurantDesc"
                  type="text"
                  className="form-control"
                  value={newRestaurant.restaurantDesc}
                  onChange={handleRestaurantInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Hinh anh nha hang
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className="form-control"
                  onChange={handleImgChange}
                />
                {imgPreview && (
                  <img
                    src={imgPreview}
                    alt="Xem truoc anh nha hang"
                    className="mb-3"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                  />
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <button className="btn btn-outline-primary ml-5">Luu</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRestaurant;
