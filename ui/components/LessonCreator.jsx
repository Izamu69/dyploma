import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

const LessonCreator = () => {
    const { courseId } = useParams();
    const [lessonName, setLessonName] = useState('');
    const [sectionArrays, setSectionArrays] = useState([[]]);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [additionalResources, setAdditionalResources] = useState([]);
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();
    const [authorId, setAuthorId] = useState('');

    useEffect(() => {
        // Retrieve user ID from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id) {
            setAuthorId(user._id);
        }
    }, []);

    const handleAddTest = () => {
        navigate('/createtest');
    };

    const handleAddSection = () => {
        setSectionArrays([...sectionArrays, []]);
        setCurrentSectionIndex(sectionArrays.length);
    };

    const handleAddSectionItem = () => {
        const newSectionArrays = [...sectionArrays];
        newSectionArrays[currentSectionIndex].push({ type: 'text', content: '' });
        setSectionArrays(newSectionArrays);
    };

    const handleSectionItemChange = (sectionIndex, itemIndex, field, value) => {
        const newSectionArrays = [...sectionArrays];
        newSectionArrays[currentSectionIndex][itemIndex][field] = value;
        setSectionArrays(newSectionArrays);
    };

    const handleDeleteSection = (index) => {
        const newSectionArrays = sectionArrays.filter((_, sIndex) => sIndex !== index);
        setSectionArrays(newSectionArrays);
        if (index === currentSectionIndex && newSectionArrays.length > 0) {
            setCurrentSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (newSectionArrays.length === 0) {
            setCurrentSectionIndex(0);
        }
    };

    const handleNextSection = () => {
        setCurrentSectionIndex((prevIndex) => Math.min(prevIndex + 1, sectionArrays.length - 1));
    };

    const handlePreviousSection = () => {
        setCurrentSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleJumpToSection = (index) => {
        setCurrentSectionIndex(index);
    };

    const handleAddResource = (file) => {
        setAdditionalResources([...additionalResources, file]);
    };

    const handleSaveLesson = () => {
        fetch('http://localhost:3000/lessons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lessonName,
                sections: sectionArrays,
                additionalResources,
                tests,
                authorId,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save lesson');
                }
                return response.json();
            })
            .then(data => {
                console.log('Lesson Saved', data);
                const lessonId = data.lesson._id;
                fetch(`http://localhost:3000/${courseId}/lessons`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        lessonId,
                    }),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update course');
                        }
                        return response.json();
                    })
                    .then(updatedCourse => {
                        console.log('Course updated', updatedCourse);
                        navigate(`/course/${courseId}`);
                    })
                    .catch(error => {
                        console.error('Error updating course', error);
                    });
            })
            .catch(error => {
                console.error('Error saving lesson', error);
            });
    };

    const currentSectionArray = sectionArrays[currentSectionIndex];

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">Create Your Lesson</h1>
            <div className="mb-6">
                <label className="block text-xl font-bold mb-2">Lesson Name</label>
                <input
                    type="text"
                    value={lessonName}
                    onChange={(e) => setLessonName(e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
            </div>
            <button onClick={handleAddSection} className="bg-teal-600 text-white py-2 px-4 rounded mb-6 hover:bg-teal-700">Add Section</button>
            {sectionArrays.length > 0 && (
                <div>
                    <div className="flex justify-between mb-4">
                        <div className="text-xl font-bold mr-2">
                            Section {currentSectionIndex + 1} of {sectionArrays.length}
                        </div>
                        <div className="space-x-2 overflow-x-auto whitespace-nowrap">
                            {sectionArrays.map((_, index) => (
                                <div key={index} className="inline-block">
                                    <button
                                        onClick={() => handleJumpToSection(index)}
                                        className={`py-2 px-4 rounded ${currentSectionIndex === index ? 'bg-teal-600' : 'bg-gray-600 hover:bg-gray-700'}`}
                                    >
                                        {index + 1}
                                    </button>
                                    {currentSectionIndex === index && (
                                        <button
                                            onClick={() => handleDeleteSection(index)}
                                            className="ml-1 py-2 px-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='bg-gray-800 p-6 rounded-lg mb-4 border border-gray-600'>
                        <button onClick={handleAddSectionItem} className="bg-teal-600 text-white py-2 px-4 rounded mb-6 hover:bg-teal-700">Add Item</button>
                        {currentSectionArray.map((item, itemIndex) => (
                            <div key={itemIndex} className='mb-4'>
                                <div className="mb-4">
                                    <label className="block text-xl font-bold mb-2">Item Type</label>
                                    <select
                                        value={item.type}
                                        onChange={(e) => handleSectionItemChange(currentSectionIndex, itemIndex, 'type', e.target.value)}
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                                    >
                                        <option value="text">Text</option>
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xl font-bold mb-2">Item Content</label>
                                    {item.type === 'text' ? (
                                        <textarea
                                            value={item.content || ''}
                                            onChange={(e) => handleSectionItemChange(currentSectionIndex, itemIndex, 'content', e.target.value)}
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                                        ></textarea>
                                    ) : item.type === 'image' ? (
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleSectionItemChange(currentSectionIndex, itemIndex, 'content', e.target.files[0])}
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                                        />
                                    ) : item.type === 'video' ? (
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => handleSectionItemChange(currentSectionIndex, itemIndex, 'content', e.target.files[0])}
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={item.content || ''}
                                            onChange={(e) => handleSectionItemChange(currentSectionIndex, itemIndex, 'content', e.target.value)}
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mb-4">
                        <button onClick={handlePreviousSection} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700" disabled={currentSectionIndex === 0}>Previous</button>
                        <button onClick={handleNextSection} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700" disabled={currentSectionIndex === sectionArrays.length - 1}>Next</button>
                    </div>
                </div>
            )}
            <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4 flex justify-center gap-2">
                    Tests
                    <button onClick={handleAddTest} className="text-gray-300 hover:text-gray-400">
                        <FontAwesomeIcon icon={faPlus} size="lg" />
                    </button>
                </h3>
                {tests.length === 0 ? (
                    <p className="text-gray-500">No tests added yet.</p>
                ) : (
                    tests.map((test, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4 border border-gray-600">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg">{test.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleViewTest(test)}
                                        className="text-gray-300 hover:text-gray-400"
                                    >
                                        <FontAwesomeIcon icon={faEye} size="lg" />
                                    </button>
                                    <button
                                        onClick={() => handleEditTest(test)}
                                        className="text-gray-300 hover:text-gray-400"
                                    >
                                        <FontAwesomeIcon icon={faEdit} size="lg" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTest(index)}
                                        className="text-gray-300 hover:text-gray-400"
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="mb-6">
                <label className="block text-xl font-bold mb-2">Additional Resources</label>
                <input
                    type="file"
                    onChange={(e) => handleAddResource(e.target.files[0])}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <ul className="mt-2">
                    {additionalResources.map((resource, index) => (
                        <li key={index} className="bg-gray-700 p-2 rounded mt-1">
                            {resource.name}
                        </li>
                    ))}
                </ul>
            </div>
            {sectionArrays.length > 0 && lessonName.trim() !== '' && (
                <button onClick={handleSaveLesson} className="bg-teal-600 text-white py-2 px-4 rounded mt-6 hover:bg-teal-700">Save Lesson</button>
            )}
        </div>
    );
};

export default LessonCreator;