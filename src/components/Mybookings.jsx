import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const username = localStorage.getItem("user");
  const accessToken = localStorage.getItem("token");

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!username || !accessToken) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/bookings/${username}`
        );
        setBookings(res.data.bookings);
        console.log(res.data.bookings);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleViewDetails = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };
  const navigate = useNavigate();
  const handleBackButton = () => {
    const user = localStorage.getItem("user");
    navigate("/dashboard", { state: { user } });
  };
  const handleCancelClick = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handlePayment = async (bookingId) => {
    try {
      setLoading(true);
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) throw new Error("Booking not found");
      const response = await axios.post("http://localhost:5000/payment", {
        bookingId: booking.id,
        username:booking.username,
        totalAmount: 100 // Your amount
      });
      console.log(response)
      
      if (response.data.url) {
        window.location.href = response.data.url; // Open Stripe
      }
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleConfirmCancel = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/bookings/cancel/${selectedBooking.id}`
      );

      if (response.data.success) {
        setBookings((prev) => prev.filter((b) => b.id !== selectedBooking.id));
        setShowCancelModal(false);
        setSelectedBooking(null);
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (err) {
      console.error("Cancel Error:", err);
      alert("Error occurred while canceling.");
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading bookings...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Your Bookings
      </h2>
      <div className="text-center mb-6">
        <button
          onClick={handleBackButton}
          className="absolute top-4 left-4 p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <p className="text-center text-gray-600 mb-8">
        View and manage your bookings here!!
      </p>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-300 p-3 rounded-2xl">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-blue-400 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {booking.area}
              </h3>
              <p className="text-gray-600 mb-1">
                <strong>Address:</strong> {booking.address || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>{booking.level}</strong>
              </p>
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-2 py-1 rounded-full text-md font-medium ${
                    booking.bookingStatus === "confirmed"
                      ? "bg-green-600 text-white"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {booking.bookingStatus}
                </span>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => handleViewDetails(booking.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex justify-center">
              Booking Details
            </h3>
            <div className="text-gray-700 space-y-2 text-left">
              <p>
                <strong>NAME:</strong> {selectedBooking.username}
              </p>
              <p>
                <strong>AREA:</strong> {selectedBooking.area}
              </p>
              <p>
                <strong>ADDRESS:</strong> {selectedBooking.address || "N/A"}
              </p>
              <p>
                <strong>LEVEL:</strong> {selectedBooking.level}
              </p>
              <p>
                <strong>SLOT:</strong> {selectedBooking.slotNumber}
              </p>
              <p>
                <strong>DATE:</strong> {selectedBooking.dateOfBooking}
              </p>
              <p>
                <strong>TIME:</strong> {selectedBooking.timeOfBooking}
              </p>
              <p>
                <strong>PAYMENT STATUS:</strong> {selectedBooking.paymentStatus}
              </p>
              <p>
                <strong>BOOKING STATUS:</strong> {selectedBooking.bookingStatus}
              </p>
            </div>
            <div className="mt-6 flex space-x-20 flex-row">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedBooking(null);
                }}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-green-300 rounded-lg hover:bg-green-400"
                onClick={() => {
                  handlePayment(selectedBooking.id);
                  // console.log(selectedBooking.id)
                  // console.log(bookings)
                  setSelectedBooking(null);
                }}
              >
                Checkout
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => {
                  setShowConfirmPopup(true);
                }}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmPopup && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to cancel this booking?
            </h3>
            <p className="text-gray-700 mb-6">
              Booking Slot: <strong>{selectedBooking.slotNumber}</strong>
              <br />
              Date: <strong>{selectedBooking.dateOfBooking}</strong>
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setShowConfirmPopup(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => {
                  handleConfirmCancel();
                  setShowConfirmPopup(false);
                  setShowDetailModal(false);
                }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Cancellation
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel the booking for{" "}
              <strong>{selectedBooking.slotNumber}</strong> on{" "}
              <strong>{selectedBooking.dateOfBooking}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedBooking(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleConfirmCancel}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
