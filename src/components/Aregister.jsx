import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const BASE_URL = "http://localhost:5000";

const Aregister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");

    if (!name) {
      setErr("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setErr("Please enter a valid email");
      return;
    }
    if (!password) {
      setErr("Please enter a password");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/adminauth/register`, {
        email,
        name,
        password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }
      if (response.data.success) {
        navigate("/adminlogin");
      }
    } catch (error) {
      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred. Please try again.";
      setErr(errorMsg);
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl p-10 w-full max-w-md mx-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Admin Register</h1>
          <button 
            onClick={() => navigate("/")} 
            className="text-sm text-black hover:text-gray-600 transition"
          >
            Home
          </button>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-md bg-gray-100 placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-gray-100 placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-gray-100 placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {err && <p className="text-red-600 text-center text-sm">{err}</p>}

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-md transition"
          >
            Register
          </motion.button>
        </form>

        <p className="text-center text-black mt-6">Already have an account?</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/adminlogin")}
          className="mt-2 text-black underline hover:text-gray-700 transition"
        >
          Login Here
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Aregister;
