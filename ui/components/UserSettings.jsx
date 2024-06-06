import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserSettings = () => {
    const [selectedOption, setSelectedOption] = useState('profile');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <aside className="w-64 bg-gray-900">
                <nav className="p-8">
                    <ul>
                        <li className="mb-1">
                            <a
                                href="#"
                                className={`flex items-center p-2 rounded ${selectedOption === 'profile' ? 'bg-gray-700' : 'hover:bg-gray-700'
                                    }`}
                                onClick={() => handleOptionClick('profile')}
                            >
                                <FontAwesomeIcon icon={faUser} className="w-5 h-5 mr-3" />
                                Profile
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`flex items-center p-2 rounded ${selectedOption === 'password' ? 'bg-gray-700' : 'hover:bg-gray-700'
                                    }`}
                                onClick={() => handleOptionClick('password')}
                            >
                                <FontAwesomeIcon icon={faKey} className="w-5 h-5 mr-3" />
                                Password
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                {selectedOption === 'profile' && (
                    <div>
                        <div className='bg-gray-800 rounded-lg border border-gray-600'>
                            <h1 className="flex text-2xl font-bold mb-4 mt-6 mx-8">Profile</h1>
                            <p className="flex my-8 mx-8">Profile information will be displayed on your dashboard.</p>
                            <form className="space-y-6">
                                <div className='mx-8'>
                                    <label htmlFor="userName" className="flex text-base font-bold">Username</label>
                                    <input type="text" id="userName" className="mt-1 flex md:w-1/2 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded" />
                                </div>
                                <div className='mx-8'>
                                    <label htmlFor="email" className="flex text-base font-bold">Email</label>
                                    <input type="email" id="email" className="mt-1 block md:w-1/2 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded" />
                                </div>
                                <div className='mx-8'>
                                    <label htmlFor="firstName" className="flex text-base font-bold">First Name</label>
                                    <input type="text" id="firstName" className="mt-1 block md:w-2/3 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded" />
                                </div>
                                <div className='mx-8'>
                                    <label htmlFor="lastName" className="flex text-base font-bold">Last Name</label>
                                    <input type="text" id="lastName" className="mt-1 block md:w-2/3 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded" />
                                </div>
                                <div className='bg-gray-700 rounded-b-lg px-6 py-4 text-right'>
                                    <button type="submit" className="bg-teal-600 text-white py-2 px-8 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline font-bold">Save</button>
                                </div>
                            </form>
                        </div>
                        <div className="bg-gray-800 rounded-lg border border-gray-600 mt-8 p-6">
                            <h2 className="flex text-xl font-bold mb-4">Danger Zone</h2>
                            <p className="flex mb-4">Careful, this action cannot be undone.</p>
                            <div className="space-y-4">
                                <button className="flex items-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline">
                                    <FontAwesomeIcon icon={faTrash} className="w-5 h-5 mr-2" />
                                    Delete account
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {selectedOption === 'password' && (
                    <div className='bg-gray-800 rounded-lg border border-gray-600'>
                        <h1 className="flex text-2xl font-bold mb-4 mt-6 mx-8">Change your password</h1>
                        <form className="space-y-6">
                            <div className='mx-8'>
                                <label htmlFor="currentPassword" className="flex text-base font-bold">Current password</label>
                                <input type="password" id="currentPassword" className="mt-1 flex md:w-2/3 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded" />
                            </div>
                            <div className='mx-8'>
                                <label htmlFor="newPassword" className="flex text-base font-bold">New password</label>
                                <input type="password" id="newPassword" className="mt-1 block md:w-2/3 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded" />
                            </div>
                            <div className='mx-8'>
                                <label htmlFor="confirmPassword" className="flex text-base font-bold">Password confirmation</label>
                                <input type="password" id="confirmPassword" className="mt-1 block md:w-2/3 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded" />
                            </div>
                            <div className='bg-gray-700 rounded-b-lg px-6 py-4 text-right'>
                                <button type="submit" className="bg-teal-600 text-white py-2 px-8 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline font-bold">Save</button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default UserSettings;
