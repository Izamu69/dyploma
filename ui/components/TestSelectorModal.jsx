import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

const TestSelectorModal = ({ availableTests, onClose, onSelectTest }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center" onClick={handleOverlayClick}>
            <div className="bg-gray-900 p-4 rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">Select a Test</h2>
                <ul>
                    {availableTests.map(test => (
                        <li key={test._id} className="mb-2">
                            <button
                                className="bg-gray-700 text-white py-1 px-2 rounded hover:bg-gray-600 w-full text-left font-bold text-xl"
                                onClick={() => onSelectTest(test._id)}
                            >
                                <FontAwesomeIcon icon={faClipboardList} size="xl" className="text-teal-600 mr-2" /> {test.testName}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TestSelectorModal;
