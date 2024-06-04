import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <header className="bg-gray-900 text-gray-300">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <span className="text-white text-xl font-bold">Stason</span>
        </div>
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
            <a href="#" className="hover:text-white hover:underline font-bold block mb-4 md:inline md:mt-4 md:mr-6">
              Dashboard
            </a>
            <a href="#" className="hover:text-white hover:underline font-bold block mb-4 md:inline md:mt-4 md:mr-6">
              Browse
            </a>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faBell} className="w-5 h-5 cursor-pointer hover:text-white" />
              <a href="#" className="hover:text-white hover:underline font-bold">
                Settings
              </a>
              <button
                className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline font-bold"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </div>
        </nav>
      </div>
      <hr className="border-gray-700" />
    </header>
  );
};

export default Header;
