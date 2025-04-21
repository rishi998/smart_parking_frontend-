import React, { useState } from 'react';
import axios from 'axios';
const AdminAreaAdd = ({ onClose, onAreaAdded }) => {
  const [formData, setFormData] = useState({
    areaName: '',
    address: '',
    levels: 1,
    slotsPerLevel: [''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'levels') {
      const newLevelCount = parseInt(value, 10);
      const updatedSlots = [...formData.slotsPerLevel];

      // Trim or extend the slotsPerLevel array based on level count
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

    const hasEmptySlot = formData.slotsPerLevel.some(slot => slot === '' || isNaN(Number(slot)));
    if (hasEmptySlot) {
      alert('Please enter valid slots for each level.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/area/addarea', formData);
      if (response.data.success) {
        alert('Area successfully added!');
        onAreaAdded(); // trigger parent refresh
        setFormData({ areaName: '', address: '', levels: 1, slotsPerLevel: [''] });
      } else {
        alert('Failed: ' + response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while adding the area.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
      {/* Close button top-left */}
      <button
        className="absolute top-2 left-2 text-gray-600 hover:text-red-500 text-lg"
        onClick={onClose}
      >
        ✕
      </button>

      <h2 className="text-2xl font-semibold text-center mb-6">Add New Parking Area</h2>

      <form onSubmit={handleSubmit}>
        {/* Area Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Area Name</label>
          <input
            name="areaName"
            value={formData.areaName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={2}
            required
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        {/* Levels */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Number of Levels: {formData.levels}</label>
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

        {/* Slots Per Level */}
        {formData.slotsPerLevel.map((slots, index) => (
          <div key={index} className="mb-4">
            <label className="block font-medium mb-1">Slots on Level {index + 1}</label>
            <input
              type="number"
              value={slots}
              onChange={(e) => handleSlotChange(index, e.target.value)}
              className="w-full px-4 py-2 border rounded-xl"
              min="0"
              required
            />
          </div>
        ))}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-xl hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminAreaAdd;
