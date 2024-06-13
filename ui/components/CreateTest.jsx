import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTest.css';

const CreateTest = () => {
    const [testName, setTestName] = useState('');
    const [authorId, setAuthorId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id) {
            setAuthorId(user._id);
        }
    }, []);

    const handleSaveTest = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/tests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    testName,
                    authorId,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Test created successfully:', data.test);
                navigate(`/test/${data.test._id}/edit`);
            } else {
                console.error('Failed to create course:', data.message);
            }
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">Create Your Test</h1>
            <div className="mb-6">
                <label className="block text-xl font-bold mb-2">Test Name</label>
                <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
            </div>
            <button onClick={handleSaveTest} className="bg-teal-600 text-white py-2 px-4 rounded mt-4 hover:bg-teal-700">Save Test</button>
        </div>
    );
};

export default CreateTest;
