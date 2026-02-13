import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Use environment variable for codespace name
        const codespace = process.env.REACT_APP_CODESPACE_NAME || window.location.hostname.split('-')[0];
        const apiUrl = `https://${codespace}-8000.app.github.dev/api/teams/`;
        
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched teams data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams array:', teamsData);
        
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

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
          <h2 className="mb-0">👥 Teams</h2>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="badge bg-primary">{teams.length} Total Teams</span>
            </div>
            <button className="btn btn-primary btn-sm">
              <i className="bi bi-plus-circle"></i> Create Team
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.length > 0 ? (
                  teams.map((team, index) => (
                    <tr key={team.id}>
                      <td><span className="badge bg-secondary">{index + 1}</span></td>
                      <td><strong>{team.name}</strong></td>
                      <td>{team.description || <span className="text-muted">No description</span>}</td>
                      <td>{new Date(team.created_date).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1">View</button>
                        <button className="btn btn-sm btn-outline-success me-1">Join</button>
                        <button className="btn btn-sm btn-outline-secondary">Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      <p className="mb-0">No teams found</p>
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

export default Teams;
