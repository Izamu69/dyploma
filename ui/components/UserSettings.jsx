import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const UserSettings = () => {
    const [selectedOption, setSelectedOption] = useState('profile');
    const [userId, setUserId] = useState('');
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
    });
    const [passwordFormData, setPasswordFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const handleUserData = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setUserId(user._id);
                setFormData({
                    userName: user.userName || '',
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                });
            } else {
                setUserId(''); // Set userId to empty string if user data is not found
                setFormData({
                    userName: '',
                    firstName: '',
                    lastName: '',
                });
            }
        };

        handleUserData();

        // Remove the storage event listener
        return () => {
            window.removeEventListener('storage', handleUserData);
        };
    }, []);


    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setErrorMessage('User ID not found');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000); // Hide the error after 3 seconds
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const updatedUser = await response.json();

            if (response.ok) {
                // Update local storage with the new user data
                localStorage.setItem('user', JSON.stringify(updatedUser.user));
                // Update the component's state with the new user data
                setUserId(updatedUser.user._id);
                setFormData({
                    userName: updatedUser.user.userName,
                    firstName: updatedUser.user.firstName,
                    lastName: updatedUser.user.lastName,
                });
                setConfirmationMessage('User data updated successfully');
                setShowConfirmation(true);
                setTimeout(() => {
                    setShowConfirmation(false);
                }, 3000); // Hide the confirmation after 3 seconds
            } else {
                setErrorMessage('Failed to update user data');
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000); // Hide the error after 3 seconds
            }
        } catch (error) {
            setErrorMessage('Error updating user data');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000); // Hide the error after 3 seconds
            console.error('Error updating user data:', error);
        }
    };

    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswordFormData({ ...passwordFormData, [id]: value });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setErrorMessage('User ID not found');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000); // Hide the error after 3 seconds
            return;
        }

        // Perform validation on the new password and confirmation
        if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
            setErrorMessage('New password and confirmation do not match');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000); // Hide the error after 3 seconds
            return;
        }

        try {
            // First, check if the current password is correct
            const response = await fetch(`http://localhost:3000/users/${userId}/checkPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: passwordFormData.currentPassword }),
            });

            if (response.ok) {
                // Current password is correct, proceed with updating the password
                const updateResponse = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password: passwordFormData.newPassword }),
                });

                const updatedUser = await updateResponse.json();

                if (updateResponse.ok) {
                    // Update local storage with the new user data
                    localStorage.setItem('user', JSON.stringify(updatedUser.user));
                    // Update the component's state with the new user data
                    setUserId(updatedUser.user._id); // Use updatedUser.user._id for the userId
                    setFormData({
                        userName: updatedUser.user.userName,
                        firstName: updatedUser.user.firstName,
                        lastName: updatedUser.user.lastName,
                    });
                    setConfirmationMessage('Password updated successfully');
                    setShowConfirmation(true);
                    setTimeout(() => {
                        setShowConfirmation(false);
                    }, 3000); // Hide the confirmation after 3 seconds
                    // Reset the password form data
                    setPasswordFormData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                    });
                } else {
                    setErrorMessage('Failed to update password');
                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000); // Hide the error after 3 seconds
                }
            } else {
                setErrorMessage('Current password is incorrect');
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 3000); // Hide the error after 3 seconds
            }
        } catch (error) {
            setErrorMessage('Error updating password');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000); // Hide the error after 3 seconds
            console.error('Error updating password:', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Clear local storage and redirect to sign-in page or perform any other action
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                console.log('User account deleted successfully');
                navigate('/');
            } else {
                console.error('Failed to delete user account');
            }
        } catch (error) {
            console.error('Error deleting user account:', error);
        }
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
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className='mx-8'>
                                    <label htmlFor="userName" className="flex text-base font-bold">Username</label>
                                    <input
                                        type="text"
                                        id="userName"
                                        value={formData.userName}
                                        onChange={handleChange}
                                        className="mt-1 flex md:w-1/2 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                                    />
                                </div>
                                <div className='mx-8'>
                                    <label htmlFor="firstName" className="flex text-base font-bold">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="mt-1 block md:w-2/3 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                                    />
                                </div>
                                <div className='mx-8'>
                                    <label htmlFor="lastName" className="flex text-base font-bold">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="mt-1 block md:w-2/3 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                                    />
                                </div>
                                <div className='bg-gray-700 rounded-b-lg px-6 py-4 text-right'>
                                    <button
                                        type="submit"
                                        className="bg-teal-600 text-white py-2 px-8 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline font-bold"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="bg-gray-800 rounded-lg border border-gray-600 mt-8 p-6">
                            <h2 className="flex text-xl font-bold mb-4">Danger Zone</h2>
                            <p className="flex mb-4">Careful, this action cannot be undone.</p>
                            <div className="space-y-4">
                                <button onClick={handleDeleteAccount} className="flex items-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline">
                                    <FontAwesomeIcon icon={faTrash} className="w-5 h-5 mr-2" />
                                    Delete account
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {
                    selectedOption === 'password' && (
                        <div className="bg-gray-800 rounded-lg border border-gray-600">
                            <h1 className="flex text-2xl font-bold mb-4 mt-6 mx-8">Change your password</h1>
                            <form className="space-y-6" onSubmit={handlePasswordSubmit}>
                                <div className="mx-8">
                                    <label htmlFor="currentPassword" className="flex text-base font-bold">
                                        Current password
                                    </label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        value={passwordFormData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="mt-1 flex md:w-2/3 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                                    />
                                </div>
                                <div className="mx-8">
                                    <label htmlFor="newPassword" className="flex text-base font-bold">
                                        New password
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        value={passwordFormData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="mt-1 block md:w-2/3 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                                    />
                                </div>
                                <div className="mx-8">
                                    <label htmlFor="confirmPassword" className="flex text-base font-bold">
                                        Password confirmation
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={passwordFormData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="mt-1 block md:w-2/3 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                                    />
                                </div>
                                <div className="bg-gray-700 rounded-b-lg px-6 py-4 text-right">
                                    <button
                                        type="submit"
                                        className="bg-teal-600 text-white py-2 px-8 rounded hover:bg-teal-700 focus:outline-none focus:shadow-outline font-bold"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    )
                }
            </main>
            {showConfirmation && (
                <div className="fixed bottom-4 left-4 bg-teal-600 text-white px-4 py-2 rounded">
                    {confirmationMessage}
                </div>
            )}
            {showError && (
                <div className="fixed bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default UserSettings;
