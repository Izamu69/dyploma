import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });
      console.log("response", response);
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { token, user } = data;

      // Store the token in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to the dashboard or any other page
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 pt-16">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-white">Sign in to your account</h2>
        <div className="mb-4 text-center">
          <a className="text-sm text-gray-400 hover:text-gray-300 underline" href="/signup">
            or sign up for a new account
          </a>
        </div>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="flex text-gray-400 text-sm font-bold mb-2" htmlFor="userName">
              Username
            </label>
            <input
              className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:shadow-outline"
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="flex items-center text-gray-400">
              <input className="mr-2 leading-tight accent-teal-600 rounded" type="checkbox" />
              <span className="text-sm">Remember me</span>
            </label>
          </div>
          <button
            className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline font-bold"
            type="button"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
