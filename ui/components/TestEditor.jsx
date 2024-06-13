import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import QuestionEditorModal from './QuestionEditorModal';
import QuestionRenderer from './QuestionRender';

const TestEditor = () => {
    const { testId } = useParams();
    const [test, setTest] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
console.log(questions.map(q => q.questionAnswerDependence).join(','));

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
    useEffect(() => {
        fetchQuestions();
    }, [test]);

    const handleEditClick = (question) => {
        setSelectedQuestion(question);
        setIsModalOpen(true);
    };

    const handleDeleteQuestion = async (questionId) => {
        try {
            const response = await fetch(`http://localhost:3000/questions/${questionId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete question');
            }

            const updatedTest = { ...test };
            updatedTest.questionIds = updatedTest.questionIds.filter((id) => id !== questionId);
            setTest(updatedTest);

            setQuestions(questions.filter((question) => question._id !== questionId));

            const patchResponse = await fetch(`http://localhost:3000/tests/${testId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTest),
            });

            if (!patchResponse.ok) {
                throw new Error('Failed to patch test data');
            }
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const handleCreateQuestion = async () => {
        setIsModalOpen(true);
        setSelectedQuestion(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedQuestion(null);
        fetchTest();
    };

  const handleAnswerSelection = async (question, selectedAnswers) => {
    try {
      const updatedQuestion = await fetch(`http://localhost:3000/questions/${question}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
          body: JSON.stringify({ "questionAnswerDependence": Object.values(selectedAnswers) }),
        });
    fetchQuestions();
    } catch (error) {
      console.error("Error patching question:", error);
    }
  };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 bg-gray-900 text-gray-300 p-4">
                <h2 className="text-2xl font-bold mb-4">Questions</h2>
                <ul>
                    {questions.map((question) => (
                        <li key={question._id} className="mb-2">
                            <div className="flex justify-between items-center p-2 bg-gray-700 rounded hover:bg-gray-600">
                                <span>{question.question}</span>
                                <div>
                                    <button
                                        className="bg-teal-600 text-white py-1 px-2 rounded hover:bg-teal-700 mr-2"
                                        onClick={() => handleEditClick(question)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                                        onClick={() => handleDeleteQuestion(question._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    className="bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700 mt-4"
                    onClick={handleCreateQuestion}
                >
                    Create New Question
                </button>
            </div>
            <div className="w-full md:w-3/4">
            <QuestionRenderer
                    key={questions.map(q => q.questionAnswerDependence).join(',')}
                    questions={questions}
                    handleAnswerSelection={handleAnswerSelection}
                    mode="editor"
                />
            </div>
            {isModalOpen && (
                <QuestionEditorModal question={selectedQuestion} onClose={handleCloseModal} currentQuestionIds={test.questionIds} />
            )}
        </div>
    );
};

export default TestEditor;
