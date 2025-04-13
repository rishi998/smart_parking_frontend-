import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const Alogin = () => {
  // const [name, setName] = useState("");
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
      console.log("Sending request to login...");
      const response = await axios.post(`${BASE_URL}/adminauth/login`, {
        email,password
      });
      
      if (response) {
        navigate("/admindashboard", { state: { admin: response.data.admin } });
        localStorage.setItem("token", response.data.admin.accesstoken);
        localStorage.setItem("admin", response.data.admin.name);
        console.log("RESPONSE DATA : ",response.data)
      }
    } catch (error) {
      console.error("Error during registration:", error);

      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred. Please try again.";

      if (error.response && error.response.status === 404) {
        navigate('/login')
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
    <>
      {/* <p className="">SMART CAR PARKING</p> */}
      <div className="h-screen bg-green-500 overflow-hidden flex items-center justify-center">
        <div className="container flex items-center justify-center mx-8 space-x-8">
          <div className="w-full max-w-md bg-gradient-to-r from-cyan-300 to-cyan-400 rounded-lg p-10 shadow-lg shadow-gray-200/20 flex flex-col justify-center items-center">
            <form onSubmit={handlelogin} className="w-full">
              <div className="flex flex-row space-x-30">
              <h4 className="text-2xl font-bold mb-6 text-center pl-35">ADMIN</h4>
              <h4 className="btn-primary cursor-pointer" onClick={()=>{navigate("/")}}>Home</h4>
              </div>
              <div className="mb-4 border rounded-lg">
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="input-box w-full text-center text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter Password"
                  className="input-box w-full text-center text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {err && <p className="text-red-500 text-xs mt-2">{err}</p>}
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="btn-primary w-full bg-blue-500 rounded-lg text-lg mt-5 cursor-pointer"
                >
                  LOGIN
                </button>
                <p className="text-center mt-3">Not registered?</p>
                <button
                  onClick={handleclick}
                  className="btn-primar text-md text-blue-500 p-1 ml-38 "
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alogin;
