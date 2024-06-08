import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CourseListPage = () => {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/courses');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                setCourses(data.courses);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course =>
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <div className="text-center mb-8">
                <div className="inline-block bg-gray-800 p-4 rounded-full mb-4">
                    <FontAwesomeIcon icon={faBookOpen} size="3x" className="text-teal-600" />
                </div>
                <h1 className="text-4xl font-bold">All Courses</h1>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search for a course..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full p-4 text-lg bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                </div>
                <div>
                    {filteredCourses.map((course, index) => (
                        <div key={index} className="mb-4">
                            <Link to={`/course/${course._id}`} className="flex-grow text-left">
                                <button className="w-full text-left text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faBookOpen} size='lg' className="text-gray-600" /> {course.courseName}
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseListPage;
