import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCoursePage = () => {
    const [courseName, setCourseName] = useState('');
    const [authorId, setAuthorId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id) {
            setAuthorId(user._id);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseName,
                    authorId,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Course created successfully:', data.course);
                navigate(`/course/${data.course._id}`);
            } else {
                console.error('Failed to create course:', data.message);
            }
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8 max-w-screen-xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Create a New Course</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-xl font-bold mb-2">Course Name</label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-teal-600 text-gray-100 rounded-lg px-6 py-3 mt-6 hover:bg-teal-700 font-bold">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCoursePage;
