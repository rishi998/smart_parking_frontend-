import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // For smooth animations

const BASE_URL = "http://localhost:5000";

const Login = () => {
  const [email, setEmail] = useState("");
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
      console.log("Sending request to login...");
      const response = await axios.post(`${BASE_URL}/auth/login`, { email });

      if (response) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/verifyotp");
      }
    } catch (error) {
      console.error("Error during login:", error);

      const errorMsg =
        error.response && error.response.data?.message
          ? error.response.data.message
          : "An unexpected error occurred. Please try again.";

      if (error.response && error.response.status === 404) {
        navigate("/login");
      }
      setErr(errorMsg);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">User Login</h2>
          <button 
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Home
          </button>
        </div>

        <form onSubmit={handlelogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {err && <p className="text-red-500 text-sm mt-2">{err}</p>}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            type="submit"
            className="w-full bg-blue-500 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Login
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">Not registered?</p>
          <button 
            onClick={handleRegisterRedirect}
            className="mt-2 text-blue-500 hover:underline hover:text-blue-700 font-medium"
          >
            Register Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
