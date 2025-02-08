import React from 'react';
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Logged_in_dashboard = () => {
  const location = useLocation();
  const user = location.state?.user;  // Correctly access user object from state

  console.log("User from state:", user);  // Debug the user object
  const navigate= useNavigate()
  // Check if the user object or user.name is undefined or null
  if (!user || !user.name) {
    console.log("No user data available.");
    return <p>please Log In.</p>;  // Provide a fallback UI
  }

  const handleclick=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div>
      <nav className="bg-gray-800 text-white flex justify-between items-center p-4">
        <div className="logo text-lg font-bold">
          <h1>Logo</h1>
        </div>
        <div className="nav-links flex">
          <a href="#home" className="mx-2 px-3 py-2 rounded hover:bg-gray-700">Home</a>
          <a href="#about" className="mx-2 px-3 py-2 rounded hover:bg-gray-700">About</a>
          <a href="#services" className="mx-2 px-3 py-2 rounded hover:bg-gray-700">Services</a>
        </div>
        <div className="login-button">
          <button >
            Hello, {user.name} {/* Access and display the user's name correctly */}
          </button>
          <button onClick={handleclick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">Logout</button>
        </div>
      </nav>
    </div>
  );
}

export default Logged_in_dashboard;
