import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { timelineEvents, composers } from '../data/timeline'
import './Timeline.css'

function Timeline() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showComposers, setShowComposers] = useState(false)

  const filteredEvents = timelineEvents.filter(event => {
    const matchesSearch = event.title.includes(searchTerm) || 
                         event.description.includes(searchTerm)
    const matchesFilter = filterType === 'all' || event.type === filterType
    return matchesSearch && matchesFilter
  })

  const getEventIcon = (type) => {
    switch(type) {
      case 'birth': return '👶'
      case 'death': return '🕊️'
      case 'composition': return '🎵'
      case 'event': return '📅'
      default: return '•'
    }
  }

  const getEventColor = (type) => {
    switch(type) {
      case 'birth': return '#48bb78'
      case 'death': return '#718096'
      case 'composition': return '#667eea'
      case 'event': return '#ed8936'
      default: return '#4a5568'
    }
  }

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h2>ציר הזמן - מודרניזם במוזיקה</h2>
        <p>סקירה כרונולוגית של אירועים, מלחינים ויצירות</p>
      </div>

      <div className="timeline-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="חפש אירוע, מלחין או יצירה..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button 
            className={filterType === 'all' ? 'active' : ''}
            onClick={() => setFilterType('all')}
          >
            הכל
          </button>
          <button 
            className={filterType === 'composition' ? 'active' : ''}
            onClick={() => setFilterType('composition')}
          >
            יצירות
          </button>
          <button 
            className={filterType === 'event' ? 'active' : ''}
            onClick={() => setFilterType('event')}
          >
            אירועים
          </button>
          <button 
            className={filterType === 'birth' ? 'active' : ''}
            onClick={() => setFilterType('birth')}
          >
            לידות
          </button>
          <button 
            className={filterType === 'death' ? 'active' : ''}
            onClick={() => setFilterType('death')}
          >
            פטירות
          </button>
        </div>

        <button 
          className="composers-toggle"
          onClick={() => setShowComposers(!showComposers)}
        >
          {showComposers ? 'הסתר' : 'הצג'} מלחינים עיקריים
        </button>
      </div>

      {showComposers && (
        <div className="composers-section">
          <h3>מלחינים עיקריים</h3>
          <div className="composers-grid">
            {composers.map(composer => (
              <div key={composer.id} className="composer-card">
                <h4>{composer.name}</h4>
                <p className="composer-years">{composer.years}</p>
                <p className="composer-nationality">{composer.nationality} • {composer.style}</p>
                <p className="composer-importance">{composer.importance}</p>
                <div className="composer-works">
                  <strong>יצירות מרכזיות:</strong>
                  <ul>
                    {composer.works.map((work, idx) => (
                      <li key={idx}>{work}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="timeline">
        {filteredEvents.map((event, index) => (
          <div 
            key={event.id} 
            className="timeline-item"
            style={{ '--event-color': getEventColor(event.type) }}
          >
            <div className="timeline-marker">
              <span className="timeline-icon">{getEventIcon(event.type)}</span>
            </div>
            <div className="timeline-content">
              <div className="timeline-year">{event.year}</div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <span className="timeline-category">{event.category}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="no-results">
          <p>לא נמצאו תוצאות עבור החיפוש שלך</p>
        </div>
      )}
    </div>
  )
}

export default Timeline

