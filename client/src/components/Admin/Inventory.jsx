import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const InventoryManagement = () => {
  const [inventories, setInventories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch inventories from the backend
  useEffect(() => {
    fetch("http://localhost:7000/api/") // Changed endpoint to match your inventory model
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInventories(data);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching inventories:", error));
  }, []);

  // Navigate to Add Inventory
  const handleAddInventory = () => {
    navigate("/admin/inventories/add-inventory");
  };

  // Navigate to Update Inventory
  const handleUpdateInventory = (id) => {
    navigate(`/admin/inventories/update-inventory/${id}`);
  };

  // Delete an inventory item
  const handleDeleteInventory = async (id) => {
    if (window.confirm("Are you sure you want to delete this inventory item?")) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:7000/api/delete/inventory/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setInventories(inventories.filter((inventory) => inventory._id !== id));
        } else {
          console.error("Failed to delete inventory item");
        }
      } catch (error) {
        console.error("Error deleting inventory item:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Generate PDF Report
  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.text("Inventory Report", 14, 16);

    const tableColumn = [
      "Inventory Name", "Inventory Type", "Quantity", "Price", "Supplier", "Expiry Date"
    ];

    const tableRows = inventories.map((inventory) => [
      inventory.inventoryname,
      inventory.inventorytype,
      inventory.quantity,
      inventory.price,
      inventory.supplier,
      inventory.expierydate,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [34, 197, 94] },
    });

    doc.save("Inventory_Report.pdf");
  };

  // Filter inventories by search term
  const filteredInventories = inventories.filter((inventory) =>
    inventory.inventoryname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button
            onClick={handleAddInventory}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors border border-green-700"
          >
            Add New Inventory
          </button>
          <button
            onClick={handleGenerateReport}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors border border-blue-700"
          >
            Generate Report (PDF)
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Inventory Name"
          className="px-4 py-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Inventory Name</th>
              <th className="border border-gray-300 px-4 py-2">Inventory Type</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Supplier</th>
              <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventories.map((inventory) => (
              <tr key={inventory._id}>
                <td className="border border-gray-300 px-4 py-2">{inventory.inventoryname}</td>
                <td className="border border-gray-300 px-4 py-2">{inventory.inventorytype}</td>
                <td className="border border-gray-300 px-4 py-2">{inventory.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">{inventory.price}</td>
                <td className="border border-gray-300 px-4 py-2">{inventory.supplier}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(inventory.expierydate).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateInventory(inventory._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteInventory(inventory._id)}
                      disabled={loading}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;
