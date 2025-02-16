import React from 'react';

const MyBookings = () => {
  const bookings = [
    {
      id: 'B1',
      spot: 'Spot 1',
      location: 'Downtown Parking Garage',
      date: '2025-02-14',
      time: '10:00 AM - 12:00 PM',
      paymentStatus: 'Paid',
      bookingStatus: 'Confirmed',
    },
    {
      id: 'B2',
      spot: 'Spot 2',
      location: 'City Center Parking Lot',
      date: '2025-02-18',
      time: '2:00 PM - 4:00 PM',
      paymentStatus: 'Pending',
      bookingStatus: 'Pending',
    },
    {
      id: 'B3',
      spot: 'Spot 3',
      location: 'Airport Parking',
      date: '2025-02-20',
      time: '5:00 PM - 7:00 PM',
      paymentStatus: 'Paid',
      bookingStatus: 'Confirmed',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-5 bg-gray-50 rounded-lg shadow-md text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">My Parking Bookings</h2>
      <p className="text-gray-600 mb-8">
        View your current and past parking bookings, including location, time, and payment status.
      </p>

      <div className="flex flex-col gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-6 rounded-lg shadow-sm text-left"
          >
            {/* Booking Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {booking.spot} at {booking.location}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.bookingStatus === 'Confirmed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                {booking.bookingStatus}
              </span>
            </div>

            {/* Booking Details */}
            <div className="text-gray-600 space-y-2">
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Time:</strong> {booking.time}
              </p>
              <p>
                <strong>Payment Status:</strong> {booking.paymentStatus}
              </p>
            </div>

            {/* Booking Actions */}
            <div className="mt-6 flex gap-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                View Details
              </button>
              {booking.bookingStatus === 'Confirmed' && (
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;