import React, { useState, useEffect } from 'react';

const QuestionRenderer = ({ questions, handleAnswerSelection, mode = 'test' }) => {
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        console.log("Questions prop changed:", questions);
        if (mode === 'editor') {
            const initialAnswers = {};
            questions.forEach((question) => {
                if (question.questionAnswerDependence) {
                    initialAnswers[question._id] = question.questionAnswerDependence;
                }
            });
            setAnswers(initialAnswers);
        }
    }, [mode, questions]);

    const handleOptionSelect = (questionId, answerIndex) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answerIndex
        }));

        const question = questions.find(q => q._id === questionId);

        if (handleAnswerSelection && question) {
            handleAnswerSelection(question._id, [answerIndex]);
        }
    };

    const handleOptionsSelect = (questionId, subquestionIndex, answerIndex) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = {
                ...prevAnswers,
                [questionId]: {
                    ...prevAnswers[questionId],
                    [subquestionIndex]: prevAnswers[questionId]?.[subquestionIndex] === answerIndex ? null : answerIndex
                }
            };

            const question = questions.find(q => q._id === questionId);
            const updatedQuestionAnswers = Object.entries(updatedAnswers[questionId]).reduce((acc, [key, value]) => {
                if (value !== null) {
                    acc[key] = value;
                }
                return acc;
            }, {});

            if (handleAnswerSelection && question) {
                handleAnswerSelection(question._id, updatedQuestionAnswers);
            }

            return updatedAnswers;
        });
    };

    return (
        <div className="bg-gray-900 text-gray-300 p-8">
            <div className="max-w-4xl mx-auto">
                {questions.map((question) => (
                    <div key={question._id} className="bg-gray-800 p-6 rounded-lg mb-4">
                        <h3 className="text-2xl font-bold mb-2">{question.question}</h3>
                        {question.suiTable && question.subquestions && question.answers && (
                            <div className="mt-4 overflow-x-auto">
                                <table className="w-full table-auto border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border">Options</th>
                                            {question.subquestions.map((subquestion, subquestionIndex) => (
                                                <th key={subquestionIndex} className="px-4 py-2 border bg-gray-700">
                                                    {subquestion.content}
                                                    {subquestion.pictures && <span> (Pictures)</span>}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {question.answers.map((answer, answerIndex) => (
                                            <tr key={answerIndex} className="border">
                                                <td className="px-4 py-2 border bg-gray-700">{answer.content}</td>
                                                {question.subquestions.map((_, subquestionIndex) => (
                                                    <td key={subquestionIndex} className="px-4 py-2 border bg-gray-700">
                                                        <input
                                                            type="checkbox"
                                                            checked={answers[question._id]?.[subquestionIndex] === answerIndex}
                                                            onChange={() => handleOptionsSelect(question._id, subquestionIndex, answerIndex)}
                                                            className="form-checkbox h-5 w-5 accent-teal-600"
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {!question.suiTable && (
                            <div className="mt-4">
                                {question.answers.map((answer, answerIndex) => (
                                    <div key={answerIndex} className="flex items-center mb-2">
                                        <input
                                            type={question.answers.length > 1 ? 'checkbox' : 'radio'}
                                            id={`option-${question._id}-${answerIndex}`}
                                            name={`question-${question._id}`}
                                            value={answerIndex}
                                            checked={Array.isArray(answers[question._id])
                                                ? answers[question._id].includes(answerIndex)
                                                : answers[question._id] === answerIndex}
                                            onChange={() => handleOptionSelect(question._id, answerIndex)}
                                            className="form-checkbox h-5 w-5 mr-2 accent-teal-600"
                                        />
                                        <label htmlFor={`option-${question._id}-${answerIndex}`} className="ml-2">
                                            {answer.content}
                                            {answer.pictures && <span> (This answer has pictures)</span>}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionRenderer;
