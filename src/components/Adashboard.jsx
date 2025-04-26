import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, replace } from "react-router-dom";
import { Edit as EditIcon, Trash as TrashIcon } from "lucide-react";
import AdminAreaAdd from "./Adminareaadd"; // Adjust path if needed
import AdminAreaModify from "./Adminareamodify";
import axios from "axios";
import { Eye as EyeIcon, CheckCircle as CheckCircleIcon} from 'lucide-react';

const Adashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModify, setShowModify] = useState(false);
  const [users, setUsers] = useState([]);

  const [activePage, setActivePage] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // New state for selected user
  const [showAddModal, setShowAddModal] = useState(false);
  const [areas, setAreas] = useState([]);

  const location = useLocation();
  const admin = location.state?.admin;
  const navigate = useNavigate();
  const locations = selectedArea?.locations || [];

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
  ];
  const [formData, setFormData] = useState({
    areaName: "",
    address: "",
    levels: 1,
    slotsPerLevel: [""],
  });

  const handleInputChange = (e) => setQuery(e.target.value);
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
  useEffect(() => {
    fetchAreas();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/getallusers/users');
        setUsers(res.data.users);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);
  const handleViewUser = (user) => setSelectedUser(user);

const handleVerifyUser = async (userId) => {
  try {
    await axios.patch(`http://localhost:5000/auth/getallusers/users/verify/${userId}`);
    setUsers(users.map(u => u._id === userId ? {...u, isVerified: true} : u));
  } catch (err) {
    console.error('Error verifying user:', err);
  }
};

const handleDeleteUser = async (userId) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    try {
      await axios.delete(`http://localhost:5000/auth/getallusers/users/${userId}`);
      setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  }
};
  
  const handleDeleteArea = async (area) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${area.areaName}?`
    );
    if (!confirmed) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/area/deletearea/${area._id}`
      );
      if (res.data.success) {
        alert("Area deleted successfully!");
        fetchAreas(); // refresh UI immediately
      } else {
        alert("Failed to delete area.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("An error occurred while deleting.");
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
            className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            onClick={() => setActivePage("managebookings")}
          >
            Manage Bookings
          </button>
          <button
            className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
            onClick={() => setActivePage("manageusers")}
          >
            Manage Users
          </button>
          <button
            className="block w-full text-left py-2 px-3 rounded hover:bg-gray-700"
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

        <section className="text-center pt-32 pb-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex flex-row space-x-4 justify-center">
            <button
              onClick={() => setActivePage("manageareas")}
              className="bg-white text-red-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-200"
            >
              My Areas
            </button>
            <button
              onClick={() => setActivePage("managebookings")}
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

            {activePage === "manageareas" && (
              <>
                {!selectedArea && (
                  <>
                    {/* Add Area button */}
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

                    {/* Area cards */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {areas.map((area) => (
                        <div
                          key={area._id}
                          className="relative bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg cursor-pointer"
                        >
                          {/* Delete Icon */}
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteArea(area); // now it deletes from DB and updates UI
                              }}
                            >
                              <TrashIcon className="w-4 h-4 text-red-600 hover:text-red-800" />
                            </button>
                          </div>

                          <div onClick={() => handleSelectArea(area)}>
                            <h3 className="text-xl font-semibold text-blue-600">
                              {area.areaName}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {area.address}
                            </p>
                            <p className="text-gray-700 text-sm mt-2">
                              <span className="font-medium">
                                {" "}
                                No. of Levels:
                              </span>{" "}
                              {area.levels}
                            </p>
                            <p className="text-gray-700 text-sm">
                              <span className="font-medium">
                                Slots per level:
                              </span>{" "}
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

                {/* Show Modal */}
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
            {activePage === "managebookings" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Registered Users
                  </h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search users..."
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
                      {users.map((user) => (
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
                              <button
                                onClick={() => handleVerifyUser(user._id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded"
                                title="Verify User"
                              >
                                <CheckCircleIcon className="w-5 h-5" />
                              </button>
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

                {/* User Detail Modal */}
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
