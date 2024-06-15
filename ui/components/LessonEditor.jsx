import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SectionEditorModal from './SectionEditorModal';
import TestSelectorModal from './TestSelectorModal';

const LessonEditor = () => {
    const { courseId, lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [tests, setTests] = useState([]);
    const [availableTests, setAvailableTests] = useState([]);
    const [lessonName, setLessonName] = useState('');
    const [sections, setSections] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTestSelectorOpen, setIsTestSelectorOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(null);
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserId(userData._id);
        }
    }, []);

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/lessons/${lessonId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch lesson data');
                }
                const data = await response.json();
                setLesson(data.lesson);
                setLessonName(data.lesson.lessonName);
                setSections(data.lesson.sections);

                const testPromises = data.lesson.testIds
                    .filter((testId) => testId !== null && testId !== undefined)
                    .map(async (testId) => {
                        const testResponse = await fetch(`http://localhost:3000/tests/${testId}`);
                        const testData = await testResponse.json();
                        return testData.test;
                    });
                const fetchedTests = await Promise.all(testPromises);
                setTests(fetchedTests);

                const availableTestsResponse = await fetch(`http://localhost:3000/tests?authorId=${userId}`);
                if (!availableTestsResponse.ok) {
                    throw new Error('Failed to fetch available tests');
                }
                const availableTestsData = await availableTestsResponse.json();
                setAvailableTests(availableTestsData.tests);
            } catch (error) {
                console.error('Error fetching lesson data:', error);
            }
        };

        fetchLessonData();
    }, [lessonId, userId]);

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3000/lessons/${lessonId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lessonName, sections, testIds: tests.map(test => test._id) }),
            });

            if (!response.ok) {
                throw new Error('Failed to save lesson');
            }

            const updatedLesson = await response.json();
            setLesson(updatedLesson.lesson);
            setIsEditing(false);
            navigate(`/course/${courseId}`);
        } catch (error) {
            console.error('Error saving lesson:', error);
        }
    };

    const handleEditSection = (index) => {
        setCurrentSection(sections.flat()[index]);
        setCurrentSectionIndex(index);
        setIsModalOpen(true);
    };

    const handleDeleteSection = (index) => {
        const updatedSections = sections.filter((_, i) => i !== index);
        setSections(updatedSections);
    };

    const handleAddSection = () => {
        setCurrentSection(null);
        setCurrentSectionIndex(null);
        setIsModalOpen(true);
    };

    const handleSaveSection = (section) => {
        const updatedSections = [...sections];
        if (currentSectionIndex === null) {
            updatedSections.push(section);
        } else {
            updatedSections[currentSectionIndex] = section;
        }
        setSections(updatedSections);
    };

    const handleSelectTest = async (testId) => {
        try {
            const response = await fetch(`http://localhost:3000/tests/${testId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch test data');
            }
            const testData = await response.json();
            setTests([...tests, testData.test]);
            handleCloseTestSelector();
        } catch (error) {
            console.error('Error adding test:', error);
        }
    };

    const handleOpenTestSelector = () => {
        setIsTestSelectorOpen(true);
    };

    const handleCloseTestSelector = () => {
        setIsTestSelectorOpen(false);
    };

    const handleDeleteTest = (index) => {
        const updatedTests = tests.filter((_, i) => i !== index);
        setTests(updatedTests);
    };

    return (
        <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto bg-gray-900 text-gray-300">
            <div className="w-full md:w-1/4 bg-gray-900 p-4">
                <h2 className="text-2xl font-bold mb-4">Sections</h2>
                <ul>
                    {sections.flat().map((section, index) => (
                        <li key={index} className="mb-2">
                            <div className="flex justify-between items-center p-2 bg-gray-700 rounded hover:bg-gray-600">
                                <span>{section.type}</span>
                                <div>
                                    <button
                                        className="bg-teal-600 text-white py-1 px-2 rounded hover:bg-teal-700 mr-2"
                                        onClick={() => handleEditSection(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                                        onClick={() => handleDeleteSection(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    className="bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700 mt-4"
                    onClick={handleAddSection}
                >
                    Create New Section
                </button>
                <h2 className="text-2xl font-bold mb-4 mt-8">Tests</h2>
                <ul>
                    {tests.map((test, index) => (
                        <li key={index} className="mb-2">
                            <div className="flex justify-between items-center p-2 bg-gray-700 rounded hover:bg-gray-600">
                                <span>{test.testName}</span>
                                <div>
                                    <button
                                        className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                                        onClick={() => handleDeleteTest(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    className="bg-gray-700 text-white py-1 px-2 rounded hover:bg-gray-600 mt-4"
                    onClick={handleOpenTestSelector}
                >
                    Add a test
                </button>
            </div>
            <div className="w-full md:w-3/4 p-4">
                <h1 className="text-4xl font-bold mb-8">Lesson Editor</h1>
                {lesson ? (
                    <div>
                        <input
                            type="text"
                            value={lessonName}
                            onChange={(e) => setLessonName(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4"
                            placeholder="Lesson Name"
                        />
                        {sections.length > 0 ? (
                            <div>
                                {sections.flat().map((section, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="text-xl font-bold">{section.type}</h3>
                                        <p className="whitespace-pre-wrap">{section.content}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No sections available</p>
                        )}
                        <button
                            onClick={handleSave}
                            className="bg-teal-600 text-white py-2 px-4 rounded mt-4 hover:bg-teal-700 font-bold"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {isModalOpen && (
                <SectionEditorModal
                    section={currentSection}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveSection}
                />
            )}
            {isTestSelectorOpen && (
                <TestSelectorModal
                    availableTests={availableTests}
                    onClose={handleCloseTestSelector}
                    onSelectTest={handleSelectTest}
                />
            )}
        </div>
    );
};

export default LessonEditor;
