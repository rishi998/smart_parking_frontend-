import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminAreaModify = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const location = useLocation();
  const admin = location.state?.admin;

  if(admin==null){
    <h4>Plese Log in First</h4>
  }

  const [formData, setFormData] = useState({
    areaName: '',
    address: '',
    levels: 1,
    slotsPerLevel: ['']
  });

  const navigate = useNavigate(); // Hook for navigating to different routes

  const fetchAreas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/area/allareas");
      setAreas(res.data.areas);
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to load areas.");
    }
  };

  const handleSelect = (area) => {
    setSelectedArea(area);
    setFormData({
      areaName: area.areaName,
      address: area.address,
      levels: area.levels,
      slotsPerLevel: [...area.slotsPerLevel]
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'levels') {
      const newLevelCount = parseInt(value, 10);
      const updatedSlots = [...formData.slotsPerLevel];

      if (newLevelCount > updatedSlots.length) {
        while (updatedSlots.length < newLevelCount) {
          updatedSlots.push('');
        }
      } else {
        updatedSlots.length = newLevelCount;
      }

      setFormData(prev => ({
        ...prev,
        levels: newLevelCount,
        slotsPerLevel: updatedSlots
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSlotChange = (index, value) => {
    const updatedSlots = [...formData.slotsPerLevel];
    updatedSlots[index] = value;
    setFormData(prev => ({
      ...prev,
      slotsPerLevel: updatedSlots
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedArea) return;

    const hasEmptySlot = formData.slotsPerLevel.some(slot => slot === '' || isNaN(Number(slot)));
    if (hasEmptySlot) {
      alert('Please enter a valid number of slots for each level.');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/area/updatearea/${selectedArea.id}`, formData);
      if (res.data.success) {
        alert("Area updated successfully!");
        fetchAreas();
        setSelectedArea(null);
      } else {
        alert("Update failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("An error occurred while updating.");
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Modify Parking Area</h2>

        {/* Back Button */}
        <button
          onClick={() => navigate('/admindashboard',{ state: { admin } })}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-xl mb-4"
        >
          Back to Dashboard
        </button>

        {!selectedArea ? (
          <ul>
            {areas.map(area => (
              <li key={area._id} className="flex justify-between items-center border-b py-3">
                <div>
                  <h3 className="text-lg font-medium">{area.areaName}</h3>
                  <p className="text-gray-600">{area.address}</p>
                </div>
                <button
                  onClick={() => handleSelect(area)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Area Name</label>
              <input
                type="text"
                name="areaName"
                value={formData.areaName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-xl"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border rounded-xl resize-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Number of Levels: {formData.levels}
              </label>
              <input
                type="range"
                name="levels"
                min="1"
                max="10"
                value={formData.levels}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {formData.slotsPerLevel.map((slots, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Slots on Level {index + 1}
                </label>
                <input
                  type="number"
                  value={slots}
                  onChange={(e) => handleSlotChange(index, e.target.value)}
                  min="0"
                  required
                  className="w-full px-4 py-2 border rounded-xl"
                />
              </div>
            ))}

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setSelectedArea(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminAreaModify;
