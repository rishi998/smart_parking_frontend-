import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookParking = () => {
  const [parkingAreas, setParkingAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [confirmationDetails, setConfirmationDetails] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [userBooking, setUserBooking] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  const navigate = useNavigate();

  // Fetch parking areas on component mount
  useEffect(() => {
    const fetchParkingAreas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/area/allareas");
        setParkingAreas(res.data.areas || []);
      } catch (err) {
        console.error("Error fetching parking areas:", err);
      }
    };
    fetchParkingAreas();
  }, []);

  // Generate parking spots when level is selected
  useEffect(() => {
    if (selectedLevelIndex !== null && selectedArea) {
      const fetchBookedSlots = async () => {
        try {
          const level = `Level ${selectedLevelIndex + 1}`;
          const res = await axios.get(
            `http://localhost:5000/bookings/booked-slots/${
              selectedArea._id
            }/${encodeURIComponent(level)}`
          );
          setBookedSlots(res.data.bookedSlots || []);
          console.log(res.data.bookedSlots);
        } catch (err) {
          console.error("Error fetching booked slots:", err);
          setBookedSlots([]);
        }
      };
      fetchBookedSlots();

      // Generate spots UI
      const slotsCount = selectedArea.slotsPerLevel[selectedLevelIndex] || 0;
      const spots = Array.from({ length: slotsCount }, (_, i) => ({
        id: `Spot ${i + 1}`,
        status: "available",
      }));
      setParkingSpots(spots);
    }
  }, [selectedLevelIndex, selectedArea]);

  const resetAllInputs = () => {
    setSelectedSpot("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedArea(null);
    setSelectedLevelIndex(null);
    setConfirmationDetails(null);
    setBookingStatus("");
  };

  const handleBackButton = () => {
    const user = localStorage.getItem("user");
    navigate("/dashboard", { state: { user } });
  };

  const handleSpotSelect = (spot) => {
    if (spot.status === "available") {
      setSelectedSpot(spot.id);
    }
  };

  const handleBooking = async () => {
    if (
      !selectedArea ||
      selectedLevelIndex === null ||
      !selectedSpot ||
      !selectedDate ||
      !selectedTime
    ) {
      setBookingStatus("Please fill all the details!");
      return;
    }

    const details = {
      username: localStorage.getItem("user"),
      area: selectedArea.areaName,
      address: selectedArea.address,
      level: `Level ${selectedLevelIndex + 1}`,
      slotNumber: selectedSpot,
      dateOfBooking: selectedDate,
      timeOfBooking: selectedTime,
      accessToken: crypto.randomUUID(),
      areaId: selectedArea._id, // Add area ID to the request
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

        // Update the spot status in UI
        const updatedSpots = parkingSpots.map((spot) =>
          spot.id === selectedSpot ? { ...spot, status: "booked" } : spot
        );
        setParkingSpots(updatedSpots);

        setBookingStatus("Booking successful!");
        setUserBooking(selectedSpot);

        alert(`Booking confirmed for ${details.slotNumber} at ${details.area}`);
      } else {
        setBookingStatus("Failed to save booking. Try again later.");
      }
    } catch (err) {
      console.error("Error booking:", err);
      setBookingStatus("Failed to save booking. Try again later.");
    }
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
      <div className="relative z-10 max-w-4xl mx-auto p-8 backdrop-blur rounded-lg shadow-xl text-center w-full ">
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
            <label className="block font-semibold mb-2">Parking Area</label>
            <select
              value={selectedArea ? selectedArea._id : ""}
              onChange={(e) => {
                const selected = parkingAreas.find(
                  (area) => area._id === e.target.value
                );
                setSelectedArea(selected);
                setSelectedLevelIndex(null);
                setSelectedSpot("");
              }}
              className="text-white p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 w-full"
            >
              <option value="">Select</option>
              {parkingAreas.map((area) => (
                <option key={area._id} value={area._id} className="text-black">
                  {area.areaName} - {area.address}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block font-semibold mb-2">Level</label>
            <select
              value={selectedLevelIndex !== null ? selectedLevelIndex : ""}
              onChange={(e) => {
                setSelectedLevelIndex(Number(e.target.value));
                setSelectedSpot("");
              }}
              className="text-white p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 w-full"
              disabled={!selectedArea}
            >
              <option value="">Select</option>
              {selectedArea &&
                selectedArea.slotsPerLevel.map((slots, index) => (
                  <option key={index} value={index} className="text-black">
                    Level {index + 1} ({slots} slots)
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-7">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-white border-2 pr-2 pl-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-lg"
            />
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="text-white border-2 pr-2 pl-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-lg"
            />
          </div>
        </div>

        {/* {selectedLevelIndex !== null && ( */}
        {selectedDate !== null && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              {parkingSpots.length > 0 ? (
                parkingSpots.map((spot) => {
                  const isBooked =
                    bookedSlots.includes(spot.id) || spot.status === "booked";
                  return (
                    <div
                      key={spot.id}
                      className={`w-full h-24 flex flex-col items-center justify-center text-lg font-semibold rounded-lg border-2 transition-all duration-300 text-center ${
                        isBooked
                          ? "bg-red-500 text-white cursor-not-allowed"
                          : selectedSpot === spot.id
                          ? "bg-green-600 text-white scale-110"
                          : "bg-blue-400 text-white hover:bg-blue-500 cursor-pointer"
                      }`}
                      onClick={() => !isBooked && handleSpotSelect(spot)}
                    >
                      {spot.id}
                      {isBooked && (
                        <span className="text-xs mt-1 text-white">Booked</span>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-4">
                  No parking spots available for this level
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className={`w-full py-3 px-5 font-semibold rounded-lg transition-all duration-300 ${
                  !selectedArea ||
                  selectedLevelIndex === null ||
                  !selectedSpot ||
                  !selectedDate ||
                  !selectedTime
                    ? "bg-green-200 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-800"
                }`}
                disabled={
                  !selectedArea ||
                  selectedLevelIndex === null ||
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
          </>
        )}

        {confirmationDetails && (
          <div className="mt-6 p-4 border-2 border-green-500 rounded-lg bg-green-100 text-green-900 text-left">
            <h3 className="text-xl font-bold mb-2">Booking Details:</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>User:</strong> {confirmationDetails.username}
              </li>
              <li>
                <strong>Spot:</strong> {confirmationDetails.slotNumber}
              </li>
              <li>
                <strong>Area:</strong> {confirmationDetails.area}
              </li>
              <li>
                <strong>Address:</strong> {confirmationDetails.address}
              </li>
              <li>
                <strong>Level:</strong> {confirmationDetails.level}
              </li>
              <li>
                <strong>Date:</strong> {confirmationDetails.dateOfBooking}
              </li>
              <li>
                <strong>Time:</strong> {confirmationDetails.timeOfBooking}
              </li>
              <li>
                <strong>Access Token:</strong> {confirmationDetails.accessToken}
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
