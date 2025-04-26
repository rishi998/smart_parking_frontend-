import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
    // Fetch parking areas from API
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
    // Filter areas based on search query
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
      fetchAvailabilityData(selected.areaName); // Fetch real data
    }
  };

  const fetchAvailabilityData = async (areaName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/area/availability/${encodeURIComponent(areaName)}`
      );
      
      if (response.data.success) {
        setAvailability({
          total: response.data.data.totalSlots,
          booked: response.data.data.bookedSlots,
          available: response.data.data.availableSlots,
        });
        console.log(response)
      } else {
        console.error("Failed to fetch availability:", response.data.message);
        // Optionally show error to user
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      // Optionally show error to user
      setAvailability({
        total: 0,
        booked: 0,
        available: 0
      });
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/src/assets/images/parking.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100%",
      }}
    >
      {/* Navbar (unchanged) */}
      <nav className="bg-gradient-to-r from-gray-900 to-gray-700 text-white flex justify-between items-center p-4 fixed top-0 left-0 w-full z-50 shadow-lg">
        <div className="logo text-3xl font-bold tracking-wide">
          <h1>ParkerPro</h1>
        </div>
        <div className="nav-links flex">
          <a
            href="/dashboard"
            className="mx-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition text-md font-semibold"
          >
            Home
          </a>
          <a
            href="/book_parking"
            className="mx-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition text-md font-semibold"
          >
            Book Parking
          </a>
          <a
            href="/mybookings"
            className="mx-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition text-md font-semibold"
          >
            My Bookings
          </a>
          <a
            href="/about_us"
            className="mx-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition text-md font-semibold"
          >
            About Us
          </a>
          <a
            href="/about_us"
            className="mx-3 px-4 py-2 rounded-lg hover:bg-gray-600 transition text-md font-semibold"
          >
            Help
          </a>
        </div>
        <div className="flex flex-col w-40">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-700 hover:bg-gray-900 rounded-full focus:outline-none transition ml-5"
          >
            <img
              src="./src/assets/images/user.png"
              alt="User"
              className="h-10 w-10 rounded-full border-2 border-white"
            />
          </button>
          <h2 className="text-xl font-bold mb-2">Hello, {user} 👋</h2>
        </div>
        {/* Sidebar */}
        <div
          className={`fixed mt-21 h-100 pt-15 inset-y-10 right-0 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out shadow-2xl p-4 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul>
            <li className="mb-3">
              <a href="/mybookings" className="hover:text-gray-400">
                My Bookings
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="hover:text-gray-400">
                Extras
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Improved Search Section */}
      <section className="flex flex-col items-center my-10 px-4">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search parking areas by name or address..."
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>

        {/* Area Selection Dropdown with actual data */}
        <div className="w-full max-w-2xl mt-4">
          <select
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md text-black backdrop-blur bg-gray-300 bg-opacity-80 mt-5"
            onChange={handleAreaChange}
            value={selectedArea?._id || ""}
          >
            <option value="">Search Availble Parkings...</option>
            {filteredAreas.map((area) => (
              <option key={area._id} value={area._id} className="text-black">
                {area.areaName} - {area.address}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Parking Availability Section (unchanged) */}
      {selectedArea && (
        <section className="mx-auto max-w-3xl bg-amber-400 rounded-2xl">
          <div
            className="backdrop-blur bg-opacity-50 p-6 rounded-lg shadow-lg"
            style={{
              backdropFilter: "blur(10px)",
            }}
          >
            <h2 className="text-3xl text-center mb-6 text-black-700 font-bold">
              {selectedArea.name}
            </h2>
            <p className="text-center text-lg mb-6 text-black-900">
              {selectedArea.address}
            </p>

            <div className="flex justify-around space-x-4">
              <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md w-40 text-center">
                <h3 className="font-semibold">Total Spaces</h3>
                <p>{availability.total}</p>
              </div>
              <div className="bg-red-600 text-white p-4 rounded-lg shadow-md w-40 text-center">
                <h3 className="font-semibold">Booked Spaces</h3>
                <p>{availability.booked}</p>
              </div>
              <div className="bg-green-600 text-white p-4 rounded-lg shadow-md w-40 text-center">
                <h3 className="font-semibold">Available Spaces</h3>
                <p>{availability.available}</p>
              </div>
            </div>

            {/* Book Parking Button */}
            <section className="flex justify-center my-10">
              <button
                onClick={handleBooking}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Book Parking
              </button>
            </section>
          </div>
        </section>
      )}

      {/* Rest of the component (unchanged) */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
        <p className="text-lg">
          &copy; {new Date().getFullYear()} ParkerPro. All Rights Reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-gray-400">
            {" "}
            Privacy Policy{" "}
          </a>{" "}
          <a href="#" className="hover:text-gray-400">
            {" "}
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400">
            {" "}
            Support
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
