import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
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
  return (
    <div>
      <nav className="bg-gray-800 text-white flex justify-between items-center p-4 fixed top-0 left-0 w-full z-50">
        <div className="logo text-lg font-bold">
          <h1>Logo</h1>
        </div>
        <div className="nav-links flex">
          <a href="#home" className="mx-2 px-3 py-2 rounded hover:bg-gray-700">
            Home
          </a>
          <a href="#about" className="mx-2 px-3 py-2 rounded hover:bg-gray-700">
            About
          </a>
          <a
            href="#services"
            className="mx-2 px-3 py-2 rounded hover:bg-gray-700"
          >
            Services
          </a>
        </div>
        <div className="login-button">
          <button>
            Hello, {user.name}{" "}
            {/* Access and display the user's name correctly */}
          </button>
          <button
            onClick={handleclick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5"
          >
            Logout
          </button>
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
          <p className="text-xl text-gray-600 mb-6">If you have any questions or need support, feel free to reach out to us!</p>
            <button onClick={handlecontact} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Contact Us</button>
        </section>
    </div>
  );
};
export default Dashboard;
