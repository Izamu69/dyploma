import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

const UserSettings = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-gray-300">
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
                <div className='bg-gray-800 rounded-lg border border-gray-600'>
                    <h1 className="flex text-2xl font-bold mb-4 mt-6 ml-8">Profile</h1>
                    <p className="flex my-8 ml-8">Profile information will be displayed on your dashboard.</p>
                    <form className="space-y-6">
                        <div className='ml-8'>
                            <label htmlFor="userName" className="flex text-base font-bold">Username</label>
                            <input type="text" id="userName" className="mt-1 flex w-1/2 px-3 py-2 bg-gray-700 border border-gray-600 rounded" />
                        </div>
                        <div className='ml-8'>
                            <label htmlFor="phone" className="flex text-base font-bold">Phone</label>
                            <input type="text" id="phone" className="mt-1 block w-1/2 px-3 py-2 bg-gray-700 border border-gray-600 rounded" />
                        </div>
                        <div className='ml-8'>
                            <label htmlFor="firstName" className="flex text-base font-bold">First Name</label>
                            <input type="text" id="firstName" className="mt-1 block w-2/3 px-3 py-2 bg-gray-700 border border-gray-600 rounded" />
                        </div>
                        <div className='ml-8'>
                            <label htmlFor="lastName" className="flex text-base font-bold">Last Name</label>
                            <input type="text" id="lastName" className="mt-1 block w-2/3 px-3 py-2 bg-gray-700 border border-gray-600 rounded" />
                        </div>
                        <div className='bg-gray-700 rounded-b-lg px-6 py-4 text-right'>
                        <button type="submit" className="bg-teal-600 text-white py-2 px-8 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline font-bold">Save</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default UserSettings;
