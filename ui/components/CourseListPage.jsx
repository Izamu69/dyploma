import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CourseListPage = ({ authorSearchQuery, sortOrder }) => {
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                setUsers(data.users);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const sortedCourses = [...courses].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    const getAuthorName = authorId => {
        const author = users.find(user => user._id === authorId);
        return author ? author.userName : 'Unknown';
    };

    const filteredCourses = sortedCourses.filter(course =>
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (authorSearchQuery ? getAuthorName(course.authorId).toLowerCase().includes(authorSearchQuery.toLowerCase()) : true)
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <div className="max-w-8xl mx-auto">
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
                                <button className="w-full text-left text-xl bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faBook} size='xl' className="text-gray-600" /> {course.courseName} by {getAuthorName(course.authorId)}
                                    <div className="text-lg text-gray-500">
                                        {course.lessonIds ? `${course.lessonIds.length} ${course.lessonIds.length === 1 ? 'lesson' : 'lessons'}` : '0 lessons'} ({formatDate(course.createdAt)})
                                    </div>
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
