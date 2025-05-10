import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:7000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Invalid data:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Navigate to Add Product
  const handleAddProduct = () => {
    navigate("/admin/products/add-product"); // Replace with actual route
  };

  // Navigate to Update Product
  const handleUpdateProduct = (id) => {
    navigate(`/admin/products/update/${id}`); // Replace with actual route
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:7000/api/delete/product/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setProducts(products.filter((product) => product._id !== id));
        } else {
          console.error("Failed to delete product");
        }
      } catch (err) {
        console.error("Delete error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Generate PDF report
  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.text("Product Report", 14, 16);

    const tableColumn = ["Name", "Category", "Quantity", "Price"];
    const tableRows = products.map((product) => [
      product.name,
      product.category,
      product.quantity,
      product.price,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [34, 197, 94] },
    });

    doc.save("Product_Report.pdf");
  };

  // Filter products by name
  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors border border-green-700"
          >
            Add New Product
          </button>
          <button
            onClick={handleGenerateReport}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors border border-blue-700"
          >
            Generate Report (PDF)
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Product Name"
          className="px-4 py-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateProduct(product._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      disabled={loading}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
