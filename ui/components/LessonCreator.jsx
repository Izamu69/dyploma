import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LessonCreator = () => {
    const [lessonName, setLessonName] = useState('');
    const [authorId, setAuthorId] = useState('');
    const navigate = useNavigate();
    const { courseId } = useParams();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id) {
            setAuthorId(user._id);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const lessonResponse = await fetch('http://localhost:3000/lessons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lessonName,
                    authorId,
                }),
            });

            const lessonData = await lessonResponse.json();
            if (lessonResponse.ok) {
                console.log('Lesson created successfully:', lessonData.lesson);

                const courseResponse = await fetch(`http://localhost:3000/${courseId}/lessons`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        lessonId: lessonData.lesson._id,
                    }),
                });

                const courseData = await courseResponse.json();
                if (courseResponse.ok) {
                    console.log('Course updated successfully:', courseData.course);
                    navigate(`/course/${courseId}`);
                } else {
                    console.error('Failed to update course:', courseData.message);
                }
            } else {
                console.error('Failed to create lesson:', lessonData.message);
            }
        } catch (error) {
            console.error('Error creating lesson or updating course:', error);
        }
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8 max-w-screen-xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Create a New Lesson</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-xl font-bold mb-2">Lesson Name</label>
                    <input
                        type="text"
                        value={lessonName}
                        onChange={(e) => setLessonName(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-teal-600 text-gray-100 rounded-lg px-6 py-3 mt-6 hover:bg-teal-700 font-bold">
                    Create Lesson
                </button>
            </form>
        </div>
    );
};

export default LessonCreator;
