import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-5">
      {/* About Header */}
      <section className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800">About Us</h1>
        <p className="text-xl text-gray-600 mt-4">
          Making Parking Easier and More Efficient for Everyone
        </p>
      </section>

      {/* About Content */}
      <section className="flex flex-col-reverse md:flex-row gap-8 mb-12">
        {/* About Text */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We are committed to making parking more accessible, efficient, and hassle-free. Our app
            provides real-time parking availability and booking, ensuring a smooth and seamless
            experience for all drivers. Whether you’re looking for a spot downtown or near a specific
            location, we’ve got you covered.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe that parking should never be a stressful part of your day, so we strive to
            offer the most convenient parking solutions. Our easy-to-use platform ensures that you’ll
            always find the perfect spot when you need it.
          </p>
        </div>

        {/* About Image */}
        <div className="flex-1">
          <img
            src="https://via.placeholder.com/500"
            alt="Parking"
            className="w-full max-w-lg rounded-lg shadow-lg mx-auto"
          />
        </div>
      </section>

      {/* About Values */}
      <section className="text-center mt-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Values</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Value Item 1 */}
          <div className="flex-1 bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Efficiency</h3>
            <p className="text-gray-600 leading-relaxed">
              Save time with real-time parking availability and booking.
            </p>
          </div>

          {/* Value Item 2 */}
          <div className="flex-1 bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Convenience</h3>
            <p className="text-gray-600 leading-relaxed">
              Book parking spots in advance from the comfort of your phone.
            </p>
          </div>

          {/* Value Item 3 */}
          <div className="flex-1 bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reliability</h3>
            <p className="text-gray-600 leading-relaxed">
              Always find a secure and reliable parking spot near you.
            </p>
          </div>
        </div>
      </section>

      {/* About Contact */}
      <section className="text-center mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-xl text-gray-600 mb-8">
          If you have any questions or need assistance, feel free to reach out!
        </p>
        <button className="bg-green-500 text-white text-xl px-8 py-3 rounded-lg hover:bg-green-600 transition-colors">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default AboutUs;