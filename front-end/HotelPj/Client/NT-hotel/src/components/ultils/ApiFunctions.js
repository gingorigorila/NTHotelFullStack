/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});
export const api_chatBot = axios.create({
  baseURL: "http://localhost:8080",
});

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};
export async function addRoom(
  photo,
  roomType,
  roomPrice,
  maxPeople,
  roomDescription
) {
  console.log("photo",photo)
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);
  formData.append("maxPeople", maxPeople);
  formData.append("roomDescription", roomDescription);
  const response = await api.post("/rooms/add/new-room", formData, {
    headers: getHeader(),
  });
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
    const result = await api.delete(`/rooms/delete/room/${roomId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room ${error.message}`);
  }
}
//Ham cap nhap phong
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);
  formData.append("maxPeople", roomData.maxPeople);
  formData.append("roomDescription", roomData.roomDescription);
  const response = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: getHeader(),
  });
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
//Ham luu anh phong
export async function addRoomImg(roomId, image) {
  try {
    
    const formData = new FormData();
    formData.append("image", image);
    console.log(roomId)
    const result = await api.post(
      `/roomImg/add-roomImg/room/${roomId}`,
      formData,
      {
        headers: getHeader(),
      }
    );
    console.log("add room img", result);
    return result;
  } catch (e) {
    throw new Error(`Loi khong them duoc anh ${e.message}`);
  }
}
//Ham hien thi anh phong
export async function displayRoomImg() {
  try {
    const response = await api.get("/roomImg/all");
    return response.data;
  } catch (error) {
    throw new Error("Loi truy xuat anh phong", error.message);
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
    const result = await api.get("/bookings/all-bookings", {
      headers: getHeader(),
    });
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
  return result;
}
//Hàm thêm nhà hàng
export async function addRestaurant(
  photo,
  restaurantName,
  restaurantType,
  location,
  hours,
  email,
  telephone,
  description
) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("restaurantName", restaurantName);
  formData.append("restaurantType", restaurantType);
  formData.append("location", location);
  formData.append("hours", hours);
  formData.append("email", email);
  formData.append("telePhone", telephone);
  formData.append("description", description);
  const response = await api.post("/restaurants/add/new-restaurant", formData, {
    headers: getHeader(),
  });
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

//Ham lay cac loai nha hang
export async function getRestaurantTypes() {
  try {
    const response = await api.get("/restaurants/restaurant/types");
    return response.data;
  } catch (error) {
    throw new Error("Loi truy xuat loai nha hang");
  }
}
//Ham lay toan bo nha hang tu database
export async function getAllRestaurant() {
  try {
    const result = await api.get("restaurants/all-restaurants");
    return result.data;
  } catch (error) {
    throw new Error("Loi truy xuat nha hang");
  }
}
//Ham xoa nha hang trong db
export async function deleteRestaurant(restaurantId) {
  try {
    const result = api.delete(`restaurants/delete/restaurant/${restaurantId}`, {
      headers: getHeader(),
    });
  } catch (e) {
    throw new Error(`Loi xoa nha hang ${e.message}`);
  }
}
//Ham cap nhap nha hang theo ID
export async function updateRestaurant(restaurantId, restaurantData) {
  console.log("Dat", restaurantData);
  const formData = new FormData();
  formData.append("photo", restaurantData.photo);
  formData.append("restaurantName", restaurantData.restaurantName);
  formData.append("restaurantType", restaurantData.restaurantType);
  formData.append("location", restaurantData.location);
  formData.append("hours", restaurantData.hours);
  formData.append("email", restaurantData.email);
  formData.append("telePhone", restaurantData.telephone);
  formData.append("description", restaurantData.description);
  const response = await api.put(
    `/restaurants/update/${restaurantId}`,
    formData,
    {
      headers: getHeader(),
    }
  );
  return response;
}
//Ham lay nha hang theo ID
export async function getRestaurantById(restaurantId) {
  try {
    const result = await api.get(`restaurants/restaurant/${restaurantId}`);
    return result.data;
  } catch (e) {
    throw new Error("Loi truy xuat thong tin nha hang");
  }
}
//Hàm lưu đơn đặt bàn đến database
export async function bookRestaurant(restaurantId, booking) {
  try {
    const result = await api.post(
      `/order-restaurant/restaurant/${restaurantId}/order`,
      booking
    );
    return result.data;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data);
    } else {
      throw new Error(`Loi dat ban : ${e.message}`);
    }
  }
}
//Hàm lấy toàn bộ đơn đặt bàn
export async function getAllOrders() {
  try {
    const result = await api.get("/order-restaurant/all-orders");
    return result.data;
  } catch (e) {
    throw new Error(`Lỗi không hien thi đơn đặt ban : ${e.mesage}`);
  }
}
//Hàm lấy đơn đặt bàn bằng mã xác nhận
export async function getOrderByConfimationCode(confirmationCode) {
  try {
    const result = await api.get(
      `/order-restaurant/confirmation-order/${confirmationCode}`
    );
    return result.data;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data);
    } else {
      throw new Error(`Lỗi tìm đơn đặt ban : ${e.message}`);
    }
  }
}
//Hàm hủy đơn đặt bàn
export async function cancelOrders(bookingId) {
  try {
    const result = await api.delete(
      `/order-restaurant/order/${bookingId}/delete`
    );
    return result.data;
  } catch (e) {
    throw new Error(`Lỗi không hủy đơn đặt bàn : ${e.mesage}`);
  }
}
//Ham register
export async function registerUser(registration) {
  try {
    console.log("register", registration);
    const response = await api.post("/auth/register-user", registration);
    return response.data;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Loi dang ky : ${e.mesage}`);
    }
  }
}
//Ham login
export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return "Khong co";
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

// Ham lay thong tin nguoi dung
export async function getUserProfile(userId, token) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get(`users/profile/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* Ham xoa 1 account */
export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

/* This is the function to get a single user */
export async function getUser(userId) {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(email) {
  try {
    const response = await api.get(`/bookings/user/${email}/booking-room`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin đơn đặt phòng:", error.message);
    throw new Error("Thất bại lấy thông tin đơn đặt phòng");
  }
}

//Ham lay toan bo nguoi dung
export async function getAllUsers() {
  const response = await api.get("users/all-users");
  return response.data;
}

// Ham them role cho tai khoan
export async function assignRoleToUser(assignRole) {
  try {
    console.log("api", assignRole);
    const formData = new FormData();
    formData.append("userId", assignRole.userId);
    formData.append("roleId", assignRole.roleId);
    const response = await api.post("/roles/assign-role-to-user", formData, {
      headers: getHeader(),
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
//Ham xoa toan bo role

//Ham lay toan bo role
export async function getAllRoles() {
  try {
    const result = await api.get("/roles/all-roles", {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error("Loi khong lay duoc dl role", error);
  }
}

//Ham dung cho chatbit
export async function getMessages(question) {
  try {
    const result = await api_chatBot.post("/chat", question);
    return result;
  } catch (error) {
    throw new Error("Loi chatbot", error);
  }
}
