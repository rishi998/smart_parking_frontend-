import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const user = location.state?.user;

  console.log("User from state:", user);
  const navigate = useNavigate();
  if (!user || !user.name) {
    console.log("No user data available.");
    return <p>please Log In.</p>;
  }
  const handleclick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handlebooking = () => {
    navigate("/book_parking");
  };
  const handlecontact = () => {
    navigate("/contact_us");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <nav className="bg-gray-800 text-white flex justify-between items-center p-4 fixed top-0 left-0 w-full z-50">
        <div className="logo text-3xl font-bold">
          <h1>ParkerPro</h1>
        </div>
        <div className="nav-links flex">
          <a href="/dashboard" className="mx-2 px-3 py-2 rounded hover:bg-gray-700 font-semibold text-xl">
            Home
          </a>
          <a href="/book_parking" className="mx-2 px-3 py-2 rounded hover:bg-gray-700 font-semibold text-xl">
            Book Parking
          </a>
          <a
            href="/about_us"
            className="mx-2 px-3 py-2 rounded hover:bg-gray-700 font-semibold text-xl"
          >
            About Us
          </a>
        </div>
        <div className="login-button">
          
          
          <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-800 text-white rounded-lg focus:outline-none"
          >
            <img src="./src/assets/images/user.png" alt="user" className="h-8 w-8 m-0" />
          </button>
          {/* sidebar */}
          <div
        className={`fixed inset-y-18 right-0 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out rounded-2xl ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold"><button>Hello, {user.name}👋 </button></h2>
          <ul className="mt-4">
            <li className="mb-2">
              <a href="/mybookings" className="hover:text-gray-400">
                My Bookings
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-400">
                Extras
              </a>
            </li>
            <li className="mb-2">
            <button
            onClick={handleclick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-0"
          >
            Logout
          </button>
            </li>
          </ul>
        </div>
      </div>
        </div>
        
      </nav>
      <section className="text-center py-20 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <h1 className="text-5xl font-bold mb-6">Welcome to Smart Parking</h1>
        <p className="text-xl mb-10">
          Your solution to easy and efficient parking. Explore our features and
          book parking in real-time.
        </p>
      </section>
      <section className="flex justify-center my-10">
        <input
          type="text"
          className="p-4 w-96 rounded-l-lg border border-gray-300 focus:outline-none"
          placeholder="Search parking locations..."
        />
        <button className="p-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300">
          Search
        </button>
      </section>
      <section className="text-center bg-white p-8 my-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Book Parking</h2>
        <p className="text-xl text-gray-600 mb-6">
          Find available parking spots nearby and book instantly. Check
          real-time availability and select your preferred spot.
        </p>
        <button
          onClick={handlebooking}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Book Now
        </button>
      </section>
      <section className="text-center bg-white p-8 my-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-xl text-gray-600 mb-6">
          If you have any questions or need support, feel free to reach out to
          us!
        </p>
        <button
          onClick={handlecontact}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Contact Us
        </button>
      </section>
    </div>
  );
};
export default Dashboard;
