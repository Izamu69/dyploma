import React, { useState } from 'react';
import CourseListPage from './CourseListPage';
import TestListPage from './TestListPage';

const ListSelectorPage = () => {
    const [selectedItem, setSelectedItem] = useState('courses');

    const renderSelectedPage = () => {
        if (selectedItem === 'courses') {
            return <CourseListPage />;
        } else {
            return <TestListPage />;
        }
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <div className="max-w-4xl mx-auto mb-8 flex justify-center">
                <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="p-4 text-lg bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                    <option value="courses">Courses</option>
                    <option value="tests">Tests</option>
                </select>
            </div>
            {renderSelectedPage()}
        </div>
    );
};

export default ListSelectorPage;
