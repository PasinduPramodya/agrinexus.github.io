import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:7000/api/getAllOrder")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched orders:", data);  // Check this
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Invalid order data format", data);
        }
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // Delete an order
  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:7000/api/orders/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setOrders(orders.filter((order) => order._id !== id));
        } else {
          console.error("Failed to delete order");
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Generate PDF report
  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.text("Order Report", 14, 16);

    const tableColumn = [
      "Order ID", "Customer", "Total", "Status", "Order Date"
    ];

    const tableRows = orders.map((order) => [
      order.order_id,
      order.customer_name || "N/A",
      order.total_amount,
      order.order_status,
      new Date(order.order_date).toLocaleDateString(),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [34, 197, 94] },
    });

    doc.save("Order_Report.pdf");
  };

  // Filtered orders based on search term
  const filteredOrders = orders.filter((order) =>
    order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order Management</h2>
        <button
          onClick={handleGenerateReport}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors border border-blue-700"
        >
          Generate Report (PDF)
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Customer Name"
          className="px-4 py-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Customer</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Order Date</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td className="border border-gray-300 px-4 py-2">{order.order_id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.customer_name}</td>
                <td className="border border-gray-300 px-4 py-2">{order.total_amount}</td>
                <td className="border border-gray-300 px-4 py-2">{order.order_status}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(order.order_date).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    disabled={loading}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
