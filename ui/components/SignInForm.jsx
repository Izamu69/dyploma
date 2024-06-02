// src/SignInForm.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

const SignInForm = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-white">Sign in to your account</h2>
        <div className="mb-4 text-center">
          <a className="text-sm text-gray-400 hover:text-gray-300 underline" href="#">
            or sign up for a new account
          </a>
        </div>
        <form>
          <div className="mb-4">
            <label className="flex text-gray-400 text-sm font-bold mb-2" htmlFor="email">
              Email address
            </label>
            <input
              className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
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
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="flex items-center text-gray-400">
              <input className="mr-2 leading-tight accent-teal-600 rounded" type="checkbox" />
              <span className="text-sm">Remember me</span>
            </label>
            <a className="text-sm text-gray-400 hover:text-gray-300 underline" href="#">
              Forgot your password?
            </a>
          </div>
          <button
            className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign in
          </button>
        </form>
        <div className="mt-6 text-center text-gray-400">
          <p>Or continue with</p>
          <div className="flex justify-center mt-4">
            <button className="mx-2 bg-gray-700 p-3 rounded">
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6 text-white" />
            </button>
            <button className="mx-2 bg-gray-700 p-3 rounded">
              <FontAwesomeIcon icon={faGoogle} className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;