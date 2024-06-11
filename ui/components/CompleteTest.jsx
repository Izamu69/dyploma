import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionRender from './QuestionRender';

const CompleteTest = () => {
    const { testId } = useParams();
    const [test, setTest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedResults = JSON.parse(localStorage.getItem('user'));
        if (storedResults) {
            setUserId(storedResults._id);
        }
    }, []);

    const handleContinue = () => {
        sessionStorage.removeItem('testResults');
        navigate('/dashboard');
    };

    useEffect(() => {
        const storedResults = JSON.parse(sessionStorage.getItem('testResults'));
        if (storedResults) {
            setResults(storedResults);
            setIsSubmitted(true);
        }

        return () => {
            sessionStorage.removeItem('testResults');
        };
    }, []);

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

    useEffect(() => {
        fetchTest();
    }, [testId]);

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

    const handleAnswerSelection = (question, selectedAnswers) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [question]: Object.values(selectedAnswers)
        }));
    };

    const handleSubmitTest = async () => {
        const results = questions.map((question, questionIndex) => {
            const correctAnswers = question.questionAnswerDependence || [];
            const userAnswers = answers[question._id];
            let isCorrect;

            if (Array.isArray(userAnswers)) {
                isCorrect = correctAnswers.every(answer => userAnswers.includes(answer)) &&
                    userAnswers.every(answer => correctAnswers.includes(answer));
            } else {
                isCorrect = correctAnswers.includes(userAnswers);
            }

            return {
                question: question.question,
                correctAnswers,
                userAnswers,
                isCorrect
            };
        });

        setResults(results);
        setIsSubmitted(true);
        sessionStorage.setItem('testResults', JSON.stringify(results));

        const totalCorrectQuestions = results.filter(result => result.isCorrect).length;
        const totalQuestions = questions.length;
        const percentageCorrect = totalQuestions > 0 ? ((totalCorrectQuestions / totalQuestions) * 100).toFixed(0) : 0;

        try {
            const response = await fetch(`http://localhost:3000/users/${userId}/tests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    testId,
                    grade: percentageCorrect,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update test result');
            }

            const updatedUser = await response.json();
            console.log('User updated successfully:', updatedUser);
        } catch (error) {
            console.error('Error updating test result:', error);
        }
    };

    const totalCorrectQuestions = results ? results.filter(result => result.isCorrect).length : 0;
    const totalQuestions = questions.length;
    const percentageCorrect = totalQuestions > 0 ? ((totalCorrectQuestions / totalQuestions) * 100).toFixed(0) : 0;

    if (!test || questions.length === 0) {
        return <div>Loading test...</div>;
    }

    return (
        <div className="bg-gray-900 text-gray-300 min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8">{test.testName}</h1>
            <div className="max-w-4xl mx-auto">
                {!isSubmitted ? (
                    <>
                        <QuestionRender questions={questions} handleAnswerSelection={handleAnswerSelection} />
                        <button onClick={handleSubmitTest} className="bg-teal-600 text-white py-2 px-4 rounded mt-6 hover:bg-teal-700 font-bold">Submit Test</button>
                    </>
                ) : (
                    <div className="mt-8">
                        <h2 className="text-3xl font-bold mb-4">Results:</h2>
                        <p className="text-xl font-bold my-4">You have {totalCorrectQuestions}/{totalQuestions} correct answers.</p>
                        <p className="text-xl font-bold my-4">That's {percentageCorrect}%. {percentageCorrect > 50 ? 'Good Job!' : 'You can do better!'}</p>
                        {results.map((result, index) => (
                            <div key={index} className={`p-4 rounded mb-4 ${result.isCorrect ? 'bg-green-700' : 'bg-red-700'}`}>
                                <h3 className="text-xl font-bold">Question {index + 1}: {result.question}</h3>
                                <p className="mt-2 font-bold">{result.isCorrect ? 'Correct!' : 'Incorrect'}</p>
                            </div>
                        ))}
                        <button onClick={handleContinue} className="bg-teal-600 text-white py-2 px-4 rounded mt-6 hover:bg-teal-700 font-bold">Continue</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompleteTest;
