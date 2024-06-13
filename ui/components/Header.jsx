import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faTimes, faS } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      setShowDropdown(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/')
  };

  return (
    <header className="bg-gray-900 text-gray-300">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-4">
          <span className="text-white text-2xl font-bold">Stason</span>
        </Link>
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav
          className={`flex-col md:flex-row items-center space-x-6 ${isOpen ? 'flex nav-open' : 'hidden md:flex md:nav-regular'
            }`}
          onClick={handleBackdropClick}
        >
          <div
            className={`bg-gray-900 text-gray-300 p-6 rounded-lg ${isOpen ? '' : 'hidden md:flex md:bg-transparent md:p-0 md:rounded-none'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {isAuthenticated ? (
              <>
                <a href="/dashboard" className="hover:text-white hover:underline font-bold block mb-4 md:inline md:mt-4 md:mr-6">
                  Dashboard
                </a>
                <a href="/browse" className="hover:text-white hover:underline font-bold block mb-4 md:inline md:mt-4 md:mr-6">
                  Browse
                </a>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <FontAwesomeIcon icon={faPlus} onClick={toggleDropdown} className="w-5 h-5 cursor-pointer hover:text-white" />
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 bg-gray-800 text-gray-300 p-2 rounded-lg shadow-md">
                        <a href="/createcourse" className="block py-1 px-2 hover:text-white font-bold hover:underline">
                          Course
                        </a>
                        <a href="/createtest" className="block py-1 px-2 hover:text-white font-bold hover:underline">
                          Test
                        </a>
                      </div>
                    )}
                  </div>
                  <a href="/settings" className="hover:text-white hover:underline font-bold">
                    Settings
                  </a>
                  <button
                    className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline font-bold"
                    type="button"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <div className='flex items-center'>
                <a href="/browse" className="hover:text-white hover:underline font-bold block mb-4 md:inline md:mt-4 md:mr-6">
                  Browse
                </a>
                <Link to="/signin">
                  <button
                    className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline font-bold"
                    type="button"
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
      <hr className="border-gray-700" />
    </header>
  );
};

export default Header;
