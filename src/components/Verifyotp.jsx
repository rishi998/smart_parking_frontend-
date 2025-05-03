import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const validateOtp = async (otp) => {
    try {
      console.log("Verifying OTP...");
      const response = await axios.post(`${BASE_URL}/auth/verifyotp`, { code: otp });
      console.log("Response received:", response.data.user);
      console.log("Success status:", response.data.success);

      if (response.data.success && response.data.user) {
        console.log("User name:", response.data.user.name);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", response.data.user.name);
        navigate("/dashboard", { state: { user: response.data.user } });
        return true;
      } else {
        setErr("Verification failed: Invalid OTP or user not found");
        return false;
      }
    } catch (error) {
      console.error("Error during verification:", error.response || error);
      const errorMsg = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An unexpected error occurred. Please try again.";
      setErr(errorMsg);
      return false;
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setErr("");
    const isValid = await validateOtp(otp);
    if (isValid) {
      console.log("Logged in successfully");
    } else {
      console.log("Verification failed, check errors for details.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md flex flex-col justify-center items-center">
        <form onSubmit={handleVerification} className="w-full">
          <h4 className="text-3xl font-bold mb-6 text-center text-gray-800">Enter OTP</h4>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {err && <p className="text-red-500 text-sm mt-2 text-center">{err}</p>}
          </div>

          <div className="mb-4">
            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all duration-300"
            >
              Verify
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-blue-500 hover:underline"
            >
              Register Instead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
