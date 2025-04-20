import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming React Router for navigation
import axios from "axios";

const BookParking = () => {
  const TOTAL_SLOTS = 20;
  const parkingAreas = [
    {
      id: 1,
      name: "Central Delhi",
      address: "Connaught Place, Delhi",
      levels: ["Level 1", "Level 2", "Level 3"],
    },
    {
      id: 2,
      name: "North Delhi",
      address: "Kamla Nagar, Delhi",
      levels: ["Level 1", "Level 2"],
    },
    {
      id: 3,
      name: "South Delhi",
      address: "Saket, Delhi",
      levels: ["Level 1", "Level 2", "Level 3", "Level 4"],
    },
    {
      id: 4,
      name: "East Delhi",
      address: "Laxmi Nagar, Delhi",
      levels: ["Level 1", "Level 2"],
    },
    {
      id: 5,
      name: "West Delhi",
      address: "Rajouri Garden, Delhi",
      levels: ["Level 1", "Level 2", "Level 3"],
    },
  ];

  const createSpots = () =>
    Array.from({ length: TOTAL_SLOTS }, (_, i) => ({
      id: `Spot ${i + 1}`,
      status: "available",
    }));

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSpot, setSelectedSpot] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [confirmationDetails, setConfirmationDetails] = useState(null);
  const [parkingSpots, setParkingSpots] = useState(createSpots());
  const [userBooking, setUserBooking] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  const resetAllInputs = () => {
    setSelectedSpot("");
    setSelectedAddress("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedArea(null);
    setSelectedLevel("");
    setConfirmationDetails(null);
    setBookingStatus("");
  };

  const handleBackButton = () => {
    const user = localStorage.getItem("user");
    navigate("/dashboard", { state: { user } });
  };

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot.id);
  };
  const handleBooking = async () => {
    if (
      !selectedArea ||
      !selectedLevel ||
      !selectedSpot ||
      !selectedDate ||
      !selectedTime
    ) {
      setBookingStatus("Please fill all the details!");
      return;
    }
  
    const updatedSpots = parkingSpots.map((spot) =>
      spot.id === selectedSpot ? { ...spot, status: "booked" } : spot
    );
    setParkingSpots(updatedSpots);
  
    const details = {
      username:localStorage.getItem("user"),
      area: selectedArea.name,
      address: selectedAddress.address,
      level: selectedLevel,
      slotNumber: selectedSpot,
      dateOfBooking: selectedDate,
      timeOfBooking: selectedTime,
      accessToken: crypto.randomUUID(),
    };
  
    try {
      const response = await axios.post(
        "http://localhost:5000/bookings/book",
        details
      );
  
      if (response.data.success) {
        const savedBooking = response.data.booking;
  
        setConfirmationDetails({
          ...details,
          _id: savedBooking._id,
        });
  
        setBookingStatus("Booking successful!");
      } else {
        setBookingStatus("Failed to save booking. Try again later.");
        return;
      }
    } catch (err) {
      console.error("Error booking:", err);
      setBookingStatus("Failed to save booking. Try again later.");
      return;
    }
  
    setUserBooking(selectedSpot);
  
    alert(`Booking confirmed for ${details.slotNumber} at ${details.area}`);
  
    setSelectedSpot("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedArea(null);
    setSelectedAddress("");
    setSelectedLevel("");
  };

  const handleCancelBooking = async () => {
    if (!confirmationDetails || !confirmationDetails._id) {
      setBookingStatus("No active booking found to cancel.");
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/bookings/cancel/${confirmationDetails._id}`
      );
  
      if (response.data.success) {
        const updatedSpots = parkingSpots.map((spot) =>
          spot.id === confirmationDetails.slotNumber
            ? { ...spot, status: "available" }
            : spot
        );
        setParkingSpots(updatedSpots);
  
        alert(`${confirmationDetails.slotNumber} booking has been cancelled.`);
        resetAllInputs();
        setUserBooking(null);
      } else {
        setBookingStatus("Failed to cancel booking. Please try again.");
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setBookingStatus("Error while cancelling booking.");
    }
  };
  

  return (
    <div className="relative flex items-center justify-center bg-[url('/src/assets/images/parking.jpg')] bg-cover bg-center min-h-screen text-white">
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-md"></div>
      <div className="relative z-10 max-w-4xl mx-auto p-8 backdrop-blur rounded-lg shadow-xl text-center mt-10 w-full">
        <h2 className="text-3xl font-bold mb-4">Book Your Parking Spot</h2>

        {/* Back Button */}
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

        <div className="flex space-x-4 mb-6">
          <div className="w-full">
            <label className="block font-semibold mb-2">
              Select Parking Area
            </label>
            <select
              value={selectedArea ? selectedArea.id : ""}
              onChange={(e) => {
                const selected = parkingAreas.find(
                  (area) => area.id === parseInt(e.target.value)
                );
                setSelectedAddress(selected);
                setSelectedArea(selected);
                setSelectedLevel("");
                setParkingSpots(createSpots());
              }}
              className="text-white p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 w-full"
            >
              <option value="">Select Area</option>
              {parkingAreas.map((area) => (
                <option key={area.id} value={area.id} className="text-black">
                  {area.name} - {area.address}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block font-semibold mb-2">Select Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="text-white p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 w-full"
              disabled={!selectedArea}
            >
              <option value="">Select Level</option>
              {selectedArea &&
                selectedArea.levels.map((level, index) => (
                  <option key={index} value={level} className="text-black">
                    {level}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
          {parkingSpots.map((spot) => (
            <div
              key={spot.id}
              className={`w-full h-24 flex flex-col items-center justify-center text-lg font-semibold rounded-lg border-2 transition-all duration-300 text-center cursor-pointer transform ${
                spot.status === "booked"
                  ? "bg-gray-300 text-gray-600"
                  : selectedSpot === spot.id
                  ? "bg-green-600 text-white border-green-700 scale-110"
                  : "bg-blue-400 text-white hover:bg-blue-500 hover:scale-105"
              }`}
              onClick={() => handleSpotSelect(spot)}
            >
              {spot.id}
              {spot.status === "booked" && (
                <span className="block text-xs text-red-600 mt-1">Booked</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-white p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-lg"
          />
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="text-white p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-lg"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className={`w-full py-3 px-5 font-semibold rounded-lg transition-all duration-300 ${
              !selectedArea ||
              !selectedLevel ||
              !selectedSpot ||
              !selectedDate ||
              !selectedTime
                ? "bg-green-200 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800"
            }`}
            disabled={
              !selectedArea ||
              !selectedLevel ||
              !selectedSpot ||
              !selectedDate ||
              !selectedTime
            }
            onClick={handleBooking}
          >
            Book Spot
          </button>

          <button
            className="w-full py-3 px-5 font-semibold rounded-lg bg-yellow-600 hover:bg-yellow-700"
            onClick={resetAllInputs}
          >
            Reset
          </button>
        </div>

        {userBooking && (
          <button
            className="w-full py-3 px-5 font-semibold rounded-lg bg-red-600 hover:bg-red-700 mt-4"
            onClick={handleCancelBooking}
          >
            Cancel Booking
          </button>
        )}

        {confirmationDetails && (
          <div className="mt-6 p-4 border-2 border-green-500 rounded-lg bg-green-100 text-green-900 text-left">
            <h3 className="text-xl font-bold mb-2">Booking Details:</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>User :</strong> {localStorage.getItem("user")}
              </li>
              <li>
                <strong>Spot :</strong> {confirmationDetails.slotNumber}
              </li>
              <li>
                <strong>Area :</strong> {confirmationDetails.area}
              </li>
              <li>
                <strong>Address :</strong> {confirmationDetails.address}
              </li>
              <li>
                <strong>Level :</strong> {confirmationDetails.level}
              </li>
              <li>
                <strong>Date :</strong> {confirmationDetails.dateOfBooking}
              </li>
              <li>
                <strong>Time :</strong> {confirmationDetails.timeOfBooking}
              </li>
            </ul>
          </div>
        )}

        {bookingStatus && !confirmationDetails && (
          <p className="mt-4 font-semibold text-red-300">{bookingStatus}</p>
        )}
      </div>
    </div>
  );
};

export default BookParking;
