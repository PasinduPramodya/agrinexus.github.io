import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const adminEmail = 'admin@admin.com';
  const adminPassword = 'adminAA@123';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      alert('Welcome, Admin!');
      navigate('/admin');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7000/api/user/login', {
        email,
        password,
      });

      const user = response.data;
      alert(`Welcome, ${user.fullName}!`);

      switch (user.type) {
        case 'customer':
          navigate('/customer');
          break;
        case 'worker':
          navigate('/worker');
          break;
        case 'delivery':
          navigate('/delivery');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed!';
      alert(message);
    }
  };

  const navigateToSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform transition-all hover:scale-105 duration-700">
        <div>
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-md">
            <LogIn className="h-8 w-8 text-white animate-pulse" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={navigateToSignUp}
              className="font-medium text-green-600 hover:text-green-500 transition-colors duration-300 underline underline-offset-2"
            >
              Join us today
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              label="Email address"
              id="email-address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="name@example.com"
            />
            <InputField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LogIn className="h-5 w-5 text-green-100 group-hover:text-white" />
            </span>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, id, type, value, onChange, placeholder }) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-gray-500 uppercase tracking-wide absolute -top-3 left-2 bg-white px-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
