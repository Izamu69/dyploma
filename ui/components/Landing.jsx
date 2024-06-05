import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faClipboardList, faUsers } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
    return (
        <div className='pt-16'>
            {/* Hero Section */}
            <section className="bg-teal-600 text-white py-20 rounded-lg">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Create and Share Your Own Courses and Quizzes</h1>
                    <p className="text-lg mb-8">Join our community of learners and educators. Create interactive content to share with the world.</p>
                    <a href="/signup" className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded font-bold">Get Started</a>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-10">Features</h2>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full md:w-1/3 p-4">
                            <FontAwesomeIcon icon={faChalkboardTeacher} className="text-6xl text-teal-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Create Courses</h3>
                            <p>Create comprehensive courses with multimedia content.</p>
                        </div>
                        <div className="w-full md:w-1/3 p-4">
                            <FontAwesomeIcon icon={faClipboardList} className="text-6xl text-teal-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Build Quizzes</h3>
                            <p>Design quizzes to test knowledge and reinforce learning.</p>
                        </div>
                        <div className="w-full md:w-1/3 p-4">
                            <FontAwesomeIcon icon={faUsers} className="text-6xl text-teal-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Join Community</h3>
                            <p>Connect with learners and educators from around the world.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-800 py-20 rounded-lg">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-10">What Our Users Say</h2>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full md:w-1/3 p-4">
                            <div className="bg-gray-700 p-6 rounded-lg">
                                <p>"This platform has transformed my teaching experience. Creating courses and quizzes is a breeze!"</p>
                                <p className="mt-4 font-bold">- John Doe, Teacher</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 p-4">
                            <div className="bg-gray-700 p-6 rounded-lg">
                                <p>"I love the interactive features and the ability to share my quizzes with others."</p>
                                <p className="mt-4 font-bold">- Jane Smith, Student</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-10">Ready to Get Started?</h2>
                    <a href="/signup" className="bg-teal-600 hover:bg-teal-500 text-white py-3 px-6 rounded font-bold">Sign Up Now</a>
                </div>
            </section>
        </div>
    );
};

export default Landing;
