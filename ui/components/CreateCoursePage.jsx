import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBookOpen, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CreateCoursePage = () => {
    const [courseName, setCourseName] = useState('');
    const [courseOverview, setCourseOverview] = useState('');
    const [sections, setSections] = useState([
        { title: '', lessons: [{ name: '', completed: false, link: '' }] }
    ]);

    const handleSectionTitleChange = (index, event) => {
        const newSections = [...sections];
        newSections[index].title = event.target.value;
        setSections(newSections);
    };

    const handleLessonNameChange = (sectionIndex, lessonIndex, event) => {
        const newSections = [...sections];
        newSections[sectionIndex].lessons[lessonIndex].name = event.target.value;
        setSections(newSections);
    };

    const handleAddSection = () => {
        setSections([...sections, { title: '', lessons: [{ name: '', completed: false, link: '' }] }]);
    };

    const handleAddLesson = (sectionIndex) => {
        const newSections = [...sections];
        newSections[sectionIndex].lessons.push({ name: '', completed: false, link: '' });
        setSections(newSections);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, e.g., send data to backend
        console.log({ courseName, courseOverview, sections });
    };

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">Create a New Course</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="courseName" className="block text-lg mb-2">Course Name</label>
                    <input type="text" id="courseName" className="w-full bg-gray-800 text-gray-300 border-none rounded-lg p-4" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label htmlFor="courseOverview" className="block text-lg mb-2">Course Overview</label>
                    <textarea id="courseOverview" className="w-full h-32 bg-gray-800 text-gray-300 border-none rounded-lg p-4" value={courseOverview} onChange={(e) => setCourseOverview(e.target.value)} />
                </div>
                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                        <label htmlFor={`sectionTitle${sectionIndex}`} className="block text-lg mb-2">Section Title</label>
                        <input type="text" id={`sectionTitle${sectionIndex}`} className="w-full bg-gray-800 text-gray-300 border-none rounded-lg p-4 mb-2" value={section.title} onChange={(e) => handleSectionTitleChange(sectionIndex, e)} />
                        {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex justify-between items-center mb-2">
                                <input type="text" className="flex-grow bg-gray-800 text-gray-300 border-none rounded-lg p-4 mr-2" placeholder="Lesson Name" value={lesson.name} onChange={(e) => handleLessonNameChange(sectionIndex, lessonIndex, e)} />
                                <FontAwesomeIcon icon={faCheckCircle} className={`ml-2 ${lesson.completed ? 'text-teal-600' : 'text-gray-500'}`} size="2x" />
                            </div>
                        ))}
                        <button type="button" className="bg-transparent text-gray-300 border-none hover:text-teal-600" onClick={() => handleAddLesson(sectionIndex)}>
                            <FontAwesomeIcon icon={faPlusCircle} /> Add Lesson
                        </button>
                    </div>
                ))}
                <button type="button" className="bg-transparent text-gray-300 border-none hover:text-teal-600 mr-6" onClick={handleAddSection}>
                    <FontAwesomeIcon icon={faPlusCircle} /> Add Section
                </button>
                <button type="submit" className="bg-teal-600 text-gray-100 rounded-lg px-6 py-3 mt-6">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCoursePage;
