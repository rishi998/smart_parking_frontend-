import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // 👈 Add framer-motion for animations

const BASE_URL = "http://localhost:5000";

const Alogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    setErr("");
    if (!validateEmail(email)) {
      setErr("Please enter a valid email");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/adminauth/login`, { email, password });
      
      if (response) {
        navigate("/admindashboard", { state: { admin: response.data.admin } });
        localStorage.setItem("token", response.data.admin.accesstoken);
        localStorage.setItem("admin", response.data.admin.name);
      }
    } catch (error) {
      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred. Please try again.";

      if (error.response && error.response.status === 404) {
        navigate('/login');
        errorMsg = "Email address does not exist. Please register.";
      }
      setErr(errorMsg);
    }
  };

  const handleclick = () => {
    navigate("/adminregister");
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="h-screen bg-gradient-to-br from-green-400 via-blue-300 to-purple-400 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8 }} 
        className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-2xl p-10 w-full max-w-md mx-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black-800">Admin Login</h1>
          <button 
            onClick={() => navigate("/")} 
            className="text-sm text-blue-500 hover:text-gray-300 transition"
          >
            Home
          </button>
        </div>

        <form onSubmit={handlelogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-md bg-white bg-opacity-30 placeholder-black text-black-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-3 rounded-md bg-white bg-opacity-30 placeholder-black text-black-400 border-black-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {err && <p className="text-red-500 text-center text-sm">{err}</p>}

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-blue-400 mt-6">Not registered yet?</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleclick}
          className="text-center mt-2 text-blue-300 underline hover:text-blue-500 transition"
        >
          Register Here
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Alogin;
