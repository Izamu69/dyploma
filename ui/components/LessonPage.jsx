import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faClipboardList, faEdit, faCheckCircle, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import './LessonPage.css';

const LessonPage = () => {
    const { courseId, lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTestsOpen, setIsTestsOpen] = useState(false);
    const testsRef = React.useRef(null);
    const [isLessonComplete, setIsLessonComplete] = useState(false);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

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

                const testPromises = data.lesson.testIds
                    .filter((testId) => testId !== null && testId !== undefined)
                    .map(async (testId) => {
                        const testResponse = await fetch(`http://localhost:3000/tests/${testId}`);
                        const testData = await testResponse.json();
                        return testData.test;
                    });
                const fetchedTests = await Promise.all(testPromises);
                setTests(fetchedTests);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchLessonData();
    }, [lessonId]);

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3000/users/${userId}/info`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data.user.enrolledCourses);

                    if (data && data.user && data.user.enrolledCourses) {
                        const completedLessons = data.user.enrolledCourses.reduce((acc, course) => {
                            return acc.concat(course.completedLessons);
                        }, []);

                        const isLessonCompleted = completedLessons.some(completedLesson =>
                            completedLesson._id === lessonId
                        );
                        setIsLessonComplete(isLessonCompleted);
                    } else {
                        console.error('Error: User data or completed lessons not available');
                    }
                })
                .catch(error => console.error('Error fetching user info:', error));
        }
    }, [userId, lessonId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleMarkComplete = async () => {
        if (userId) {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}/markLessonComplete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ courseId, lessonId })
                });
                if (response.ok) {
                    setIsLessonComplete(true);
                } else {
                    throw new Error('Failed to mark lesson as complete');
                }
            } catch (error) {
                console.error('Error marking lesson as complete:', error);
            }
        }
    };

    const handleViewCourse = () => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            {lesson && (
                <>
                    <div className="text-center mb-8">
                        <div className="inline-block bg-gray-800 p-4 rounded-full mb-4">
                            <FontAwesomeIcon icon={faBookOpen} size="3x" className="text-teal-600" />
                        </div>
                        <h1 className="text-4xl font-bold">{lesson.lessonName}</h1>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {lesson.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="bg-gray-800 p-6 rounded-lg mb-4">
                                {section.map((subSection, subSectionIndex) => (
                                    <div key={subSectionIndex} className="mb-4">
                                        <h3 className="text-2xl font-bold mb-2">{subSection.type}</h3>
                                        <div dangerouslySetInnerHTML={{ __html: subSection.content }}></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <div className="bg-gray-800 p-4 rounded-lg mb-4">
                            <button
                                className="w-full text-left text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg"
                                onClick={() => setIsTestsOpen(!isTestsOpen)}
                            >
                                <FontAwesomeIcon icon={faClipboardList} size="lg" className="text-gray-600" /> Tests
                            </button>
                            <CSSTransition
                                in={isTestsOpen}
                                timeout={300}
                                classNames="section"
                                unmountOnExit
                                nodeRef={testsRef}
                            >
                                <div className="p-4" ref={testsRef}>
                                    {tests.map((test, index) => (
                                        <div key={index} className="flex justify-between items-center mb-2">
                                            <Link to={`/test/${test._id}`} className="flex-grow text-left">
                                                <button className="w-full text-left text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                                    <FontAwesomeIcon
                                                        icon={faClipboardList}
                                                        size="lg"
                                                        className="text-gray-600"
                                                    />{' '}
                                                    {test.testName}
                                                </button>
                                            </Link>
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className={`ml-2 ${test.completed ? 'text-teal-600' : 'text-gray-500'}`}
                                                size="2x"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CSSTransition>
                        </div>
                        {lesson.files && lesson.files.length > 0 && (
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-2xl font-bold mb-4">Files</h3>
                                <ul>
                                    {lesson.files.map((file, index) => (
                                        <li key={index}>
                                            <a href={file} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                                                {file}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="flex flex-row mt-8 text-center">
                            <button
                                className='px-4 py-2 text-lg font-bold rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 mr-6'
                                onClick={handleViewCourse}
                            >
                                <FontAwesomeIcon icon={faGraduationCap} size="lg" className="mr-2" />
                                {'View Course'}
                            </button>
                            <button
                                className={`px-4 py-2 text-lg font-bold rounded-lg ${isLessonComplete ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                                onClick={handleMarkComplete}
                                disabled={isLessonComplete}
                            >
                                <FontAwesomeIcon icon={faCheckCircle} size="lg" className="mr-2" />
                                {isLessonComplete ? 'Lesson Completed' : 'Mark Complete'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LessonPage;