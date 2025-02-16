import React, { useState } from 'react';

const BookParking = () => {
  const [selectedSpot, setSelectedSpot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  const parkingSpots = [
    { id: 'Spot 1', status: 'available' },
    { id: 'Spot 2', status: 'available' },
    { id: 'Spot 3', status: 'available' },
    { id: 'Spot 4', status: 'available' },
  ];

  const handleSpotSelect = (spot) => {
    if (spot.status === 'available') {
      setSelectedSpot(spot.id);
    }
  };

  const handleBooking = () => {
    if (!selectedSpot || !selectedDate || !selectedTime) {
      setBookingStatus('Please select all fields!');
      return;
    }

    // Simulate booking process
    setBookingStatus(`Booking confirmed for ${selectedSpot} on ${selectedDate} at ${selectedTime}.`);
  };

  return (
    <div className="max-w-4xl mx-auto p-5 bg-lime-200 rounded-lg shadow-md text-center mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Your Parking Spot</h2>
      <p className="text-gray-600 mb-6">Select a parking spot, choose a date and time, and confirm your booking.</p>

      {/* Parking Spots Grid */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {parkingSpots.map((spot) => (
          <div
            key={spot.id}
            className={`w-32 h-32 flex items-center justify-center text-lg font-semibold rounded-lg border-2 transition-all duration-300 ${
              selectedSpot === spot.id
                ? 'bg-green-500 text-white border-green-600'
                : spot.status === 'booked'
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 cursor-pointer'
            }`}
            onClick={() => handleSpotSelect(spot)}
          >
            {spot.id}
            {spot.status === 'booked' && (
              <span className="block text-xs text-red-600 mt-1">Booked</span>
            )}
          </div>
        ))}
      </div>

      {/* Date and Time Selection */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
        />
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Book Button */}
      <button
        className={`w-full py-2 px-4 text-black font-semibold rounded-lg transition-all duration-300 ${
          !selectedSpot || !selectedDate || !selectedTime
            ? 'bg-green-200 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600'
        }`}
        disabled={!selectedSpot || !selectedDate || !selectedTime}
        onClick={handleBooking}
      >
        Book Spot
      </button>

      {/* Booking Status */}
      {bookingStatus && (
        <p className="mt-4 text-green-600 font-semibold">{bookingStatus}</p>
      )}
    </div>
  );
};

export default BookParking;