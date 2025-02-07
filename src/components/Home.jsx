import React from 'react'
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleclick=()=>{
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
        <button onClick={handleclick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </div>
    </nav>
    </div>
  )
}

export default Home;
