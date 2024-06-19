/* eslint-disable no-unused-vars */
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import AddRoom from "./components/room/AddRoom";
import ExsistingRooms from "./components/room/ExsistingRooms";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import EditRoom from "./components/room/EditRoom";
import Navbar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import CheckOut from "./components/bookings/CheckOut";
import BookingSuccess from "./components/bookings/BookingSuccess";
import Bookings from "./components/bookings/Bookings";
import FindBooking from "./components/bookings/FindBooking";
import AddRestaurant from "./components/restaurant/AddRestaurant";
import Restaurants from "./components/restaurant/DBRestaurants";
import EditRestaurant from "./components/restaurant/EditRestaurant";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import Logout from "./components/auth/Logout";
import { AuthProvider } from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import RestaurantListing from "./components/restaurant/RestaurantListing";
import CheckOutRestaurant from "./components/orders/CheckOutRestaurant";
import Orders from "./components/orders/Orders";
import About from "./components/auth/About";
import DashBoard from "./components/dashboard/DashBoard";
import ExsistingUsers from "../user/ExsistingUsers";
import AssignRoleUser from "../user/AssignRoleUser";

import Events from "./components/events/Event";
import EventDetails from "./components/events/EventDetails";
import Cuisine from "./components/restaurant/Cuisine";
import Service from "./components/auth/Service";
import CuisineDetails from "./components/restaurant/CuisineDetails";
import RoomImgs from "./components/room/RoomImgs";
import AddRoomImg from "./components/room/AddRoomImg";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/existing-rooms" element={<ExsistingRooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/all-restaurants" element={<Restaurants />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route path="/existing-users" element={<ExsistingUsers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event-details" element={<EventDetails />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/service" element={<Service />} />
          <Route path="/cuisine" element={<Cuisine />} />
          <Route path="/cuisine-details/:id" element={<CuisineDetails />} />

          <Route
            path="/existing-users/assignRole/:userId"
            element={<AssignRoleUser />}
          />
          <Route
            path="/edit-restaurant/:restaurantId"
            element={<EditRestaurant />}
          />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route
            path="/book-room/:roomId"
            element={
              <RequireAuth>
                <CheckOut />
              </RequireAuth>
            }
          />
          <Route
            path="/order-restaurant/:restaurantId"
            element={
              <RequireAuth>
                <CheckOutRestaurant />
              </RequireAuth>
            }
          />
          <Route path="/add-roomImg/:roomId" element={<AddRoomImg />} />
          <Route path="/all-roomImg-by-room/:roomId" element={<RoomImgs />} />
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route
            path="/browse-all-restaurants"
            element={<RestaurantListing />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/existing-bookings" element={<Bookings />} />
          <Route path="/existing-orders" element={<Orders />} />
          <Route path="/find-booking" element={<FindBooking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
      <Footer />
    </AuthProvider>
  );
}

export default App;
