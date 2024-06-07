import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const ChooseCreation = () => {
    const navigate = useNavigate();

    const handleCreateCourse = () => {
        navigate('/createlesson');
    };

    const handleCreateTest = () => {
        navigate('/createtest');
    };

    return (
        <div className="bg-gray-900 text-gray-300 flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-8">What would you like to create?</h1>
            <div className="space-x-4 flex">
                <button
                    onClick={handleCreateCourse}
                    className="flex items-center bg-teal-600 text-white py-4 px-8 rounded mb-4 hover:bg-teal-700 transition duration-300 transform hover:scale-105"
                >
                    <FontAwesomeIcon icon={faBook} className="mr-2" />
                    Create Course
                </button>
                <button
                    onClick={handleCreateTest}
                    className="flex items-center bg-teal-600 text-white py-4 px-8 rounded mb-4 hover:bg-teal-700 transition duration-300 transform hover:scale-105"
                >
                    <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                    Create Test
                </button>
            </div>
        </div>
    );
};

export default ChooseCreation;
