import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // For animations

const BASE_URL = "http://localhost:5000";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
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
    if (!phone) {
      setErr("Please enter a phone number");
      return;
    }

    try {
      console.log("Sending request to register...");
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        email,
        name,
        password,
        phone,
      });

      console.log("Response received:", response.data);

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);

      const errorMsg =
        error.response && error.response.data?.message
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
    <div className="h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Register</h2>
          <button 
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Home
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-5 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-3 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-5 py-3 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {err && <p className="text-red-500 text-sm">{err}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-500 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Register
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">Already have an account?</p>
          <button 
            onClick={() => navigate("/login")}
            className="mt-2 text-blue-500 hover:underline hover:text-blue-700 font-medium"
          >
            Login Here
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
