import { useState, useMemo } from 'react'
import { compositions } from '../data/compositions'
import './Compositions.css'

function Compositions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedComposer, setSelectedComposer] = useState('all')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [expandedCompositions, setExpandedCompositions] = useState(new Set())

  // Extract unique composers and genres
  const composers = useMemo(() => {
    const uniqueComposers = [...new Set(compositions.map(c => c.composer))];
    return uniqueComposers.sort();
  }, []);

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(compositions.map(c => c.genre))];
    return uniqueGenres.sort();
  }, []);

  // Filter compositions
  const filteredCompositions = useMemo(() => {
    return compositions.filter(composition => {
      const matchesSearch = searchTerm === '' || 
        composition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        composition.composer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (composition.structure && composition.structure.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesComposer = selectedComposer === 'all' || composition.composer === selectedComposer;
      const matchesGenre = selectedGenre === 'all' || composition.genre === selectedGenre;
      
      return matchesSearch && matchesComposer && matchesGenre;
    });
  }, [searchTerm, selectedComposer, selectedGenre]);

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedCompositions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCompositions(newExpanded);
  };

  const expandAll = () => {
    setExpandedCompositions(new Set(filteredCompositions.map((_, idx) => idx)));
  };

  const collapseAll = () => {
    setExpandedCompositions(new Set());
  };

  return (
    <div className="compositions-container">
      <div className="compositions-header">
        <h2>יצירות ומלחינים</h2>
        <p>רשימת היצירות המלאה עם פירוט מבני ופרקים</p>
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{filteredCompositions.length}</span>
            <span className="stat-label">יצירות</span>
          </div>
          <div className="stat">
            <span className="stat-value">{composers.length}</span>
            <span className="stat-label">מלחינים</span>
          </div>
          <div className="stat">
            <span className="stat-value">{genres.length}</span>
            <span className="stat-label">ז'אנרים</span>
          </div>
        </div>
      </div>

      <div className="compositions-controls">
        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="חיפוש יצירה, מלחין או תוכן..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <label>מלחין:</label>
            <select 
              value={selectedComposer} 
              onChange={(e) => setSelectedComposer(e.target.value)}
            >
              <option value="all">כל המלחינים</option>
              {composers.map((composer, idx) => (
                <option key={idx} value={composer}>{composer}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>ז'אנר:</label>
            <select 
              value={selectedGenre} 
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="all">כל הז'אנרים</option>
              {genres.map((genre, idx) => (
                <option key={idx} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="expand-buttons">
          <button onClick={expandAll}>➕ הרחב הכל</button>
          <button onClick={collapseAll}>➖ כווץ הכל</button>
        </div>
      </div>

      <div className="compositions-list">
        {filteredCompositions.length > 0 ? (
          filteredCompositions.map((composition, index) => {
            const isExpanded = expandedCompositions.has(index);
            
            return (
              <div key={index} className={`composition-card ${isExpanded ? 'expanded' : ''}`}>
                <div 
                  className="composition-header"
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="composition-main">
                    <h3>{composition.title}</h3>
                    <div className="composition-meta">
                      <span className="composer">🎼 {composition.composer}</span>
                      <span className="genre">🎭 {composition.genre}</span>
                    </div>
                  </div>
                  <button className="expand-icon">
                    {isExpanded ? '▼' : '▶'}
                  </button>
                </div>

                {isExpanded && (
                  <div className="composition-details">
                    {composition.structure && (
                      <div className="structure-section">
                        <h4>מבנה ופירוט:</h4>
                        <div className="structure-content">
                          {composition.structure}
                        </div>
                      </div>
                    )}
                    
                    {composition.movements && composition.movements.length > 0 && (
                      <div className="movements-section">
                        <h4>פרקים:</h4>
                        <div className="movements-list">
                          {composition.movements.map((movement, mvtIdx) => (
                            <div key={mvtIdx} className="movement-card">
                              <div className="movement-header">
                                <span className="movement-number">פרק {mvtIdx + 1}</span>
                                {movement.title && (
                                  <span className="movement-title">{movement.title}</span>
                                )}
                              </div>
                              {movement.description && (
                                <p className="movement-description">{movement.description}</p>
                              )}
                              {movement.tempo && (
                                <div className="movement-detail">
                                  <strong>טמפו:</strong> {movement.tempo}
                                </div>
                              )}
                              {movement.key && (
                                <div className="movement-detail">
                                  <strong>סולם:</strong> {movement.key}
                                </div>
                              )}
                              {movement.form && (
                                <div className="movement-detail">
                                  <strong>צורה:</strong> {movement.form}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {composition.notes && (
                      <div className="notes-section">
                        <h4>הערות:</h4>
                        <p>{composition.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <p>לא נמצאו יצירות עבור החיפוש שלך</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Compositions;

