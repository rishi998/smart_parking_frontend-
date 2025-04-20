import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [availability, setAvailability] = useState({
    total: 20,
    booked: 5,
    available: 15,
  });
  const location = useLocation();
  // const user = location.state?.user;
  const navigate = useNavigate();

  const user=localStorage.getItem("user");

  if (!user) {
    return <p>please Log In.</p>;
  }

const handleclick = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  navigate("/");
};

  const handlebooking = () => {
    navigate("/book_parking");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const parkingAreas = [
    { id: 1, name: "Central Delhi", address: "Connaught Place, Delhi" },
    { id: 2, name: "North Delhi", address: "Kamla Nagar, Delhi" },
    { id: 3, name: "South Delhi", address: "Saket, Delhi" },
    { id: 4, name: "East Delhi", address: "Laxmi Nagar, Delhi" },
    { id: 5, name: "West Delhi", address: "Rajouri Garden, Delhi" },
  ];

  const areaAvailabilityData = {
    1: { total: 30, booked: 10, available: 20 }, // Central Delhi
    2: { total: 25, booked: 5, available: 20 }, // North Delhi
    3: { total: 40, booked: 15, available: 25 }, // South Delhi
    4: { total: 20, booked: 5, available: 15 }, // East Delhi
    5: { total: 35, booked: 10, available: 25 }, // West Delhi
  };

  const handleAreaChange = (e) => {
    const selected = parkingAreas.find((area) => area.id === parseInt(e.target.value));
    setSelectedArea(selected);
    setAvailability(areaAvailabilityData[selected.id]);
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
      {/* Navbar */}
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
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed mt-15 h-100 pt-15 inset-y-10 right-0 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out shadow-2xl rounded-lg p-4 ${
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
             onClick={handleclick} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Content Section */}
      <section className="py-20 px-4 md:px-10">
        <h1 className="text-4xl font-extrabold text-black text-center m-6 animate_animated animate_fadeIn pt-5">
          Welcome to Smart Parking
        </h1>
        <p className="text-xl text-black text-center mb-10 opacity-80 animate_animated animatefadeIn animate_delay-1s">
          Your solution to easy and efficient parking. Book in real-time!
        </p>

        {/* Area Selection Dropdown */}
        <section className="flex justify-center my-10">
          <select
            className="backdrop-blur p-4 w-96 rounded-l-lg border border-gray-100 focus:outline-none shadow-md text-black"
            onChange={handleAreaChange}
            defaultValue=""
          >
            <option value="" className="">
              Select Parking Area
            </option>
            {parkingAreas.map((area) => (
              <option key={area.id} value={area.id} className="backdrop-blur text-black">
                {area.name} - {area.address}
              </option>
            ))}
          </select>
        </section>

        {/* Parking Availability Section */}
        {selectedArea && (
          <section className="my-10 mx-auto max-w-3xl pb-20">
            <div
              className="backdrop-blur bg-opacity-50 p-6 rounded-lg shadow-lg"
              style={{
                backdropFilter: "blur(10px)",
              }}
            >
              <h2 className="text-3xl font-bold text-center mb-6 text-white">
                {selectedArea.name}
              </h2>
              <p className="text-center text-lg mb-6 text-white">{selectedArea.address}</p>

              <div className="flex justify-around mb-6">
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
                  onClick={handlebooking}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Book Parking
                </button>
              </section>
            </div>
          </section>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
        <p className="text-lg">&copy; {new Date().getFullYear()} ParkerPro. All Rights Reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Service
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