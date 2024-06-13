import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TestListPage = ({ authorSearchQuery }) => {
    const [tests, setTests] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await fetch('http://localhost:3000/tests');
                if (!response.ok) {
                    throw new Error('Failed to fetch tests');
                }
                const data = await response.json();
                setTests(data.tests);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchTests();
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

    const getAuthorName = authorId => {
        const author = users.find(user => user._id === authorId);
        return author ? author.userName : 'Unknown';
    };

    const filteredTests = tests.filter(test =>
        test.testName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (authorSearchQuery ? getAuthorName(test.authorId).toLowerCase().includes(authorSearchQuery.toLowerCase()) : true)
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <div className="max-w-8xl mx-auto">
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search for a test..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full p-4 text-lg bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                </div>
                <div>
                    {filteredTests.map((test, index) => (
                        <div key={index} className="mb-4">
                            <Link to={`/test/${test._id}`} className="flex-grow text-left">
                                <button className="w-full text-left text-xl bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                    <FontAwesomeIcon icon={faTasks} size='xl' className="text-gray-600" /> {test.testName} by {getAuthorName(test.authorId)}
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestListPage;
