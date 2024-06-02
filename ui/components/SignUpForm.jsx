import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formData.email.split('@')[0], // Assuming userName is derived from email
          firstName: 'stas',
          lastName: 'stas',
          password: formData.password,
          phone: '213234', // Add a phone input if required
        }),
      });

      if (response.ok) {
        setSuccess('Account created successfully');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error creating account');
      }
    } catch (error) {
      setError('Error creating account');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-white">Sign up to your account</h2>
        <div className="mb-4 text-center">
          <a className="text-sm text-gray-400 hover:text-gray-300 underline" href="#">
            or sign in to your existing account
          </a>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex text-gray-400 text-sm font-bold mb-2" htmlFor="email">
              Email address
            </label>
            <input
              className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-400 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex text-gray-400 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
