import React, { useState } from 'react';

const AddPayment = () => {
    const [formData, setFormData] = useState({
        cdholdername: '',
        cdtype: 'Visa', // Default card type
        bank: 'Sampath Bank', // Default bank
        cdnum: '',
        cvv: '',
        exdate: '',
        mobilenumber: '',
        emailaddress: '',
        paymentamount: '',
        billingaddress: '',
        paymentmethod: 'Credit/Debit Card', // Default payment method
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
            const response = await fetch('http://localhost:7000/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({
                    cdholdername: '',
                    cdtype: 'Visa',
                    bank: 'Sampath Bank',
                    cdnum: '',
                    cvv: '',
                    exdate: '',
                    mobilenumber: '',
                    emailaddress: '',
                    paymentamount: '',
                    billingaddress: '',
                    paymentmethod: 'Credit/Debit Card',
                });
                alert('Payment submitted successfully!');
            } else {
                alert('Failed to submit payment.');
            }
        } catch (error) {
            console.error('Error submitting payment:', error);
            alert('An error occurred while submitting the payment.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white border-2 border-green-500 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Information</h2>
            <form onSubmit={handleSubmit}>
                {/* Payment Fields */}
                <div className="mb-4">
                    <label htmlFor="cdholdername" className="block text-gray-700 mb-1">Cardholder Name</label>
                    <input
                        type="text"
                        id="cdholdername"
                        name="cdholdername"
                        value={formData.cdholdername}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cdtype" className="block text-gray-700 mb-1">Card Type</label>
                    <select
                        id="cdtype"
                        name="cdtype"
                        value={formData.cdtype}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="American Express">American Express</option>
                        <option value="Discover">Discover</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="bank" className="block text-gray-700 mb-1">Bank</label>
                    <select
                        id="bank"
                        name="bank"
                        value={formData.bank}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="Sampath Bank">Sampath Bank</option>
                        <option value="Commercial Bank">Commercial Bank</option>
                        <option value="Hatton National Bank">Hatton National Bank</option>
                        <option value="People's Bank">People's Bank</option>
                        <option value="Bank of Ceylon">Bank of Ceylon</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="cdnum" className="block text-gray-700 mb-1">Card Number</label>
                    <input
                        type="text"
                        id="cdnum"
                        name="cdnum"
                        value={formData.cdnum}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cvv" className="block text-gray-700 mb-1">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="exdate" className="block text-gray-700 mb-1">Expiration Date (MM/YY)</label>
                    <input
                        type="text"
                        id="exdate"
                        name="exdate"
                        value={formData.exdate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="mobilenumber" className="block text-gray-700 mb-1">Mobile Number</label>
                    <input
                        type="text"
                        id="mobilenumber"
                        name="mobilenumber"
                        value={formData.mobilenumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="emailaddress" className="block text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        id="emailaddress"
                        name="emailaddress"
                        value={formData.emailaddress}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="paymentamount" className="block text-gray-700 mb-1">Payment Amount</label>
                    <input
                        type="number"
                        id="paymentamount"
                        name="paymentamount"
                        value={formData.paymentamount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="billingaddress" className="block text-gray-700 mb-1">Billing Address</label>
                    <input
                        type="text"
                        id="billingaddress"
                        name="billingaddress"
                        value={formData.billingaddress}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="paymentmethod" className="block text-gray-700 mb-1">Payment Method</label>
                    <select
                        id="paymentmethod"
                        name="paymentmethod"
                        value={formData.paymentmethod}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="Credit/Debit Card">Credit/Debit Card</option>
                        <option value="eZ Cash">eZ Cash</option>
                        <option value="Mobitel">Mobitel</option>
                        <option value="Dialog">Dialog</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                    Submit Payment
                </button>
            </form>
        </div>
    );
};

export default AddPayment;
