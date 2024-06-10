import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CompleteTest = () => {
    const { testId } = useParams();
    const [test, setTest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // Fetch test data based on testId
    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tests/${testId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch test data');
                }
                const testData = await response.json();
                if (!testData.test) {
                    throw new Error('Invalid test data format');
                }
                setTest(testData.test);
            } catch (error) {
                console.error('Error fetching or processing test data:', error);
            }
        };

        fetchTest();
    }, [testId]);

    // Fetch questions based on questionIds from the test
    useEffect(() => {
        const fetchQuestions = async () => {
            if (test && test.questionIds) {
                try {
                    const questionPromises = test.questionIds.map(async (questionId) => {
                        const response = await fetch(`http://localhost:3000/questions/${questionId}`);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch question with ID ${questionId}`);
                        }
                        const questionData = await response.json();
                        return questionData.question;
                    });

                    const fetchedQuestions = await Promise.all(questionPromises);
                    setQuestions(fetchedQuestions);
                } catch (error) {
                    console.error('Error fetching or processing questions:', error);
                }
            }
        };

        fetchQuestions();
    }, [test]);

    // Handler for selecting an option for a question
    const handleOptionSelect = (questionIndex, answerIndex) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: answerIndex
        }));
    };

    const handleOptionsSelect = (questionIndex, subquestionIndex, answerIndex) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: {
                ...prevAnswers[questionIndex],
                [subquestionIndex]: prevAnswers[questionIndex]?.[subquestionIndex] === answerIndex ? null : answerIndex
            }
        }));
    };

    // Handler for submitting the test
    const handleSubmitTest = () => {
        // Send answers to server or handle locally
        console.log('Submitted answers:', answers);
    };

    if (!test || questions.length === 0) {
        return <div>Loading test...</div>;
    }

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">{test.testName}</h1>
            <div className="max-w-4xl mx-auto">
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="bg-gray-800 p-6 rounded-lg mb-4">
                        <h3 className="text-2xl font-bold mb-2">Question {questionIndex + 1}</h3>
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
                                                            checked={answers[questionIndex]?.[subquestionIndex] === answerIndex}
                                                            onChange={() => handleOptionsSelect(questionIndex, subquestionIndex, answerIndex)}
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
                                            type="checkbox"
                                            id={`option-${questionIndex}-${answerIndex}`}
                                            name={`question-${questionIndex}`}
                                            value={answerIndex}
                                            checked={answers[questionIndex] === answerIndex}
                                            onChange={() => handleOptionSelect(questionIndex, answerIndex)}
                                            className="form-checkbox h-5 w-5 mr-2 accent-teal-600"
                                        />
                                        <label htmlFor={`option-${questionIndex}-${answerIndex}`} className="ml-2">{answer.content}</label>
                                        {answer.pictures && <span> (This answer has pictures)</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <button onClick={handleSubmitTest} className="bg-teal-600 text-white py-2 px-4 rounded mt-6 hover:bg-teal-700">Submit Test</button>
            </div>
        </div>
    );
};

export default CompleteTest;
