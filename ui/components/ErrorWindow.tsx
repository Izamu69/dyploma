import React from 'react';

const ErrorWindow = ({ errorMessage, onClose }) => {
    if (!errorMessage) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-red-700 text-white p-6 rounded-lg w-1/2 max-w-lg">
                <h2 className="text-xl font-bold mb-4">Error</h2>
                <p className="mb-4">{errorMessage}</p>
                <button
                    className="bg-white text-red-700 py-2 px-4 rounded hover:bg-gray-200 font-bold"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ErrorWindow;
