import React, { useState } from 'react';

const AddInquiryReply = () => {
    const [formData, setFormData] = useState({
        inquiryId: '',     // Make sure this is filled with the correct ID
        reply: '',
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

        try {
            const response = await fetch('http://localhost:7000/api/respond', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inquiryId: formData.inquiryId,
                    responseMessage: formData.reply,
                }),
            });

            if (response.ok) {
                setFormData({
                    inquiryId: '',
                    reply: '',
                });
                alert('Inquiry reply submitted successfully!');
            } else {
                alert('Failed to submit reply.');
            }
        } catch (error) {
            console.error('Error submitting reply:', error);
            alert('An error occurred while submitting the reply');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white border-2 border-green-500 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Add Inquiry Reply</h2>

            <form onSubmit={handleSubmit}>
                {/* Inquiry ID */}
                <div className="mb-4">
                    <label htmlFor="inquiryId" className="block text-gray-700 mb-1">Inquiry ID:</label>
                    <input
                        type="text"
                        id="inquiryId"
                        name="inquiryId"
                        value={formData.inquiryId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                {/* Reply message */}
                <div className="mb-4">
                    <label htmlFor="reply" className="block text-gray-700 mb-1">Reply Message:</label>
                    <textarea
                        id="reply"
                        name="reply"
                        value={formData.reply}
                        onChange={handleChange}
                        rows="6"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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

export default AddInquiryReply;
