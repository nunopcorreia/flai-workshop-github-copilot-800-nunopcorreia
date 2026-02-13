import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Use environment variable for codespace name
        const codespace = process.env.REACT_APP_CODESPACE_NAME || window.location.hostname.split('-')[0];
        const apiUrl = `https://${codespace}-8000.app.github.dev/api/leaderboard/`;
        
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched leaderboard data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard array:', leaderboardData);
        
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="rank-badge rank-1">🥇</span>;
    if (rank === 2) return <span className="rank-badge rank-2">🥈</span>;
    if (rank === 3) return <span className="rank-badge rank-3">🥉</span>;
    return <span className="badge bg-secondary">{rank}</span>;
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">🏆 Leaderboard</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <span className="badge bg-primary">{leaderboard.length} Competitors</span>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Total Points</th>
                  <th>Activities</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    return (
                      <tr key={entry.id || index} className={rank <= 3 ? 'table-active' : ''}>
                        <td>{getRankBadge(rank)}</td>
                        <td><strong>{entry.user_name || entry.user}</strong></td>
                        <td>
                          <span className="badge bg-success fs-6">
                            {entry.total_points || entry.points || 0} pts
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-info text-dark">
                            {entry.activity_count || entry.activities || 0} activities
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">View Profile</button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      <p className="mb-0">No leaderboard data found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
