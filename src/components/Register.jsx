import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        console.log(response.data.accessToken);
        localStorage.setItem("token", response.data.accessToken);
      }
      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error);

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
    <div className="h-screen bg-green-500 overflow-hidden flex items-center justify-center">
      <div className="container flex items-center justify-center mx-8 space-x-8">
        <div className="w-full max-w-md bg-gradient-to-r from-cyan-200 to-cyan-400 rounded-lg p-10 shadow-lg shadow-gray-200/20 flex flex-col justify-center items-center">
          <form onSubmit={handleSignup} className="w-full">
            <h4 className="text-2xl font-semibold mb-6 text-center">
              REGISTER
            </h4>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                className="input-box w-full text-center bg-amber-50"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                className="input-box w-full text-center bg-amber-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input-box w-full text-center bg-amber-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone"
                className="input-box w-full text-center bg-amber-100"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {err && <p className="text-red-500 text-xs mt-2">{err}</p>}
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="btn-primary w-full rounded-lg mb-1 bg-blue-500 font-bold"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn-primar w-full rounded-lg text-blue-500 font-semibold"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
