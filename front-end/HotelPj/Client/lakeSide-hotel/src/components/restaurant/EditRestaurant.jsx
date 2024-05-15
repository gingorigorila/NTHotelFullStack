/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantTypeSelector from "../common/RestaurantCommon/RestaurantTypeSelector";
import { getRestaurantById, updateRestaurant } from "../ultils/ApiFunctions";

const EditRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    photo: "",
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
  const { restaurantId } = useParams();

  const handleRestaurantInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleImgChange = (e) => {
    const selectedImg = e.target.files[0];
    setRestaurant({ ...restaurant, photo: selectedImg });
    setImgPreview(URL.createObjectURL(selectedImg));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRestaurant(restaurantId, restaurant);
      if (response.status === 200) {
        setSuccessMsg("Da cap nhap thong tin nha hang vao database");
        const updateRestaurantData = await getRestaurantById(restaurantId);
        setRestaurant(updateRestaurantData);
        setImgPreview(updateRestaurantData.photo);
        setErrMsg("");
      } else {
        setErrMsg("Loi khong chinh sua thong tin nha hang");
      }
    } catch (e) {
      console.log(e);
      setErrMsg(e.message);
    }
    setTimeout(() => {
      setSuccessMsg("");
      setErrMsg("");
    }, 3000);
  };
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const restaurantData = await getRestaurantById(restaurantId);
        setRestaurant(restaurantData);
        setImgPreview(restaurantData.photo);
        console.log(restaurantData.photo)
      } catch (e) {
        console.log(e);
      }
    };
    fetchRestaurant()
  },[restaurantId]);
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="restaurantName" className="form-label">
                  Ten nha hang
                </label>
                <input
                  className="form-control"
                  id="restaurantName"
                  name="restaurantName"
                  type="text"
                  value={restaurant.restaurantName}
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
                    newRestaurant={restaurant}
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
                  value={restaurant.location}
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
                  value={restaurant.hours}
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
                  value={restaurant.telePhone}
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
                  value={restaurant.email}
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
                  value={restaurant.description}
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
                    src={`data:image/jpeg;base64,${imgPreview}`}
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

export default EditRestaurant;
