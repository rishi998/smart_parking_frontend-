import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import axios from 'axios'; // Make sure to install axios

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingId = new URLSearchParams(location.search).get('bookingId');
  const username = new URLSearchParams(location.search).get('username');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookingId) {
      navigate('/mybookings'); 
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/verify-payment`,{bookingId});
        
        if (response.data.success) {
          setLoading(false);
        } else {
          throw new Error('Payment verification failed');
        }
      } catch (err) {
        console.error('Verification failed:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    verifyPayment();
  }, [bookingId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900">Verifying your payment...</h2>
          <p className="mt-2 text-gray-600">Please wait while we confirm your booking.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900">Payment Verification Failed</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 w-full px-4 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <FaCheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="mt-2 text-gray-600">{`You booking has been confirmed ${username}`}</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-3">
            <FaCalendarAlt className="text-blue-500 mr-2" />
            <span className="font-medium">Booking ID:</span>
            <span className="ml-2 font-mono">{bookingId}</span>
          </div>
          <p className="text-sm text-blue-700">
            We've sent a confirmation to your email. You can view your booking details anytime in your account.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/mybookings')}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            View All Bookings
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full px-4 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;