import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Use environment variable for codespace name
        const codespace = process.env.REACT_APP_CODESPACE_NAME || window.location.hostname.split('-')[0];
        const apiUrl = `https://${codespace}-8000.app.github.dev/api/activities/`;
        
        console.log('Fetching activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched activities data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities array:', activitiesData);
        
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
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
          <h2 className="mb-0">📊 Activities</h2>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="badge bg-primary">{activities.length} Total Activities</span>
            </div>
            <button className="btn btn-primary btn-sm">
              <i className="bi bi-plus-circle"></i> Log Activity
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration (min)</th>
                  <th>Distance (km)</th>
                  <th>Calories</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <tr key={activity.id}>
                      <td><span className="badge bg-secondary">{index + 1}</span></td>
                      <td><strong>{activity.user_name || activity.user}</strong></td>
                      <td><span className="badge bg-success">{activity.activity_type}</span></td>
                      <td>{activity.duration} min</td>
                      <td>{activity.distance} km</td>
                      <td><span className="badge bg-warning text-dark">{activity.calories} cal</span></td>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1">View</button>
                        <button className="btn btn-sm btn-outline-secondary">Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      <p className="mb-0">No activities found</p>
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

export default Activities;
