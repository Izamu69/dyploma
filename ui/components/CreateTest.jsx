import React, { useState } from 'react';
import './CreateTest.css';

const CreateTest = () => {
    const [testName, setTestName] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleAddQuestion = () => {
        setQuestions([...questions, { type: 'single', content: '', options: [] }]);
        setCurrentQuestionIndex(questions.length); // Switch to the new question
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === 'type') {
            newQuestions[index][field] = value;
            newQuestions[index].options = []; // Clear options when changing type
        } else {
            newQuestions[index][field] = value;
        }
        setQuestions(newQuestions);
    };

    const handleAddOption = (index) => {
        const newQuestions = [...questions];
        if (questions[index].type === 'matching') {
            newQuestions[index].options.push({ left: '', right: '' });
        } else {
            newQuestions[index].options.push({ text: '', isCorrect: false });
        }
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, field, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex][field] = value;
        setQuestions(newQuestions);
    };

    const handleRemoveOption = (qIndex, oIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.splice(oIndex, 1);
        setQuestions(newQuestions);
    };

    const handleSaveTest = () => {
        // Handle saving the test
        console.log('Test Saved', { testName, questions });
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleJumpToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleDeleteQuestion = (index) => {
        const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(newQuestions);
        if (index === currentQuestionIndex && newQuestions.length > 0) {
            setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (newQuestions.length === 0) {
            setCurrentQuestionIndex(0);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">Create Your Test</h1>
            <div className="mb-6">
                <label className="block text-xl font-bold mb-2">Test Name</label>
                <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
            </div>
            <button onClick={handleAddQuestion} className="bg-teal-600 text-white py-2 px-4 rounded mb-6 hover:bg-teal-700">Add Question</button>
            {questions.length > 0 && (
                <div>
                    <div className="flex justify-between mb-4">
                        <div className="text-xl font-bold mr-2">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </div>
                        <div className="space-x-2 overflow-x-auto whitespace-nowrap">
                            {questions.map((_, index) => (
                                <div key={index} className="inline-block">
                                    <button
                                        onClick={() => handleJumpToQuestion(index)}
                                        className={`py-2 px-4 rounded ${currentQuestionIndex === index ? 'bg-teal-600' : 'bg-gray-600 hover:bg-gray-700'}`}
                                    >
                                        {index + 1}
                                    </button>
                                    {currentQuestionIndex === index && (
                                        <button
                                            onClick={() => handleDeleteQuestion(index)}
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
                            <label className="block text-xl font-bold mb-2">Question</label>
                            <textarea
                                value={currentQuestion.content || ''}
                                onChange={(e) => handleQuestionChange(currentQuestionIndex, 'content', e.target.value)}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xl font-bold mb-2">Question Type</label>
                            <select
                                value={currentQuestion.type || 'single'}
                                onChange={(e) => handleQuestionChange(currentQuestionIndex, 'type', e.target.value)}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                            >
                                <option value="single">One or multiple answers</option>
                                <option value="matching">Matching Pairs</option>
                            </select>
                        </div>
                        {currentQuestion.type === 'matching' ? (
                            <div>
                                <label className="block text-xl font-bold mb-2">Matching Pairs</label>
                                {currentQuestion.options.map((option, oIndex) => (
                                    <div key={oIndex} className="flex mb-2">
                                        <input
                                            type="text"
                                            placeholder="Left"
                                            value={option.left || ''}
                                            onChange={(e) => handleOptionChange(currentQuestionIndex, oIndex, 'left', e.target.value)}
                                            className="w-1/2 p-2 mr-2 bg-gray-700 border border-gray-600 rounded"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Right"
                                            value={option.right || ''}
                                            onChange={(e) => handleOptionChange(currentQuestionIndex, oIndex, 'right', e.target.value)}
                                            className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded"
                                        />
                                        <button onClick={() => handleRemoveOption(currentQuestionIndex, oIndex)} className="bg-red-600 text-white py-2 px-4 rounded ml-2 hover:bg-red-700">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => handleAddOption(currentQuestionIndex)} className="bg-teal-600 text-white py-2 px-4 rounded mt-2 hover:bg-teal-700">Add Pair</button>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-xl font-bold mb-2">Options</label>
                                {currentQuestion.options.map((option, oIndex) => (
                                    <div key={oIndex} className="flex mb-2">
                                        <input
                                            type="text"
                                            value={option.text || ''}
                                            onChange={(e) => handleOptionChange(currentQuestionIndex, oIndex, 'text', e.target.value)}
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                                        />
                                        <input
                                            type="checkbox"
                                            checked={option.isCorrect || false}
                                            onChange={(e) => handleOptionChange(currentQuestionIndex, oIndex, 'isCorrect', e.target.checked)}
                                            className="ml-2 leading-tight accent-teal-600 rounded"
                                        />
                                        <button onClick={() => handleRemoveOption(currentQuestionIndex, oIndex)} className="bg-red-600 text-white py-2 px-4 rounded ml-2 hover:bg-red-700">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => handleAddOption(currentQuestionIndex)} className="bg-teal-600 text-white py-2 px-4 rounded mt-2 hover:bg-teal-700">Add Option</button>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between mb-4">
                        <button onClick={handlePreviousQuestion} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700" disabled={currentQuestionIndex === 0}>Previous</button>
                        <button onClick={handleNextQuestion} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700" disabled={currentQuestionIndex === questions.length - 1}>Next</button>
                    </div>
                </div>
            )}
            {questions.length > 0 && testName.trim() !== '' && (
                <button onClick={handleSaveTest} className="bg-teal-600 text-white py-2 px-4 rounded mt-6 hover:bg-teal-700">Save Test</button>
            )}
        </div>
    );
};

export default CreateTest;
