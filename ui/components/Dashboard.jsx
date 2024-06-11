import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faClipboardList, faTasks, faPlusCircle, faSearch, faFileUpload, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import CSS file for styling

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('enrolledCourses');
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [takenTests, setTakenTests] = useState([]);
    const [createdCourses, setCreatedCourses] = useState([]);
    const [createdTests, setCreatedTests] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [userName, setUserName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [tabsVisible, setTabsVisible] = useState(true); // State for managing tab visibility

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserName(userData.userName);
        }

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

        // Example uploaded files with URLs
        setUploadedFiles([
            { id: 1, name: 'example.pdf', url: 'https://example.com/example.pdf' },
            { id: 2, name: 'image.png', url: 'https://example.com/image.png' },
        ]);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setTabsVisible(true);
            } else {
                setTabsVisible(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearch = (items, query) => {
        if (!query) {
            return items;
        }
        return items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newFile = {
                id: uploadedFiles.length + 1,
                name: file.name,
                url: URL.createObjectURL(file) // This is a local URL for the uploaded file
            };
            setUploadedFiles([...uploadedFiles, newFile]);
        }
    };

    const renderContent = () => {
        let itemsToDisplay = [];
        switch (activeTab) {
            case 'enrolledCourses':
                itemsToDisplay = handleSearch(enrolledCourses, searchQuery);
                return (
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        {itemsToDisplay.map(course => (
                            <div key={course.id} className="mb-2">
                                <Link to={`/course/${course.id}`} className="flex items-center text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faBookOpen} size='lg' className="text-teal-600 mr-2" /> {course.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                );
            case 'takenTests':
                itemsToDisplay = handleSearch(takenTests, searchQuery);
                return (
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        {itemsToDisplay.map(test => (
                            <div key={test.id} className="flex justify-between items-center mb-2">
                                <Link to={`/test/${test.id}`} className="flex items-center text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faClipboardList} size='lg' className="text-teal-600 mr-2" /> {test.name}
                                </Link>
                                <span className="text-teal-600 text-lg">{test.score}</span>
                            </div>
                        ))}
                    </div>
                );
            case 'createdCourses':
                itemsToDisplay = handleSearch(createdCourses, searchQuery);
                return (
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        <Link to="/createcourse" className="flex items-center text-lg bg-transparent p-4 m-0 border-none text-teal-600 hover:text-teal-400 hover:rounded-lg">
                            <FontAwesomeIcon icon={faPlusCircle} size='lg' className="mr-2" /> Create New Course
                        </Link>
                        {itemsToDisplay.map(course => (
                            <div key={course.id} className="mb-2">
                                <Link to={`/course/${course.id}`} className="flex items-center text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faBookOpen} size='lg' className="text-teal-600 mr-2" /> {course.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                );
            case 'createdTests':
                itemsToDisplay = handleSearch(createdTests, searchQuery);
                return (
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        <Link to="/createtest" className="flex items-center text-lg bg-transparent p-4 m-0 border-none text-teal-600 hover:text-teal-400 hover:rounded-lg">
                            <FontAwesomeIcon icon={faPlusCircle} size='lg' className="mr-2" /> Create New Test
                        </Link>
                        {itemsToDisplay.map(test => (
                            <div key={test.id} className="mb-2">
                                <Link to={`/test/${test.id}`} className="flex items-center text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faTasks} size='lg' className="text-teal-600 mr-2" /> {test.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                );
            case 'uploadedFiles':
                itemsToDisplay = handleSearch(uploadedFiles, searchQuery);
                return (
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        <div className="mb-4">
                            <input type="file" id="fileUpload" onChange={handleFileUpload} className="bg-gray-900 text-gray-300 rounded-lg p-2 w-full" />
                        </div>
                        {itemsToDisplay.map(file => (
                            <div key={file.id} className="mb-2">
                                <a href={file.url} download={file.name}
                                    className="flex items-center text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faFileUpload} size='lg' className="text-teal-600 mr-2" /> {file.name}
                                </a>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">Welcome, {userName}</h1>
            <div className="flex justify-start mb-4 md:hidden">
                <button onClick={() => setTabsVisible(!tabsVisible)}>
                    <FontAwesomeIcon icon={tabsVisible ? faTimes : faBars} className="w-6 h-6 text-white" />
                </button>
            </div>
            <div className={`tabs ${tabsVisible ? 'tabs-visible' : 'tabs-hidden'}`}>
                <div className="flex flex-col md:flex-row mb-8">
                    <button onClick={() => setActiveTab('enrolledCourses')} className={`px-4 py-2 mr-2 mb-4 ${activeTab === 'enrolledCourses' ? 'bg-teal-600' : 'bg-gray-800'} text-gray-300 rounded-lg flex items-center`}>
                        <FontAwesomeIcon icon={faBookOpen} size='lg' className="mr-2" /> Enrolled Courses
                    </button>
                    <button onClick={() => setActiveTab('takenTests')} className={`px-4 py-2 mr-2 mb-4 ${activeTab === 'takenTests' ? 'bg-teal-600' : 'bg-gray-800'} text-gray-300 rounded-lg flex items-center`}>
                        <FontAwesomeIcon icon={faClipboardList} size='lg' className="mr-2" /> Taken Tests
                    </button>
                    <button onClick={() => setActiveTab('createdCourses')} className={`px-4 py-2 mr-2 mb-4 ${activeTab === 'createdCourses' ? 'bg-teal-600' : 'bg-gray-800'} text-gray-300 rounded-lg flex items-center`}>
                        <FontAwesomeIcon icon={faBookOpen} size='lg' className="mr-2" /> Created Courses
                    </button>
                    <button onClick={() => setActiveTab('createdTests')} className={`px-4 py-2 mr-2 mb-4 ${activeTab === 'createdTests' ? 'bg-teal-600' : 'bg-gray-800'} text-gray-300 rounded-lg flex items-center`}>
                        <FontAwesomeIcon icon={faTasks} size='lg' className="mr-2" /> Created Tests
                    </button>
                    <button onClick={() => setActiveTab('uploadedFiles')} className={`px-4 py-2 mr-2 mb-4 ${activeTab === 'uploadedFiles' ? 'bg-teal-600' : 'bg-gray-800'} text-gray-300 rounded-lg flex items-center`}>
                        <FontAwesomeIcon icon={faFileUpload} size='lg' className="mr-2" /> Uploaded Files
                    </button>
                </div>
            </div>
            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-3 text-teal-600" />
                </div>
            </div>
            {renderContent()}
        </div>
    );
};

export default Dashboard;
