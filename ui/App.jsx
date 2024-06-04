import './App.css'
import Header from './components/Header'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import UserSettings from './components/UserSettings'

function App() {

  return (
    <>
      <div className="bg-gray-900 text-gray-300 min-h-screen">
        <Header />
        <UserSettings />
      </div>
    </>
  )
}

export default App
