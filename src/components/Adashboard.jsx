import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Adashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // New state for selected user

  const location = useLocation();
  const admin = location.state?.admin;
  const navigate = useNavigate();

  const areas = ["Area 1", "Area 2", "Area 3","Area 4", "Area 5"];
  const locations = ["Location 1", "Location 2", "Location 3", "Location 4","Location 5","Location 6","Location 7",];
  const recentBookings = [
    {
      user: "John Doe",
      area: "Area 1",
      location: "Location 2",
      time: "10:30 AM",
    },
    {
      user: "Jane Smith",
      area: "Area 2",
      location: "Location 3",
      time: "9:45 AM",
    },
    {
      user: "Alex Johnson",
      area: "Area 3",
      location: "Location 1",
      time: "8:15 AM",
    },
    {
      user: "Alex Johnson",
      area: "Area 3",
      location: "Location 1",
      time: "8:15 AM",
    },
    {
      user: "Alex Johnson",
      area: "Area 3",
      location: "Location 1",
      time: "8:15 AM",
    },
    {
      user: "Alex Johnson",
      area: "Area 3",
      location: "Location 1",
      time: "8:15 AM",
    },
    {
      user: "Alex Johnson",
      area: "Area 3",
      location: "Location 1",
      time: "8:15 AM",
    },
    {
      user: "Alex Johnson",
      area: "Area 3",
      location: "Location 1",
      time: "8:15 AM",
    },
    {
      user: "Alex Johnson",
      area: "Area 3",
      location: "Location 1",
      time: "8:15 AM",
    },
  ];

  const usersData = [
    {
      name: "Alice Parker",
      email: "alice@example.com",
      gender: "Female",
      phone: "9876543210",
      car: "Honda Civic",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    {
      name: "Bob Marley",
      email: "bob@example.com",
      gender: "Male",
      phone: "8765432109",
      car: "Toyota Corolla",
      photo: "https://via.placeholder.com/100",
    },
    // Add more users as needed
  ];

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/adminlogin");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleDeleteArea = (area) => console.log("Delete", area);
  const handleSelectArea = (area) => setSelectedArea(area);
  const handleSelectLocation = (loc) => setSelectedLocation(loc);

  const resetSelections = () => {
    setSelectedArea(null);
    setSelectedLocation(null);
    setSelectedUser(null); // reset user profile view
  };

  const renderCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Location</h3>
        <p className="text-gray-700">
          {selectedArea && selectedLocation
            ? `${selectedArea} - ${selectedLocation}`
            : "Select an area and location"}
        </p>
      </div>
      <div className="bg-red-50 border border-red-200 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-red-700 mb-2">
          Booked Slots
        </h3>
        <p className="text-gray-700">34 / 50 slots</p>
      </div>
      <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-green-700 mb-2">
          Available Slots
        </h3>
        <p className="text-gray-700">16 slots available</p>
      </div>
      <div className="col-span-full flex justify-between mt-4">
        <button
          onClick={() => setSelectedLocation(null)}
          className="px-4 py-2 bg-yellow-400 text-white rounded"
        >
          Back
        </button>
        <button
          onClick={resetSelections}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );

  if (!admin || !admin.name) return <p>Please Log In.</p>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 h-screen fixed top-0 left-0 shadow-lg z-50">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          ParkerPro
        </div>
        <nav className="mt-6 space-y-2 px-4">
          <button
            className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            onClick={() => setActivePage("myslots")}
          >
            My Slots
          </button>
          <button
            className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            onClick={() => setActivePage("users")}
          >
            Users
          </button>
          <button
            className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            onClick={() => setActivePage("charts")}
          >
            Charts
          </button>
          <button
            className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            onClick={() => setActivePage("recent")}
          >
            Recent Bookings
          </button>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>

      <div className="flex-1 ml-64">
        <nav className="bg-gray-800 text-white flex justify-between items-center p-4 fixed top-0 left-64 right-0 z-40">
          <div className="flex flex-col">
            <div className="text-sm flex-wrap w-2xs">
              Modify anything! Add areas! Add locations! Supervise users! and
              many more!
            </div>
          </div>
          <h1 className="text-3xl font-bold mr-60">DASHBOARD</h1>
          <div className="flex flex-col items-end">
            <button onClick={toggleSidebar} className="p-2 rounded-lg">
              <img
                src="./src/assets/images/user.png"
                alt="user"
                className="h-8 w-8"
              />
            </button>
            <span className="mt-1 font-semibold text-lg">{admin.name}</span>
          </div>
        </nav>

        <section className="text-center pt-32 pb-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex flex-row space-x-4 justify-center">
            <button
              onClick={() => setActivePage("myslots")}
              className="bg-white text-red-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-200"
            >
              My Areas
            </button>
            <button
              onClick={() => setActivePage("recent")}
              className="bg-white text-red-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-200"
            >
              Recent Bookings
            </button>
            <button
              onClick={() => setActivePage("users")}
              className="bg-white text-red-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-200"
            >
              Users
            </button>
            <button
              onClick={() => setActivePage("charts")}
              className="bg-white text-red-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-200"
            >
              Charts
            </button>
          </div>
        </section>

        <section className="w-full bg-white py-6 px-4 shadow-sm rounded-xl">
          <div className="max-w-5xl mx-auto">
            {activePage === "dashboard" && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Search for Slots!
                </h2>
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search by location..."
                    value={query}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg
                    className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                    />
                  </svg>
                </div>
                {selectedArea && selectedLocation && renderCards()}
              </>
            )}

            {activePage === "myslots" && (
              <>
                {!selectedArea && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {areas.map((area) => (
                      <div
                        key={area}
                        className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg cursor-pointer"
                        onClick={() => handleSelectArea(area)}
                      >
                        <h3 className="text-xl font-semibold text-blue-600">
                          {area}
                        </h3>
                      </div>
                    ))}
                  </div>
                )}
                {selectedArea && !selectedLocation && (
                  <div>
                    <div className="flex justify-between mb-4">
                      <button
                        onClick={() => setSelectedArea(null)}
                        className="px-4 py-2 bg-yellow-400 text-white rounded"
                      >
                        Back
                      </button>
                      <button
                        onClick={resetSelections}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Close
                      </button>
                    </div>
                    <h2 className="text-xl font-bold mb-2">
                      Locations in {selectedArea}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {locations.map((loc) => (
                        <div
                          key={loc}
                          className="bg-white border p-4 rounded shadow hover:shadow-md cursor-pointer"
                          onClick={() => handleSelectLocation(loc)}
                        >
                          <h3 className="text-lg font-medium text-blue-700">
                            {loc}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedArea && selectedLocation && renderCards()}
              </>
            )}

            {activePage === "users" && (
              <>
                {!selectedUser ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {usersData.map((user, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg cursor-pointer flex flex-col items-center"
                        onClick={() => setSelectedUser(user)}
                      >
                        <img
                          src={user.photo}
                          alt={user.name}
                          className="rounded-full h-20 w-20 mb-2"
                        />
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow text-center max-w-md mx-auto space-y-3">
                    <img
                      src={selectedUser.photo}
                      alt={selectedUser.name}
                      className="rounded-full h-24 w-24 mx-auto"
                    />
                    <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
                    <p>Email: {selectedUser.email}</p>
                    <p>Gender: {selectedUser.gender}</p>
                    <p>Phone: {selectedUser.phone}</p>
                    <p>Car: {selectedUser.car}</p>
                    <div className="flex justify-between mt-6">
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="px-4 py-2 bg-yellow-400 text-white rounded"
                      >
                        Back
                      </button>
                      <button
                        onClick={resetSelections}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {activePage === "charts" && (
              <div className="flex flex-col items-center space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Top Booking Areas
                </h2>
                {(() => {
                  const bookingCounts = {};

                  recentBookings.forEach(({ area, location }) => {
                    const key = `${area} - ${location}`;
                    bookingCounts[key] = (bookingCounts[key] || 0) + 1;
                  });

                  const sortedBookings = Object.entries(bookingCounts).sort(
                    (a, b) => b[1] - a[1]
                  );

                  return sortedBookings.map(([key, count], index) => (
                    <div
                      key={index}
                      className="bg-white border border-blue-300 shadow-md rounded-lg px-6 py-4 w-96 text-center"
                    >
                      <h3 className="text-xl font-semibold text-blue-800 mb-1">
                        {key}
                      </h3>
                      <p className="text-gray-700 font-medium">
                        Bookings: {count}
                      </p>
                    </div>
                  ));
                })()}
              </div>
            )}

            {activePage === "recent" && (
              <div className="space-y-6">
                {recentBookings.map((booking, idx) => (
                  <div
                    key={idx}
                    className="relative bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-lg shadow transform rotate-1"
                  >
                    <div className="border-l-8 border-blue-500 pl-4">
                      <p className="text-gray-800 font-semibold">
                        <span className="text-blue-700">{booking.user}</span>{" "}
                        made a booking at{" "}
                        <span className="text-blue-700">{booking.area}</span> on{" "}
                        <span className="text-blue-700">
                          {booking.location}
                        </span>{" "}
                        at <span className="text-blue-700">{booking.time}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Adashboard;
