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
import Restaurants from "./components/restaurant/Restaurants";
import EditRestaurant from "./components/restaurant/EditRestaurant";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import Logout from "./components/auth/Logout";
import { AuthProvider } from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import About from "./components/auth/About"

function App() {
  return (
    
    <AuthProvider>
      <main>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExsistingRooms />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/add-restaurant" element={<AddRestaurant />} />
            <Route
              path="/edit-restaurant/:restaurantId"
              element={<EditRestaurant />}
            />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/book-room/:roomId" element={
              <RequireAuth>
               <CheckOut />
              </RequireAuth>
            } />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
            
            <Route path="/existing-bookings" element={<Bookings />} />
            <Route path="/find-booking" element={<FindBooking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />

          </Routes>
        </Router>
        <Footer />
      </main>
      </AuthProvider>
    
  );
}

export default App;