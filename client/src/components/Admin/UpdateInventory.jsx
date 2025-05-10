import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateInventory = () => {
  const { id } = useParams(); // Get inventory ID from the URL
  const navigate = useNavigate();
  const [inventory, setInventory] = useState({
    productName: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch inventory details based on the ID
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:7000/api/inventory/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setInventory(data);
        } else {
          console.error("Inventory item not found");
        }
      })
      .catch((error) => console.error("Error fetching inventory details:", error))
      .finally(() => setLoading(false));
  }, [id]);

  // Handle inventory update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:7000/api/update/inventory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inventory),
      });

      if (response.ok) {
        alert("Inventory updated successfully");
        navigate("/admin/inventory"); // Redirect back to inventory list
      } else {
        console.error("Failed to update inventory");
      }
    } catch (error) {
      console.error("Error updating inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventory((prevInventory) => ({
      ...prevInventory,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-2 border-green-500 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Update Inventory</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleUpdate}>
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 mb-1">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={inventory.productName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 mb-1">Category:</label>
            <select
              id="category"
              name="category"
              value={inventory.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 mb-1">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={inventory.quantity}
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
              value={inventory.price}
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
              value={inventory.supplier}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-1">Description:</label>
            <textarea
              id="description"
              name="description"
              value={inventory.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Inventory"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateInventory;
