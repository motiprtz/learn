import { Link } from 'react-router-dom'
import { Clock, BookOpen, Music, CheckCircle } from 'lucide-react'
import { concepts } from '../data/concepts'
import { compositions } from '../data/compositions'
import { timelineEvents } from '../data/timeline'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h2>ברוכים הבאים לאפליקציית הלימוד</h2>
        <p className="welcome-text">
          אפליקציה זו נועדה לעזור לך ללמוד את כל החומר למבחן במודרניזם במוזיקה.
          כל המידע מבוסס על חומרי הקורס של פרופ' בלה ברובר-לובובסקי.
        </p>
      </div>

      <div className="features-grid">
        <Link to="/timeline" className="feature-card">
          <div className="feature-icon">
            <Clock size={48} />
          </div>
          <h3>ציר הזמן</h3>
          <p>סקירה כרונולוגית של כל האירועים, המלחינים והיצירות החשובות</p>
          <ul className="feature-list">
            <li>{timelineEvents.length} אירועים היסטוריים</li>
            <li>מלחינים עיקריים</li>
            <li>יצירות מפתח</li>
          </ul>
        </Link>

        <Link to="/flashcards" className="feature-card">
          <div className="feature-icon">
            <BookOpen size={48} />
          </div>
          <h3>כרטיסיות מושגים</h3>
          <p>למידה אינטראקטיבית של מושגים, אנשים ויצירות</p>
          <ul className="feature-list">
            <li>{concepts.length} מושגים מרכזיים</li>
            <li>מיון לפי קטגוריות</li>
            <li>חיפוש וסינון</li>
          </ul>
        </Link>

        <Link to="/compositions" className="feature-card">
          <div className="feature-icon">
            <Music size={48} />
          </div>
          <h3>יצירות והאזנה</h3>
          <p>רשימת האזנה מלאה עם פירוט לכל פרק ופרק</p>
          <ul className="feature-list">
            <li>{compositions.length} יצירות מרכזיות</li>
            <li>פירוט לפרקים</li>
            <li>ניתוח מוזיקלי</li>
          </ul>
        </Link>
      </div>

      <div className="exam-structure">
        <h3>מבנה המבחן</h3>
        <div className="exam-parts">
          <div className="exam-part">
            <CheckCircle size={24} />
            <div>
              <strong>א' - האזנה (40%)</strong>
              <p>8 קטעים</p>
            </div>
          </div>
          <div className="exam-part">
            <CheckCircle size={24} />
            <div>
              <strong>ב' - אנסין (20%)</strong>
              <p>2 קטעים</p>
            </div>
          </div>
          <div className="exam-part">
            <CheckCircle size={24} />
            <div>
              <strong>ג' - שמות ומושגים (20%)</strong>
              <p>10 מושגים</p>
            </div>
          </div>
          <div className="exam-part">
            <CheckCircle size={24} />
            <div>
              <strong>ד' - שאלות רב-בחר (20%)</strong>
              <p>שאלות על החומר</p>
            </div>
          </div>
        </div>
      </div>

      <div className="study-tips">
        <h3>טיפים ללימוד</h3>
        <div className="tips-grid">
          <div className="tip">
            <strong>1. התחל מציר הזמן</strong>
            <p>קבל תמונה כללית של התקופה והאירועים</p>
          </div>
          <div className="tip">
            <strong>2. למד את המושגים</strong>
            <p>השתמש בכרטיסיות לשינון יעיל</p>
          </div>
          <div className="tip">
            <strong>3. האזן ליצירות</strong>
            <p>הכר את היצירות ואת המאפיינים שלהן</p>
          </div>
          <div className="tip">
            <strong>4. חזור על החומר</strong>
            <p>חזרה מרווחת היא המפתח להצלחה</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

