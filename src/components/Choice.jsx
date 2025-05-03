import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import parkingImage from '../assets/images/parking.jpg'; // <-- import your image

const Choice = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === 'User') {
      navigate('/login');
    } else if (role === 'Admin') {
      navigate('/adminlogin');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center" 
      style={{ backgroundImage: `url(${parkingImage})` }} // <-- use imported image here
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.7 }}
        className="backdrop-blur-sm bg-opacity-90 rounded-3xl shadow-2xl p-10 flex flex-col items-center space-y-6 w-full max-w-md"
      >
        <h1 className="text-4xl font-extrabold text-white-800 text-center">
          Welcome to <span className="text-indigo-600">ParkerPro</span> 🚗
        </h1>
        <p className=" text-center ">Please choose your login role:</p>

        <div className="flex flex-col space-y-4 w-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLogin('User')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-300"
          >
            Login as User
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLogin('Admin')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all duration-300"
          >
            Login as Admin
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Choice;
