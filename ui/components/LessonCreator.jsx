import React, { useState } from 'react';

const LessonCreator = () => {
    const [lessonName, setLessonName] = useState('');
    const [sections, setSections] = useState([]);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [additionalResources, setAdditionalResources] = useState([]);

    const handleAddSection = () => {
        setSections([...sections, { title: '', content: '' }]);
        setCurrentSectionIndex(sections.length); // Switch to the new section
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = [...sections];
        newSections[index][field] = value;
        setSections(newSections);
    };

    const handleDeleteSection = (index) => {
        const newSections = sections.filter((_, sIndex) => sIndex !== index);
        setSections(newSections);
        if (index === currentSectionIndex && newSections.length > 0) {
            setCurrentSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (newSections.length === 0) {
            setCurrentSectionIndex(0);
        }
    };

    const handleNextSection = () => {
        setCurrentSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1));
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
        // Handle saving the lesson
        console.log('Lesson Saved', { lessonName, sections, additionalResources });
    };

    const currentSection = sections[currentSectionIndex];

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
            {sections.length > 0 && (
                <div>
                    <div className="flex justify-between mb-4">
                        <div className="text-xl font-bold mr-2">
                            Section {currentSectionIndex + 1} of {sections.length}
                        </div>
                        <div className="space-x-2 overflow-x-auto whitespace-nowrap">
                            {sections.map((_, index) => (
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
                        <div className="mb-4">
                            <label className="block text-xl font-bold mb-2">Section Title</label>
                            <input
                                type="text"
                                value={currentSection.title || ''}
                                onChange={(e) => handleSectionChange(currentSectionIndex, 'title', e.target.value)}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xl font-bold mb-2">Section Content</label>
                            <textarea
                                value={currentSection.content || ''}
                                onChange={(e) => handleSectionChange(currentSectionIndex, 'content', e.target.value)}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-between mb-4">
                        <button onClick={handlePreviousSection} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700" disabled={currentSectionIndex === 0}>Previous</button>
                        <button onClick={handleNextSection} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700" disabled={currentSectionIndex === sections.length - 1}>Next</button>
                    </div>
                </div>
            )}
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
            {sections.length > 0 && lessonName.trim() !== '' && (
                <button onClick={handleSaveLesson} className="bg-teal-600 text-white py-2 px-4 rounded mt-6 hover:bg-teal-700">Save Lesson</button>
            )}
        </div>
    );
};

export default LessonCreator;
