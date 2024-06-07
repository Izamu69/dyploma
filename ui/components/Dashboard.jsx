import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faClipboardList, faTasks, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('enrolledCourses');
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [takenTests, setTakenTests] = useState([]);
    const [createdCourses, setCreatedCourses] = useState([]);
    const [createdTests, setCreatedTests] = useState([]);

    useEffect(() => {
        // Fetch the data for enrolled courses, taken tests, created courses, and created tests
        // For demonstration purposes, using static data

        setEnrolledCourses([
            { id: 1, name: 'Foundations Course' },
            { id: 2, name: 'Advanced JavaScript' },
        ]);

        setTakenTests([
            { id: 1, name: 'JavaScript Basics Test', score: '85%' },
            { id: 2, name: 'React Fundamentals Test', score: '90%' },
        ]);

        setCreatedCourses([
            { id: 1, name: 'Intro to Python' },
            { id: 2, name: 'Data Structures' },
        ]);

        setCreatedTests([
            { id: 1, name: 'Python Basics Test' },
            { id: 2, name: 'Algorithms Test' },
        ]);
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'enrolledCourses':
                return (
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        {enrolledCourses.map(course => (
                            <div key={course.id} className="mb-2">
                                <Link to={`/course/${course.id}`} className="text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faBookOpen} size='lg' className="text-gray-600" /> {course.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                );
            case 'takenTests':
                return (
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        {takenTests.map(test => (
                            <div key={test.id} className="flex justify-between items-center mb-2">
                                <Link to={`/test/${test.id}`} className="flex-grow text-left text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faClipboardList} size='lg' className="text-gray-600" /> {test.name}
                                </Link>
                                <span className="text-teal-600 text-lg">{test.score}</span>
                            </div>
                        ))}
                    </div>
                );
            case 'createdCourses':
                return (
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        {createdCourses.map(course => (
                            <div key={course.id} className="mb-2">
                                <Link to={`/course/${course.id}`} className="text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faBookOpen} size='lg' className="text-gray-600" /> {course.name}
                                </Link>
                            </div>
                        ))}
                        <Link to="/create-course" className="text-lg bg-transparent p-4 m-0 border-none text-teal-600 hover:text-teal-400 hover:rounded-lg">
                            <FontAwesomeIcon icon={faPlusCircle} size='lg' /> Create New Course
                        </Link>
                    </div>
                );
            case 'createdTests':
                return (
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        {createdTests.map(test => (
                            <div key={test.id} className="mb-2">
                                <Link to={`/test/${test.id}`} className="text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faTasks} size='lg' className="text-gray-600" /> {test.name}
                                </Link>
                            </div>
                        ))}
                        <Link to="/create-test" className="text-lg bg-transparent p-4 m-0 border-none text-teal-600 hover:text-teal-400 hover:rounded-lg">
                            <FontAwesomeIcon icon={faPlusCircle} size='lg' /> Create New Test
                        </Link>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            <div className="flex flex-col md:flex-row mb-8">
                <button onClick={() => setActiveTab('enrolledCourses')} className={`px-4 py-2 mr-2 mb-4 ${activeTab === 'enrolledCourses' ? 'bg-teal-600' : 'bg-gray-800'} text-gray-300 rounded-lg`}>
                    Enrolled Courses
                </button>
                <button onClick={() => setActiveTab('takenTests')} className={`px-4 py-2 mr-2 mb-4 ${activeTab === 'takenTests' ? 'bg-teal-600' : 'bg-gray-800'} text-gray-300 rounded-lg`}>
                    Taken Tests
                </button>
                <button onClick={() => setActiveTab('createdCourses')} className={`px-4 py-2 mr-2 mb-4 ${activeTab === 'createdCourses' ? 'bg-teal-600' : 'bg-gray-800'} text-gray-300 rounded-lg`}>
                    Created Courses
                </button>
                <button onClick={() => setActiveTab('createdTests')} className={`px-4 py-2 mr-2 mb-4 ${activeTab === 'createdTests' ? 'bg-teal-600' : 'bg-gray-800'} text-gray-300 rounded-lg`}>
                    Created Tests
                </button>
            </div>
            {renderContent()}
        </div>
    );
};

export default Dashboard;
