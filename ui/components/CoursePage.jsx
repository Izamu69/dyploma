import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CoursePage = () => {
    const course = {
        name: 'Foundations Course',
        overview: 'This is where it all begins! A hands-on introduction to all of the essential tools you\'ll need to build real, working websites. You\'ll learn what web developers actually do – the foundations you\'ll need for later courses.',
        sections: [
            {
                title: 'Introduction',
                lessons: [
                    { name: 'How This Course Will Work', completed: true, link: '/lesson1' },
                    { name: 'Introduction to Web Development', completed: true, link: '/lesson2' },
                    { name: 'Motivation and Mindset', completed: true, link: '/lesson3' },
                    { name: 'Asking For Help', completed: true, link: '/lesson4' },
                    { name: 'Join the Odin Community', completed: true, link: '/lesson5' },
                ],
            },
            {
                title: 'Prerequisites',
                lessons: [
                    { name: 'Computer Basics', completed: true, link: '/lesson6' },
                    { name: 'How Does the Web Work?', completed: true, link: '/lesson7' },
                    { name: 'Installation Overview', completed: true, link: '/lesson8' },
                    { name: 'Installations', completed: true, link: '/lesson9' },
                    { name: 'Text Editors', completed: true, link: '/lesson10' },
                    { name: 'Command Line Basics', completed: true, link: '/lesson11' },
                    { name: 'Setting up Git', completed: false, link: '/lesson12' },
                ],
            },
        ],
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <div className="text-center mb-8">
                <div className="inline-block bg-gray-800 p-4 rounded-full mb-4">
                    <FontAwesomeIcon icon={faBookOpen} size="3x" className="text-teal-600" />
                </div>
                <h1 className="text-4xl font-bold">{course.name}</h1>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                    <p>{course.overview}</p>
                </div>
                {course.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                        <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            {section.lessons.map((lesson, lessonIndex) => (
                                <div key={lessonIndex} className="flex justify-between items-center mb-2">
                                    <Link to={lesson.link} className="flex-grow text-left">
                                        <button className="w-full text-left text-lg bg-transparent p-4 m-0 border-none text-gray-300 hover:bg-gray-700 hover:rounded-lg">
                                            <FontAwesomeIcon icon={faBookOpen} size='lg' className="text-gray-600" /> {lesson.name}
                                        </button>
                                    </Link>
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className={`ml-2 ${lesson.completed ? 'text-teal-600' : 'text-gray-500'}`}
                                        size="2x"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursePage;
