import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAreaDelete = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAreas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/area/allareas"); // You'll add this route below
      setAreas(res.data.areas);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to load areas.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this area?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/area/deletearea/${id}`);
      if (res.data.success) {
        alert("Area deleted successfully!");
        fetchAreas(); // refresh list
      } else {
        alert("Failed to delete area.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("An error occurred while deleting.");
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Delete Parking Area</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : areas.length === 0 ? (
          <p className="text-center">No areas found.</p>
        ) : (
          <ul>
            {areas.map((area) => (
              <li
                key={area._id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <h3 className="text-lg font-medium">{area.areaName}</h3>
                  <p className="text-gray-600">{area.address}</p>
                  <p className="text-sm text-gray-400">Levels: {area.levels}</p>
                </div>
                <button
                  onClick={() => handleDelete(area._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminAreaDelete;
