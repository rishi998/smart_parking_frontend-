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
        navigate("/logged_in_dashboard", {state: {user: response.data.user}});
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
      console.log("Logged in successful");
    } else {
      console.log("Verification failed, check errors for details.");
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden flex items-center justify-center">
      <div className="container flex items-center justify-center mx-8 space-x-8">
        <div className="w-full max-w-md bg-white rounded-lg p-10 shadow-lg shadow-gray-200/20 flex flex-col justify-center items-center">
          <form onSubmit={handleVerification} className="w-full">
            <h4 className="text-2xl font-semibold mb-6 text-center">Enter OTP</h4>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="input-box w-full"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {err && <p className="text-red-500 text-xs mt-2">{err}</p>}
            </div>
            <div className="mb-4">
              <button type="submit" className="btn-primary bg-emerald-500 w-full rounded-lg">
                Verify
              </button>
            </div>
            <div className="mb-4">
              <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary bg-blue-500 w-full rounded-lg">
                Go to Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
