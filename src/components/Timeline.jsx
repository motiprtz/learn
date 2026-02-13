import { useState, useEffect } from 'react'
import { Search, Filter, Calendar, Grid } from 'lucide-react'
import { timelineEvents, composers } from '../data/timeline'
import { periods } from '../data/periods'
import './Timeline.css'

function Timeline() {
  // טען העדפות שמורות מ-localStorage
  const loadViewMode = () => {
    try {
      return localStorage.getItem('timeline_viewMode') || 'timeline'
    } catch (error) {
      console.error('Error loading viewMode:', error)
      return 'timeline'
    }
  }

  const loadShowComposers = () => {
    try {
      const saved = localStorage.getItem('timeline_showComposers')
      return saved === 'true'
    } catch (error) {
      console.error('Error loading showComposers:', error)
      return false
    }
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showComposers, setShowComposers] = useState(loadShowComposers)
  const [viewMode, setViewMode] = useState(loadViewMode)

  // שמור העדפות ב-localStorage
  useEffect(() => {
    try {
      localStorage.setItem('timeline_viewMode', viewMode)
    } catch (error) {
      console.error('Error saving viewMode:', error)
    }
  }, [viewMode])

  useEffect(() => {
    try {
      localStorage.setItem('timeline_showComposers', showComposers.toString())
    } catch (error) {
      console.error('Error saving showComposers:', error)
    }
  }, [showComposers])

  const filteredEvents = timelineEvents.filter(event => {
    const matchesSearch = event.title.includes(searchTerm) || 
                         event.description.includes(searchTerm)
    const matchesFilter = filterType === 'all' || event.type === filterType
    return matchesSearch && matchesFilter
  })

  // קיבוץ אירועים לפי תקופות לתצוגת התקופות
  const groupEventsByPeriod = () => {
    const grouped = {}
    
    timelineEvents.forEach(event => {
      const period = periods.find(p => {
        const [start, end] = p.years.split('-').map(y => parseInt(y))
        return event.year >= start && event.year <= end
      })
      
      const periodName = period ? period.name : 'אחר'
      const periodColor = period ? period.color : '#718096'
      const periodYears = period ? period.years : ''
      
      if (!grouped[periodName]) {
        grouped[periodName] = {
          name: periodName,
          years: periodYears,
          color: periodColor,
          events: []
        }
      }
      
      grouped[periodName].events.push(event)
    })
    
    // מיון התקופות לפי שנת התחלה
    return Object.values(grouped).sort((a, b) => {
      const yearA = a.years ? parseInt(a.years.split('-')[0]) : 0
      const yearB = b.years ? parseInt(b.years.split('-')[0]) : 0
      return yearA - yearB
    })
  }

  const groupedByPeriod = groupEventsByPeriod()

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
        <p>
          {viewMode === 'timeline' 
            ? 'סקירה כרונולוגית של אירועים, מלחינים ויצירות'
            : 'תקופות מוזיקליות - למידה לפי הקשר ללא צורך לזכור תאריכים'}
        </p>
      </div>

      <div className="timeline-controls">
        <div className="view-mode-toggle">
          <button 
            className={`mode-button ${viewMode === 'timeline' ? 'active' : ''}`}
            onClick={() => setViewMode('timeline')}
          >
            <Calendar size={20} />
            <span>ציר זמן</span>
          </button>
          <button 
            className={`mode-button ${viewMode === 'periods' ? 'active' : ''}`}
            onClick={() => setViewMode('periods')}
          >
            <Grid size={20} />
            <span>תקופות</span>
          </button>
        </div>

        {viewMode === 'timeline' && (
          <>
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
          </>
        )}

      </div>

      {viewMode === 'timeline' && (
        <>
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
        </>
      )}

      {viewMode === 'periods' && (
        <div className="periods-view">
          {groupedByPeriod.map((group, groupIdx) => (
            <div 
              key={groupIdx} 
              className="period-section"
              style={{ '--period-color': group.color }}
            >
              <div className="period-divider">
                <h3>{group.name}</h3>
                {group.years && <span className="period-years-label">{group.years}</span>}
              </div>
              
              <div className="period-events-grid">
                {group.events.map((event, idx) => (
                  <div 
                    key={event.id} 
                    className="period-event-card"
                    style={{ '--event-color': getEventColor(event.type) }}
                  >
                    <div className="period-card-header-bar">
                      <span className="period-card-icon">{getEventIcon(event.type)}</span>
                      <div className="period-card-year">{event.year}</div>
                    </div>
                    <div className="period-card-body">
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                      <span className="period-card-category">{event.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Timeline

