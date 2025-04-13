import React from 'react';
import { useNavigate } from 'react-router-dom';

const Choice = () => {
  let navigate = useNavigate();

  const handleLogin = (role) => {
    // Navigate based on role
    if (role === 'User') {
      navigate('/login');
    } else if (role === 'Admin') {
      navigate('/adminlogin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-4xl mb-4">Welcome to Parker Pro</h1>
      <p className="mb-8">Please choose your login role:</p>
      <div className='flex flex-row '>
      <button 
        onClick={() => handleLogin('User')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >
        Login as User
      </button>
      <button 
        onClick={() => handleLogin('Admin')}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4 cursor-pointer"
      >
        Login as Admin
      </button>
      </div>
    </div>
  );
};

export default Choice;
