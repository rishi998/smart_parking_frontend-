import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // Animation library
import parkingImage from "../assets/images/parking.jpg";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [availability, setAvailability] = useState({
    total: 0,
    booked: 0,
    available: 0,
  });
  const [parkingAreas, setParkingAreas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAreas, setFilteredAreas] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchParkingAreas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/area/allareas");
        setParkingAreas(response.data.areas || []);
        setFilteredAreas(response.data.areas || []);
      } catch (error) {
        console.error("Error fetching parking areas:", error);
      }
    };
    fetchParkingAreas();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = parkingAreas.filter(
        (area) =>
          area.areaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          area.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAreas(filtered);
    } else {
      setFilteredAreas(parkingAreas);
    }
  }, [searchQuery, parkingAreas]);

  if (!user) {
    return <p>Please Log In.</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleBooking = () => {
    navigate("/book_parking");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAreaChange = (e) => {
    const selected = parkingAreas.find((area) => area._id === e.target.value);
    if (selected) {
      setSelectedArea(selected);
      fetchAvailabilityData(selected.areaName);
    }
  };

  const fetchAvailabilityData = async (areaName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/area/availability/${encodeURIComponent(
          areaName
        )}`
      );
      if (response.data.success) {
        setAvailability({
          total: response.data.data.totalSlots,
          booked: response.data.data.bookedSlots,
          available: response.data.data.availableSlots,
        });
      } else {
        console.error("Failed to fetch availability:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      setAvailability({ total: 0, booked: 0, available: 0 });
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-50"
      style={{
        backgroundImage: `url(${parkingImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-gray-900 to-gray-700 text-white flex justify-between items-center p-2 fixed top-0 left-0 w-full z-50 shadow-md h-16"
      >
        <div className="text-3xl font-bold tracking-wider">
          <h1>ParkerPro</h1>
        </div>
        {/* <div className="flex space-x-4">
          {["Home", "Book Parking", "My Bookings", "About Us"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, "_")}`}
              className="hover:scale-105 transform transition-all px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
            >
              {item}
            </a>
          ))}
        </div> */}
        <div className="flex space-x-4">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="hover:scale-105 transform transition-all px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Home
          </button>

          <button
            onClick={() => (window.location.href = "/book_parking")}
            className="hover:scale-105 transform transition-all px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Book Parking
          </button>

          <button
            onClick={() => (window.location.href = "/mybookings")}
            className="hover:scale-105 transform transition-all px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            My Bookings
          </button>

          <button
            onClick={() => (window.location.href = "/about_us")}
            className="hover:scale-105 transform transition-all px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            About Us
          </button>
        </div>

        <div className="flex flex-col items-center w-32">
          <button
            onClick={toggleSidebar}
            className="p-1 bg-gray-700 hover:bg-gray-900 rounded-full focus:outline-none transition"
          >
            <img
              src="./src/assets/images/user.png"
              alt="User"
              className="h-8 w-8 rounded-full border-2 border-white"
            />
          </button>
        </div>
      </motion.nav>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 w-64 bg-gray-800 text-white p-5 transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-lg font-semibold">Hello, {user}</h2>
          <button
            onClick={() => navigate("/mybookings")}
            className="hover:text-gray-300 text-lg"
          >
            My Bookings
          </button>
          <a href="#" className="hover:text-gray-300 text-lg">
            Extras
          </a>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Search and Select Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-col items-center mt-32 p-6"
      >
        <div className="w-full max-w-2xl">
          <select
            className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white text-gray-700"
            onChange={handleAreaChange}
            value={selectedArea?._id || ""}
          >
            <option value="">Select Available Parking...</option>
            {filteredAreas.map((area) => (
              <option key={area._id} value={area._id}>
                {area.areaName} - {area.address}
              </option>
            ))}
          </select>
        </div>
      </motion.section>

      {/* Parking Availability Section */}
      {selectedArea && (
        <motion.section
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="max-w-4xl mx-auto my-10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
        >
          <h2 className="text-4xl font-serif font-bold text-center mb-6 text-white">
            {selectedArea.areaName}
          </h2>
          <p className="text-center font-serif text-lg text-white mb-10">
            {selectedArea.address}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-blue-600 text-white p-6 rounded-xl">
              <h3 className="font-bold text-lg">Total Spaces</h3>
              <p className="text-2xl">{availability.total}</p>
            </div>
            <div className="bg-red-600 text-white p-6 rounded-xl">
              <h3 className="font-bold text-lg">Booked</h3>
              <p className="text-2xl">{availability.booked}</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-xl">
              <h3 className="font-bold text-lg">Available</h3>
              <p className="text-2xl">{availability.available}</p>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={handleBooking}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-800 transition rounded-lg text-white text-lg font-semibold shadow-md"
            >
              Book Parking
            </button>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center py-6 mt-auto">
        <p className="text-lg">
          &copy; {new Date().getFullYear()} ParkerPro. All Rights Reserved.
        </p>
        <div className="flex justify-center space-x-8 mt-4">
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms
          </a>
          <a href="#" className="hover:text-gray-400">
            Support
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
