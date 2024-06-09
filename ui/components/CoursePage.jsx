import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBookOpen, faFileAlt, faClipboardList, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import './CoursePage.css';

const CoursePage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);
    const navigate = useNavigate();

    const [isLessonsOpen, setIsLessonsOpen] = useState(true);
    const [isTestsOpen, setIsTestsOpen] = useState(true);
    const [isFilesOpen, setIsFilesOpen] = useState(true);

    const lessonsRef = useRef(null);
    const testsRef = useRef(null);
    const filesRef = useRef(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/courses/${courseId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch course data');
                }
                const data = await response.json();
                setCourse(data.course);

                const lessonPromises = data.course.lessonIds
                    .filter((lessonId) => lessonId !== null && lessonId !== undefined)
                    .map(async (lessonId) => {
                        const lessonResponse = await fetch(`http://localhost:3000/lessons/${lessonId}`);
                        const lessonData = await lessonResponse.json();
                        return lessonData.lesson;
                    });
                const lessons = await Promise.all(lessonPromises);

                const testPromises = data.course.testIds
                    .filter((testId) => testId !== null && testId !== undefined)
                    .map(async (testId) => {
                        const testResponse = await fetch(`http://localhost:3000/tests/${testId}`);
                        const testData = await testResponse.json();
                        return testData.test;
                    });
                const tests = await Promise.all(testPromises);

                setCourse((prevCourse) => ({ ...prevCourse, lessons, tests }));

                setLoading(false);

                const userDataString = localStorage.getItem('user');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    const userId = userData._id;
                    setIsAuthor(userId === data.course.authorId);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleAddLesson = () => {
        navigate(`/course/${courseId}/createlesson`);
    };

    const handleAddTest = () => {
        navigate("/createtest");
    };

    const handleEditLesson = (lesson) => {
        navigate(`/lesson/${lesson._id}/edit`);
    };

    const handleEditTest = (test) => {
        navigate(`/test/${test._id}/edit`);
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            {course && (
                <>
                    <div className="text-center mb-8">
                        <div className="inline-block bg-gray-800 p-4 rounded-full mb-4">
                            <FontAwesomeIcon icon={faBookOpen} size="3x" className="text-teal-600" />
                        </div>
                        <h1 className="text-4xl font-bold">{course.courseName}</h1>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <h3
                                className="text-2xl font-bold mb-4 cursor-pointer flex justify-center gap-2"
                                onClick={() => setIsLessonsOpen(!isLessonsOpen)}
                            >
                                Lessons
                                {isAuthor && (
                                    <button onClick={handleAddLesson} className="text-gray-300 hover:text-gray-400">
                                        <FontAwesomeIcon icon={faPlus} size="lg" />
                                    </button>
                                )}
                            </h3>
                            {course.lessons && (
                                <CSSTransition
                                    in={isLessonsOpen}
                                    timeout={300}
                                    classNames="section"
                                    unmountOnExit
                                    nodeRef={lessonsRef}
                                >
                                    <div className="bg-gray-800 p-4 rounded-lg" ref={lessonsRef}>
                                        {course.lessons.map((lesson, index) => (
                                            <div key={index} className="flex justify-between items-center mb-2">
                                                <Link to={`/lesson/${lesson._id}`} className="flex-grow text-left">
                                                    <button className="w-full text-left text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                                        <FontAwesomeIcon
                                                            icon={faBookOpen}
                                                            size="lg"
                                                            className="text-gray-600"
                                                        />{' '}
                                                        {lesson.lessonName}
                                                    </button>
                                                </Link>
                                                {isAuthor && (
                                                    <button onClick={() => handleEditLesson(lesson)} className="text-gray-300 hover:text-gray-400">
                                                        <FontAwesomeIcon icon={faEdit} size="lg" />
                                                    </button>
                                                )}
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className={`ml-2 ${lesson.completed ? 'text-teal-600' : 'text-gray-500'}`}
                                                    size="2x"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </CSSTransition>
                            )}
                        </div>
                        <div className="mb-6">
                            <h3
                                className="text-2xl font-bold mb-4 cursor-pointer flex justify-center gap-2"
                                onClick={() => setIsTestsOpen(!isTestsOpen)}
                            >
                                Tests
                                {isAuthor && (
                                    <button onClick={handleAddTest} className="text-gray-300 hover:text-gray-400">
                                        <FontAwesomeIcon icon={faPlus} size="lg" />
                                    </button>
                                )}
                            </h3>
                            {course.tests && (
                                <CSSTransition
                                    in={isTestsOpen}
                                    timeout={300}
                                    classNames="section"
                                    unmountOnExit
                                    nodeRef={testsRef}
                                >
                                    <div className="bg-gray-800 p-4 rounded-lg" ref={testsRef}>
                                        {course.tests.map((test, index) => (
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
                                                {isAuthor && (
                                                    <button onClick={() => handleEditTest(test)} className="text-gray-300 hover:text-gray-400">
                                                        <FontAwesomeIcon icon={faEdit} size="lg" />
                                                    </button>
                                                )}
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className={`ml-2 ${test.completed ? 'text-teal-600' : 'text-gray-500'}`}
                                                    size="2x"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </CSSTransition>
                            )}
                        </div>
                        <div className="mb-6">
                            <h3
                                className="text-2xl font-bold mb-4 cursor-pointer flex justify-center gap-2"
                                onClick={() => setIsFilesOpen(!isFilesOpen)}
                            >
                                Additional Resources
                                {isAuthor && (
                                    <button onClick={() => handleAddResource()} className="text-gray-300 hover:text-gray-400">
                                        <FontAwesomeIcon icon={faPlus} size="lg" />
                                    </button>
                                )}
                            </h3>
                            {course.files && (
                                <CSSTransition
                                    in={isFilesOpen}
                                    timeout={300}
                                    classNames="section"
                                    unmountOnExit
                                    nodeRef={filesRef}
                                >
                                    <div className="bg-gray-800 p-4 rounded-lg" ref={filesRef}>
                                        {course.files.map((file, index) => (
                                            <div key={index} className="flex justify-between items-center mb-2">
                                                <a
                                                    href={file.link}
                                                    className="flex-grow text-left"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <button className="w-full text-left text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                                        <FontAwesomeIcon
                                                            icon={faFileAlt}
                                                            size="lg"
                                                            className="text-gray-600"
                                                        />{' '}
                                                        {file.name}
                                                    </button>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </CSSTransition>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CoursePage;
