import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Clock, BookOpen, Music, Home } from 'lucide-react'
import Timeline from './components/Timeline'
import Flashcards from './components/Flashcards'
import Compositions from './components/Compositions'
import HomePage from './components/HomePage'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>מודרניזם במוזיקה - עזר למבחן</h1>
          <p className="subtitle">כל החומר ללימוד מקיף למבחן</p>
        </header>

        <nav className="main-nav">
          <Link 
            to="/" 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <Home size={24} />
            <span>דף הבית</span>
          </Link>
          <Link 
            to="/timeline" 
            className={`nav-item ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <Clock size={24} />
            <span>ציר הזמן</span>
          </Link>
          <Link 
            to="/flashcards" 
            className={`nav-item ${activeTab === 'flashcards' ? 'active' : ''}`}
            onClick={() => setActiveTab('flashcards')}
          >
            <BookOpen size={24} />
            <span>כרטיסיות מושגים</span>
          </Link>
          <Link 
            to="/compositions" 
            className={`nav-item ${activeTab === 'compositions' ? 'active' : ''}`}
            onClick={() => setActiveTab('compositions')}
          >
            <Music size={24} />
            <span>יצירות והאזנה</span>
          </Link>
        </nav>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/compositions" element={<Compositions />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© 2026 - אפליקציה ללימוד מודרניזם במוזיקה</p>
          <p className="exam-info">מבוסס על חומרי הקורס של פרופ' בלה ברובר-לובובסקי</p>
        </footer>
      </div>
    </Router>
  )
}

export default App

