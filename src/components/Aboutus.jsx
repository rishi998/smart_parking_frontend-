import React, { useState } from 'react';
import { motion } from 'framer-motion';
import parkingImage from '../assets/images/parking.jpg';


const AboutUs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle Logout
  const handleLogout = () => {
    // Implement logout logic (e.g., clearing user session)
    alert('Logged out');
  };

  const user = "User"; // Example user name, replace with dynamic data as needed

  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-gray-900 to-gray-700 text-white flex justify-between items-center p-2 fixed top-0 left-0 w-full z-50 shadow-md h-16"
      >
        <div className="text-3xl font-bold tracking-wider">
          <h1>ParkerPro</h1>
        </div>
        <div className="flex space-x-4">
          {["Home", "Book Parking", "My Bookings", "About Us"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, "_")}`}
              className="hover:scale-105 transform transition-all px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
            >
              {item}
            </a>
          ))}
        </div>
        
      </motion.nav>

      {/* Hero Section */}
      <section
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${parkingImage})`}}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white p-5">
          <motion.h1
            className="text-6xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <motion.h2
          className="text-4xl font-semibold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Mission
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Mission Text */}
          <div className="flex-1">
            <motion.p
              className="text-lg text-gray-700 mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              We are committed to making parking more accessible, efficient, and hassle-free. Our app provides real-time parking availability and booking, ensuring a smooth and seamless experience for all drivers. Whether you’re looking for a spot downtown or near a specific location, we’ve got you covered.
            </motion.p>
            <motion.p
              className="text-lg text-gray-700"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              We believe that parking should never be a stressful part of your day, so we strive to offer the most convenient parking solutions. Our easy-to-use platform ensures that you’ll always find the perfect spot when you need it.
            </motion.p>
          </div>

          {/* Mission Image */}
          <div className="flex-1">
            <motion.img
              src={parkingImage}
              alt="Parking"
              className="w-full max-w-lg rounded-lg shadow-lg mx-auto h-1/2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-100 py-16" id="values">
        <motion.h2
          className="text-4xl font-semibold text-center text-gray-800 mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Core Values
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Value 1 */}
          <motion.div
            className="flex-1 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Efficiency</h3>
            <p className="text-gray-700">
              Save time with real-time parking availability and booking.
            </p>
          </motion.div>

          {/* Value 2 */}
          <motion.div
            className="flex-1 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Convenience</h3>
            <p className="text-gray-700">
              Book parking spots in advance from the comfort of your phone.
            </p>
          </motion.div>

          {/* Value 3 */}
          <motion.div
            className="flex-1 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reliability</h3>
            <p className="text-gray-700">
              Always find a secure and reliable parking spot near you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="max-w-7xl mx-auto px-5 py-16" id="contact">
        <motion.h2
          className="text-3xl font-semibold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>
        <div className="text-center">
          <motion.p
            className="text-xl text-gray-700 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Have any questions or need assistance? Feel free to contact us anytime!
          </motion.p>
          <motion.button
            className="bg-green-500 text-white text-xl px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
      
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Contact Us
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
