/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addRoomImg } from "../ultils/ApiFunctions";

const AddRoomImg = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [image,setImage] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { roomId } = useParams();
  const handleImgChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage)
    setImagePreview(URL.createObjectURL(selectedImage));
  };
  const handleAddRoomImgs = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoomImg(roomId, image);
      console.log("success add img", success);
      if (success !== undefined) {
        setSuccessMsg("Đã thêm ảnh vào phòng ", roomId);
        setImagePreview("");
      } else {
        setErrMsg("Khong them anh vao phong ", roomId);
      }
    } catch (e) {
      setErrMsg(e.message);
    }
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-6">Thêm ảnh</h2>
            {successMsg && (
              <div className="alert alert-success fade show">{successMsg}</div>
            )}
            {errMsg && (
              <div className="alert alert-danger fade show">{errMsg}</div>
            )}
            <form encType="multipart/form-data" onSubmit={handleAddRoomImgs}>
              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Ảnh cho chi tiet phòng
                </label>
                <input
                  required
                  className="form-control"
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={handleImgChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Room Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <Link to={"/existing-rooms"} className="btn btn-outline-info">
                  Trở lại
                </Link>
                <button className="btn btn-outline-primary ml-5">
                  Lưu anh
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRoomImg;
