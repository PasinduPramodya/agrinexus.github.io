import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7000/api/getall")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.inquiries)) {
          setInquiries(data.inquiries);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching inquiries:", error));
  }, []);

  // Navigate to Add Inquiry Reply
  const handleAddInquiryReply = () => {
    navigate("/admin/allInquiries/add-inquiriyreply");
  };

  // Navigate to Update Inquiry
  const handleUpdateInquiry = (id) => {
    navigate(`/admin/inquiry/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      setLoading(true);
      try {
        // Update the URL to match your delete route
        const response = await fetch(`http://localhost:7000/api/inquiry/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setInquiries(inquiries.filter((inq) => inq._id !== id));
        } else {
          console.error("Failed to delete inquiry");
        }
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReply = (id) => {
    navigate(`/addInquiry/${id}`);
  };

  const filteredInquiries = inquiries.filter((inq) =>
    inq.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.plantName?.toLowerCase().includes(searchTerm.toLowerCase())  // Added plantName filter here
  );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Inquiries</h2>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Name, Email, or Plant"
          className="px-4 py-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Plant Name</th>
              <th className="border border-gray-300 px-4 py-2">Customer Name</th>
              <th className="border border-gray-300 px-4 py-2">Customer Email</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
              <th className="border border-gray-300 px-4 py-2">Reply Message</th>
              <th className="border border-gray-300 px-4 py-2">Reply</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inq) => (
                <tr key={inq._id}>
                  <td className="border border-gray-300 px-4 py-2">{inq.plantName}</td>
                  <td className="border border-gray-300 px-4 py-2">{inq.customerName}</td>
                  <td className="border border-gray-300 px-4 py-2">{inq.customerEmail}</td>
                  <td className="border border-gray-300 px-4 py-2">{inq.message}</td>
                  <td className="border border-gray-300 px-4 py-2">{inq.reply || "No reply yet"}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleAddInquiryReply(inq._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Reply
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateInquiry(inq._id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(inq._id)}
                        disabled={loading}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        {loading ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllInquiries;
