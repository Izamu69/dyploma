import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import UserSettings from './components/UserSettings';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Landing from './components/Landing';
import CreateTest from './components/CreateTest';
import LessonCreator from './components/LessonCreator';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900 text-gray-300 min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/createtest" element={<CreateTest />} />
          <Route path="/createlesson" element={<LessonCreator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
