import React, { useState } from 'react';
import ErrorWindow from './ErrorWindow';
import { useParams } from 'react-router-dom';

const QuestionEditorModal = ({ question, onClose, currentQuestionIds }) => {
    const { testId } = useParams();
    const [questionText, setQuestionText] = useState(question ? question.question || '' : '');
    const [subquestions, setSubquestions] = useState(question ? question.subquestions || [] : []);
    const [answers, setAnswers] = useState(question ? question.answers || [] : []);
    const [suiTable, setSuiTable] = useState(question ? question.suiTable || false : false);
    const [error, setError] = useState('');

    const handleAddSubquestion = () => {
        setSubquestions([...subquestions, { content: '' }]);
    };

    const handleAddAnswer = () => {
        setAnswers([...answers, { content: '' }]);
    };

    const handleSave = async () => {
        if (!questionText) {
            setError('Please specify the main question.');
            return;
        }
        if (answers.length === 0) {
            setError('Please add at least one answer.');
            return;
        }
        if (suiTable && subquestions.length > answers.length) {
            setError('In table mode, there cannot be more subquestions than answers.');
            return;
        }

        const questionData = {
            question: questionText,
            subquestions: subquestions,
            answers: answers,
            suiTable: suiTable
        };

        try {
            let response;
            let created = false;
            if (question) {
                // If the question exists (editing existing question), send a PATCH request
                response = await fetch(`http://localhost:3000/questions/${question._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(questionData),
                });
            } else {
                // If the question is null (creating new question), send a POST request
                response = await fetch(`http://localhost:3000/questions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(questionData),
                });
                created=true;
            }

            if (!response.ok) {
                throw new Error('Failed to save question');
            }

            const data = await response.json();
            // Update the test with the new question's ID
            if (created && data.question?._id) {
                const updatedQuestionIds = [...currentQuestionIds, data.question._id];
                const resp = await fetch(`http://localhost:3000/tests/${testId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ questionIds: updatedQuestionIds }),
                });
            }

            setError('');
            onClose();
        } catch (error) {
            setError('Error saving the question. Please try again.');
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
                <h2 className="text-2xl font-bold mb-4">Edit Question: {question ? question.label : 'New Question'}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Question</label>
                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 text-gray-300"
                    />
                </div>
                <div className="mb-4 flex justify-between">
                    <div className="w-1/2 pr-2">
                        <label className="block text-sm font-medium mb-2">Subquestions</label>
                        {subquestions.map((subquestion, index) => (
                            <div key={index} className="mb-2 flex items-center">
                                <input
                                    type="text"
                                    value={subquestion.content}
                                    onChange={(e) => {
                                        const newSubquestions = [...subquestions];
                                        newSubquestions[index] = { ...newSubquestions[index], content: e.target.value };
                                        setSubquestions(newSubquestions);
                                    }}
                                    className="w-full p-2 rounded bg-gray-800 text-gray-300"
                                />
                                <button
                                    onClick={() => {
                                        const newSubquestions = subquestions.filter((_, i) => i !== index);
                                        setSubquestions(newSubquestions);
                                    }}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddSubquestion}
                            className="mt-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 font-bold"
                        >
                            Add Subquestion
                        </button>
                    </div>
                    <div className="w-1/2 pl-2">
                        <label className="block text-sm font-medium mb-2">Answers</label>
                        {answers.map((answer, index) => (
                            <div key={index} className="mb-2 flex items-center">
                                <input
                                    type="text"
                                    value={answer.content || ''}
                                    onChange={(e) => {
                                        const newAnswers = [...answers];
                                        newAnswers[index] = { ...newAnswers[index], content: e.target.value };
                                        setAnswers(newAnswers);
                                    }}
                                    className="w-full p-2 rounded bg-gray-800 text-gray-300"
                                />
                                <button
                                    onClick={() => {
                                        const newAnswers = answers.filter((_, i) => i !== index);
                                        setAnswers(newAnswers);
                                    }}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddAnswer}
                            className="mt-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 font-bold"
                        >
                            Add Answer
                        </button>
                    </div>
                </div>
                <div className="flex items-center">
                    <label className="text-sm font-medium mr-4">Table Mode</label>
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={suiTable}
                            onChange={() => setSuiTable(!suiTable)}
                            className="form-checkbox h-5 w-5 accent-teal-600"
                        />
                    </div>
                </div>
                <button
                    className="bg-teal-600 text-white py-2 px-4 rounded mt-6 hover:bg-teal-700 font-bold"
                    onClick={handleSave}
                >
                    Save
                </button>
                <ErrorWindow errorMessage={error} onClose={() => setError('')} />
            </div>
        </div>
    );
};

export default QuestionEditorModal;
