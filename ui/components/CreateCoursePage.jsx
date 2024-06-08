import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPlusCircle, faFile } from '@fortawesome/free-solid-svg-icons';

const CreateCoursePage = () => {
    const [courseName, setCourseName] = useState('');
    const [lessons, setLessons] = useState([{ name: '', completed: false }]);
    const [tests, setTests] = useState([{ name: '', questions: [] }]);
    const [files, setFiles] = useState([]);
    const [authorId, setAuthorId] = useState('');

    useEffect(() => {
        // Retrieve user ID from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id) {
            setAuthorId(user._id);
        }
    }, []);

    const handleLessonNameChange = (index, event) => {
        const newLessons = [...lessons];
        newLessons[index].name = event.target.value;
        setLessons(newLessons);
    };

    const handleAddLesson = () => {
        setLessons([...lessons, { name: '', completed: false }]);
    };

    const handleTestNameChange = (index, event) => {
        const newTests = [...tests];
        newTests[index].name = event.target.value;
        setTests(newTests);
    };

    const handleAddTest = () => {
        setTests([...tests, { name: '', questions: [] }]);
    };

    const handleFileUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files);
        setFiles([...files, ...uploadedFiles]);
    };

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
                    lessons,
                    tests,
                    files: files.map(file => file.name),
                    authorId, // Include author ID in the request payload
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Course created successfully:', data.course);
                // Redirect to the course details page or perform any other action
            } else {
                console.error('Failed to create course:', data.message);
                // Handle error, display message to user, etc.
            }
        } catch (error) {
            console.error('Error creating course:', error);
            // Handle error, display message to user, etc.
        }
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">Create a New Course</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-xl font-bold mb-2">Course Name</label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                    />
                </div>
                <button type="submit" className="bg-teal-600 text-gray-100 rounded-lg px-6 py-3 mt-6 hover:bg-teal-700 font-bold">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCoursePage;
