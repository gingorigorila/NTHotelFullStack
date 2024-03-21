/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/new-room", formData);
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}
//Ham lay cac kieu phong
export async function getRoomType() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types");
  }
}
//Ham lay toan bo phong
export async function getAllRoom() {
  try {
    const response = await api.get("/rooms/all-rooms");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching rooms");
  }
}
//Ham xoa phong
export async function deleteRoom(roomId) {
  try {
    const response = await api.delete(`/rooms/delete/room/${roomId}`);
    return response.data;
  } catch (e) {
    throw new Error(`Error deleting room ${e.message}`);
  }
}
//Ham cap nhap phong
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);
  const response = await api.put(`/rooms/update/${roomId}`, formData);
  return response;
}
//Ham lay phong theo id
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (e) {
    throw new Error(`Error fetching room ${e.message}`);
  }
}
//Hàm lưu đơn đặt phòng đến database
export async function bookRoom(roomId, booking) {
  try {
    const result = await api.post(`/bookings/room/${roomId}/booking`, booking);
    return result.data;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data);
    } else {
      throw new Error(`Error booking room : ${e.message}`);
    }
  }
}
//Hàm lấy toàn bộ đơn đặt phòng
export async function getAllBookings() {
  try {
    const result = await api.get("/bookings/all-bookings");
    return result.data;
  } catch (e) {
    throw new Error(`Lỗi không xuất đơn đặt phòng : ${e.mesage}`);
  }
}
//Hàm lấy đơn đặt phòng bằng mã xác nhận
export async function getBookingByConfimationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data);
    } else {
      throw new Error(`Lỗi tìm đơn đặt phòng : ${e.message}`);
    }
  }
}
//Hàm hủy đơn đặt phòng
export async function cancelBookings(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return result.data;
  } catch (e) {
    throw new Error(`Lỗi không hủy đơn đặt phòng : ${e.mesage}`);
  }
}
//Hàm lấy phòng hiện có
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  const result = await api.get(
    `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
  );
  return result
}
