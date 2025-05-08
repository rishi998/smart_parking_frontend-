import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import parkingImage from "../assets/images/parking.jpg";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [availability, setAvailability] = useState({
    total: 0,
    booked: 0,
    available: 0,
    loading: false,
    error: null
  });
  const [parkingAreas, setParkingAreas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAreas, setFilteredAreas] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  // Fetch all parking areas on component mount
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

  // Filter areas based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = parkingAreas.filter(area =>
        area.areaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        area.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAreas(filtered);
    } else {
      setFilteredAreas(parkingAreas);
    }
  }, [searchQuery, parkingAreas]);

  // Fetch availability data when selected area changes
  useEffect(() => {
    if (selectedArea) {
      fetchAvailabilityData(selectedArea.areaName);
    }
  }, [selectedArea]);

  const fetchAvailabilityData = async (areaName) => {
    try {
      setAvailability(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await axios.get(
        `http://localhost:5000/area/availability/${areaName}`
      );
      console.log(response.data.data)
      if (response.data.success) {
        setAvailability({
          total: response.data.data.totalSlots,
          booked: response.data.data.bookedSlots,
          available: response.data.data.availableSlots,
          loading: false,
          error: null
        });
      } else {
        setAvailability({
          total: 0,
          booked: 0,
          available: 0,
          loading: false,
          error: response.data.message || "Failed to load availability data"
        });
      }
    } catch (error) {
      setAvailability({
        total: 0,
        booked: 0,
        available: 0,
        loading: false,
        error: error.response?.data?.message || error.message || "Network error"
      });
    }
  };

  const handleAreaChange = (e) => {
    const areaId = e.target.value;
    const selected = parkingAreas.find(area => area.id == areaId);
    setSelectedArea(selected || null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl">Please log in to access the dashboard</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen" style={{
      backgroundImage: `url(${parkingImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
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
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:scale-105 transform transition-all px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/book_parking")}
            className="hover:scale-105 transform transition-all px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Book Parking
          </button>
          <button
            onClick={() => navigate("/mybookings")}
            className="hover:scale-105 transform transition-all px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            My Bookings
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
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-32 px-4 pb-10">
        {/* Search and Select Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="w-full max-w-2xl bg-white bg-opacity-90 p-6 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Search parking areas..."
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              onChange={handleAreaChange}
              value={selectedArea?.id || ""}
            >
              <option value="">Select a parking area...</option>
              {filteredAreas.map((area) => (
                <option key={area.id} value={area.id}>
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
            className="max-w-4xl mx-auto bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl"
          >
            <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
              {selectedArea.areaName}
            </h2>
            <p className="text-center text-lg text-gray-600 mb-10">
              {selectedArea.address}
            </p>

            {availability.loading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                <p className="mt-2 text-gray-600">Loading availability data...</p>
              </div>
            ) : availability.error ? (
              <div className="text-center py-6">
                <p className="text-red-500">{availability.error}</p>
                <button
                  onClick={() => fetchAvailabilityData(selectedArea.areaName)}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-blue-100 border border-blue-300 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-blue-800">Total Spaces</h3>
                    <p className="text-3xl font-bold text-blue-600">{availability.total}</p>
                  </div>
                  <div className="bg-red-100 border border-red-300 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-red-800">Booked</h3>
                    <p className="text-3xl font-bold text-red-600">{availability.booked}</p>
                  </div>
                  <div className="bg-green-100 border border-green-300 p-6 rounded-xl">
                    <h3 className="font-bold text-lg text-green-800">Available</h3>
                    <p className="text-3xl font-bold text-green-600">{availability.available}</p>
                  </div>
                </div>

                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => navigate("/book_parking", { state: { selectedArea } })}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg text-white text-lg font-semibold shadow-md"
                  >
                    Book Parking
                  </button>
                </div>
              </>
            )}
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center py-6">
        <p className="text-lg">
          &copy; {new Date().getFullYear()} ParkerPro. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;