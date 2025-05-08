import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Edit as EditIcon, Trash as TrashIcon } from "lucide-react";
import AdminAreaAdd from "./Adminareaadd";
import AdminAreaModify from "./Adminareamodify";
import axios from "axios";
import { Eye as EyeIcon, CheckCircle as CheckCircleIcon } from "lucide-react";

const Adashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModify, setShowModify] = useState(false);
  const [users, setUsers] = useState([]);

  const [activePage, setActivePage] = useState("dashboard");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [areas, setAreas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const location = useLocation();
  const admin = location.state?.admin;
  const navigate = useNavigate();
  const locations = selectedArea?.locations || [];

  const DashboardDropdown = ({ areas, onSelect }) => {
    return (
      <div className="relative mb-6">
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="">Select a parking area...</option>
          {areas.map((area) => (
            <option key={area._id} value={area._id}>
              {area.areaName} - {area.address}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    );
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/bookings/allbookings");
      if (response.data.success) {
        console.log(response.data.bookings)
        setBookings(response.data.bookings);
        setFilteredBookings(response.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activePage === "managebookings") {
      fetchBookings();
    }
  }, [activePage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/users");
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAreas();
    if (activePage === "manageusers") {
      fetchUsers();
    }
  }, [activePage]);

  const fetchAreas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/area/allareas");
      if (response.data.success) {
        setAreas(response.data.areas);
      } else {
        console.error("Failed to fetch areas");
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  const handleVerifyUser = async (userId) => {
    try {
      await axios.patch(
        `http://localhost:5000/auth/getallusers/users/verify/${userId}`
      );
      setUsers(
        users.map((u) => (u._id === userId ? { ...u, isverified: true } : u))
      );
    } catch (err) {
      console.error("Error verifying user:", err);
    }
  };

  const handleSearchBookings = () => {
    const filtered = bookings.filter(
      (booking) =>
        booking.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking._id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sorted = [...filteredBookings].sort((a, b) => {
      const dateA = new Date(a.dateOfBooking);
      const dateB = new Date(b.dateOfBooking);
      return option === "newest" ? dateB - dateA : dateA - dateB;
    });
    setFilteredBookings(sorted);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `http://localhost:5000/auth/getallusers/users/${userId}`
        );
        setUsers(users.filter((u) => u._id !== userId));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleDeleteArea = async (area) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${area.areaName}"?`
    );
    if (!confirmed) return;
  
    console.log(area)
    try {
      const res = await axios.delete(
        `http://localhost:5000/area/deletearea/${area.id}`,  // Changed from area._id to area.id
        {
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if needed
            // 'Authorization': `Bearer ${token}`
          }
        }
      );
  
      if (res.data.success) {
        alert("Area deleted successfully!");
        fetchAreas(); // Refresh the areas list
      } else {
        alert(res.data.message || "Failed to delete area.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert(
        error.response?.data?.message ||
        "An error occurred while deleting the area."
      );
    }
  };

  const handleCloseModal = () => {
    setShowModify(false);
    setSelectedArea(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/adminlogin", { state: null, replace: true });
    window.location.reload();
  };

  const handleAddArea = () => {
    setShowAddModal(true);
  };

  const handleEditArea = () => {
    navigate("/modifyarea", { state: { admin } });
  };

  const handleModalClose = () => {
    setShowAddModal(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const resetSelections = () => {
    setSelectedArea(null);
    setSelectedLocation(null);
    setSelectedUser(null);
  };

  const BookingCard = ({ booking }) => {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const bookingIdParts = booking._id.split("-");
    const spotNumber = bookingIdParts[1] || booking.slotNumber;

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-blue-600">
              {booking.area} - {spotNumber}
            </h3>
            <p className="text-gray-600">
              Level: {booking.level}, {booking.address}
            </p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              booking.isVerified
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {booking.isVerified ? "Verified" : "Pending"}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-gray-500">User</p>
            <p className="font-medium">{booking.username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Booking Date</p>
            <p className="font-medium">
              {formatDate(booking.dateOfBooking)} at {booking.timeOfBooking}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="font-medium">{formatDate(booking.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Access Token</p>
            <p className="font-medium text-xs truncate">
              {booking.accessToken}
            </p>
          </div>
        </div>

        <div className="mt-3 flex justify-end space-x-2">
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
            {booking.isVerified ? "Unverify" : "Verify"}
          </button>
          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Location</h3>
        <p className="text-gray-700">
          {selectedArea && selectedLocation
            ? `${selectedArea.areaName} - ${selectedLocation}`
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
            className={`block w-full text-left py-2 px-3 rounded ${
              activePage === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActivePage("dashboard");
              resetSelections();
            }}
          >
            Dashboard
          </button>
          <button
            className={`block w-full text-left py-2 px-3 rounded ${
              activePage === "managebookings" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActivePage("managebookings")}
          >
            Manage Bookings
          </button>
          <button
            className={`block w-full text-left py-2 px-3 rounded ${
              activePage === "manageusers" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActivePage("manageusers")}
          >
            Manage Users
          </button>
          <button
            className={`block w-full text-left py-2 px-3 rounded ${
              activePage === "manageareas" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActivePage("manageareas")}
          >   
            Manage Areas
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

        <section className="w-full bg-white py-6 px-4 shadow-sm rounded-xl mt-30">
          <div className="max-w-5xl mx-auto">
            {activePage === "dashboard" && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Parking Area Management
                  </h2>
                  <div className="flex space-x-4">
                    <button
                      onClick={resetSelections}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {!selectedArea ? (
                  <DashboardDropdown 
                    areas={areas}
                    onSelect={(areaId) => {
                      const selected = areas.find(a => a.id === areaId);
                      if (selected) setSelectedArea(selected);
                    }}
                  />
                ) : !selectedLocation ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setSelectedArea(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      >
                        Back
                      </button>
                      <h3 className="text-lg font-medium">
                        Select a location in {selectedArea.areaName}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedArea.locations.map((location) => (
                        <div
                          key={location}
                          className="bg-white border p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition-all"
                          onClick={() => setSelectedLocation(location)}
                        >
                          <h4 className="font-medium text-blue-600">{location}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {selectedArea.address}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  renderCards()
                )}
              </>
            )}

            {activePage === "manageareas" && (
              <>
                {!selectedArea && (
                  <>
                    <div className="flex justify-end mb-4 space-x-6">
                      <button
                        onClick={handleAddArea}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Add Area
                      </button>
                      <button
                        onClick={handleEditArea}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Modify Area
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {areas.map((area) => (
                        <div
                          key={area._id}
                          className="relative bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg cursor-pointer"
                        >
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteArea(area);
                              }}
                            >
                              <TrashIcon className="w-4 h-4 text-red-600 hover:text-red-800" />
                            </button>
                          </div>

                          <div onClick={() => setSelectedArea(area)}>
                            <h3 className="text-xl font-semibold text-blue-600">
                              {area.areaName}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {area.address}
                            </p>
                            <p className="text-gray-700 text-sm mt-2">
                              <span className="font-medium">No. of Levels:</span>{" "}
                              {area.levels}
                            </p>
                            <p className="text-gray-700 text-sm">
                              <span className="font-medium">Slots per level:</span>{" "}
                              {area.slotsPerLevel.join(", ")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {showModify && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-4xl relative">
                      <button
                        onClick={() => setShowModify(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                      <AdminAreaModify
                        selectedArea={selectedArea}
                        onClose={handleCloseModal}
                      />
                    </div>
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
                      Locations in {selectedArea.areaName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {locations.map((loc) => (
                        <div
                          key={loc}
                          className="bg-white border p-4 rounded shadow hover:shadow-md cursor-pointer"
                          onClick={() => setSelectedLocation(loc)}
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

                {showAddModal && (
                  <AdminAreaAdd
                    onClose={handleModalClose}
                    onAreaAdded={() => {
                      fetchAreas();
                      handleModalClose();
                    }}
                  />
                )}
              </>
            )}

            {activePage === "managebookings" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Manage Bookings
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearchBookings()}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <svg
                        className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <button
                      onClick={handleSearchBookings}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Search
                    </button>
                    <div className="relative">
                      <select
                        value={sortOption}
                        onChange={(e) => handleSort(e.target.value)}
                        className="appearance-none pl-3 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setFilteredBookings(bookings);
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : filteredBookings.length > 0 ? (
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <BookingCard key={booking._id} booking={booking} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 text-lg">
                      {searchQuery
                        ? "No bookings match your search"
                        : "No bookings found"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activePage === "manageusers" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Registered Users
                  </h2>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Search users by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const filtered = users.filter(user =>
                            user.name.toLowerCase().includes(searchQuery.toLowerCase())
                          );
                          setFilteredUsers(filtered);
                        }
                      }}
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg
                      className="absolute left-3 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <button
                      onClick={() => {
                        const filtered = users.filter(user =>
                          user.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        setFilteredUsers(filtered);
                      }}
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Search
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-left">Phone</th>
                        <th className="py-3 px-4 text-left">Verified</th>
                        <th className="py-3 px-4 text-left">Joined</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {(searchQuery ? filteredUsers : users).map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="py-4 px-4">{user.id}</td>
                          <td className="py-4 px-4 font-medium">{user.name}</td>
                          <td className="py-4 px-4">{user.email}</td>
                          <td className="py-4 px-4">{user.phone}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                user.isVerified
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.isVerified ? "Verified" : "Not Verified"}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewUser(user)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                title="View Details"
                              >
                                <EyeIcon className="w-5 h-5" />
                              </button>
                              {!user.isVerified && (
                                <button
                                  onClick={() => handleVerifyUser(user._id)}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded"
                                  title="Verify User"
                                >
                                  <CheckCircleIcon className="w-5 h-5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                title="Delete User"
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {selectedUser && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">User Details</h3>
                        <button
                          onClick={() => setSelectedUser(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-600">ID:</p>
                          <p className="font-medium text-sm break-all">
                            {selectedUser._id}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Name:</p>
                          <p className="font-medium">{selectedUser.name}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Email:</p>
                          <p className="font-medium">{selectedUser.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Phone:</p>
                          <p className="font-medium">{selectedUser.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Status:</p>
                          <p
                            className={`font-medium ${
                              selectedUser.isVerified
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {selectedUser.isVerified
                              ? "Verified"
                              : "Not Verified"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Joined On:</p>
                          <p className="font-medium">
                            {new Date(selectedUser.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Adashboard;