import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const SectionEditorModal = ({ section, onClose, onSave }) => {
    const { lessonId } = useParams();
    const [sectionType, setSectionType] = useState(section ? section.type : '');
    const [sectionContent, setSectionContent] = useState(section ? section.content : '');
    const [error, setError] = useState('');

    const handleSave = async () => {
        if (!sectionType || !sectionContent) {
            setError('Please fill out both type and content.');
            return;
        }

        const sectionData = {
            type: sectionType,
            content: sectionContent,
        };

        try {
            onSave(sectionData);
            setError('');
            onClose();
        } catch (error) {
            setError('Error saving the section. Please try again.');
            console.error('Error:', error);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleOverlayClick}>
            <div className="bg-gray-900 text-gray-300 p-8 rounded-lg w-3/4" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">{section ? 'Edit Section' : 'New Section'}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Section Type</label>
                    <input
                        type="text"
                        value={sectionType}
                        onChange={(e) => setSectionType(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 text-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Section Content</label>
                    <textarea
                        value={sectionContent}
                        onChange={(e) => setSectionContent(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 text-gray-300"
                    />
                </div>
                <button
                    className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 font-bold"
                    onClick={handleSave}
                >
                    Save
                </button>
                {error && (
                    <div className="mt-4 text-red-500">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionEditorModal;
