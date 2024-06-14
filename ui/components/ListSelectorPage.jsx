import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faTasks, faEyeSlash, faEye, faArrowDown91, faArrowUp19 } from '@fortawesome/free-solid-svg-icons';
import CourseListPage from './CourseListPage';
import TestListPage from './TestListPage';

const ListSelectorPage = () => {
    const [selectedItem, setSelectedItem] = useState('courses');
    const [authorSearchQuery, setAuthorSearchQuery] = useState('');
    const [isHidden, setIsHidden] = useState(false);
    const [sortOrder, setSortOrder] = useState('newest');

    const handleAuthorSearch = (e) => {
        setAuthorSearchQuery(e.target.value);
    };

    const toggleVisibility = () => {
        setIsHidden(!isHidden);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'newest' ? 'oldest' : 'newest'));
    };

    const renderSelectedPage = () => {
        if (selectedItem === 'courses') {
            return <CourseListPage authorSearchQuery={authorSearchQuery} sortOrder={sortOrder} />;
        } else {
            return <TestListPage authorSearchQuery={authorSearchQuery} sortOrder={sortOrder} />;
        }
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen flex flex-col md:flex-row max-w-screen-xl mx-auto">
            {/* Side Menu */}
            <div className="w-full md:w-1/4 bg-gray-900 p-4 flex flex-col items-center md:items-start md:min-h-screen">
                <div className="text-center md:text-left mb-4">
                    <div className="inline-block bg-gray-700 p-4 rounded-full mb-4">
                        <FontAwesomeIcon icon={selectedItem === 'courses' ? faBook : faTasks} size="3x" className="text-teal-600" />
                    </div>
                    <h1 className="text-4xl font-bold">
                        All {selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1)}
                    </h1>
                </div>
                <button onClick={toggleVisibility} className="text-sm text-gray-500 mb-4">
                    {isHidden ? <FontAwesomeIcon icon={faEyeSlash} size='xl' /> : <FontAwesomeIcon icon={faEye} size='xl' />}
                </button>
                {!isHidden && (
                    <>
                        <select
                            value={selectedItem}
                            onChange={(e) => setSelectedItem(e.target.value)}
                            className="w-full p-4 text-lg bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 mb-4"
                        >
                            <option value="courses">Courses</option>
                            <option value="tests">Tests</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search by author..."
                            value={authorSearchQuery}
                            onChange={handleAuthorSearch}
                            className="w-full p-4 text-lg bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 mb-4"
                        />
                        <button
                            onClick={toggleSortOrder}
                            className="w-full p-4 text-lg bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 mb-4 flex items-center justify-between"
                        >
                            {sortOrder === 'newest' ? 'Newest to Oldest' : 'Oldest to Newest'}
                            <FontAwesomeIcon icon={sortOrder === 'newest' ? faArrowUp19 : faArrowDown91} className='ml-4' size='xl' />
                        </button>
                    </>
                )}
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4">
                <div className="max-w-6xl mx-auto">
                    {renderSelectedPage()}
                </div>
            </div>
        </div>
    );
};

export default ListSelectorPage;
