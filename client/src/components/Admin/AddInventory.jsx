import React, { useState } from 'react';

const AddInventory = () => {
  const [formData, setFormData] = useState({
    inventoryname: '',
    inventorytype: '',
    quantity: '',
    price: '', // Price as a string initially, but we'll send it as a number
    supplier: '',
    expierydate: '', // Expiry date as string, format the date properly
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert price to a number
    const updatedFormData = {
      ...formData,
      price: parseFloat(formData.price), // Convert price to number
      expierydate: new Date(formData.expierydate).toISOString(), // Ensure expierydate is a valid ISO string
    };

    try {
      const response = await fetch('http://localhost:7000/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        // Reset form after successful submission
        setFormData({
          inventoryname: '',
          inventorytype: '',
          quantity: '',
          price: '',
          supplier: '',
          expierydate: '',
        });
        alert('Inventory item added successfully!');
      } else {
        alert('Failed to add inventory item');
      }
    } catch (error) {
      console.error('Error adding inventory item:', error);
      alert('An error occurred while adding the inventory item');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-2 border-green-500 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Add New Inventory Item</h2>

      <form onSubmit={handleSubmit}>
        {/* Inventory Name */}
        <div className="mb-4">
          <label htmlFor="inventoryname" className="block text-gray-700 mb-1">Inventory Name:</label>
          <input
            type="text"
            id="inventoryname"
            name="inventoryname"
            value={formData.inventoryname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Inventory Type */}
        <div className="mb-4">
          <label htmlFor="inventorytype" className="block text-gray-700 mb-1">Inventory Type:</label>
          <select
            id="inventorytype"
            name="inventorytype"
            value={formData.inventorytype}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select Inventory Type</option>
            <option value="Seeds">Seeds</option>
            <option value="Herb">Herb</option>
            <option value="Shrub">Shrub</option>
            <option value="Tree">Tree</option>
            <option value="Flower">Flower</option>
          </select>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 mb-1">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 mb-1">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Supplier */}
        <div className="mb-4">
          <label htmlFor="supplier" className="block text-gray-700 mb-1">Supplier:</label>
          <input
            type="text"
            id="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Expiry Date */}
        <div className="mb-4">
          <label htmlFor="expierydate" className="block text-gray-700 mb-1">Expiry Date:</label>
          <input
            type="date"
            id="expierydate"
            name="expierydate"
            value={formData.expierydate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddInventory;
