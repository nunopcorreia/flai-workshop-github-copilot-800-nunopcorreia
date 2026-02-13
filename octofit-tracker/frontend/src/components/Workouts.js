import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Use environment variable for codespace name
        const codespace = process.env.REACT_APP_CODESPACE_NAME || window.location.hostname.split('-')[0];
        const apiUrl = `https://${codespace}-8000.app.github.dev/api/workouts/`;
        
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched workouts data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts array:', workoutsData);
        
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const difficultyMap = {
      'Beginner': 'success',
      'Intermediate': 'warning',
      'Advanced': 'danger'
    };
    return difficultyMap[difficulty] || 'secondary';
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
          <h2 className="mb-0">💪 Workout Suggestions</h2>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="badge bg-primary">{workouts.length} Available Workouts</span>
            </div>
            <button className="btn btn-primary btn-sm">
              <i className="bi bi-plus-circle"></i> Add Workout
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Duration (min)</th>
                  <th>Difficulty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length > 0 ? (
                  workouts.map((workout, index) => (
                    <tr key={workout.id}>
                      <td><span className="badge bg-secondary">{index + 1}</span></td>
                      <td><strong>{workout.name}</strong></td>
                      <td>{workout.description || <span className="text-muted">No description</span>}</td>
                      <td><span className="badge bg-info">{workout.workout_type || workout.type}</span></td>
                      <td>{workout.duration} min</td>
                      <td>
                        <span className={`badge bg-${getDifficultyBadge(workout.difficulty)}`}>
                          {workout.difficulty}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-success me-1">Start</button>
                        <button className="btn btn-sm btn-outline-primary">Details</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      <p className="mb-0">No workouts found</p>
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

export default Workouts;
