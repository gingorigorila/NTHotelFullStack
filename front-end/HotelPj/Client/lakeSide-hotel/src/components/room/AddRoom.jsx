/* eslint-disable no-unused-vars */
import React,{ useState } from "react";
import { Link } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { addRoom } from "../ultils/ApiFunctions";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value=parseInt(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };
  const handleImgChange = (e) => {
		const selectedImage = e.target.files[0]
		setNewRoom({ ...newRoom, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );
      if (success !== undefined) {
        setSuccessMsg("Phòng mới được thêm vào database");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        setErrMsg("");
      } else {
        setErrMsg("Phòng không được thêm vào database");
      }
    } catch (e) {
      setErrMsg(e.message)
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
            <h2 className="mt-5 mb-2">Thêm phòng mới</h2>
            {successMsg && (
              <div className="alert alert-success fade show">{successMsg}</div>
            )}
            {errMsg && <div className="alert alert-danger fade show">{errMsg}</div>}
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Loại phòng
                </label>
                <div>
                <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Giá phòng
                </label>
                <input
                  className="form-control"
                  required
                  id="roomPrice"
                  type="number"
                  name="roomPrice"
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Ảnh phòng
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
                  Lưu phòng
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRoom;
