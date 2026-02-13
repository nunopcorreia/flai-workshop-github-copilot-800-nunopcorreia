import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Use environment variable for codespace name
        const codespace = process.env.REACT_APP_CODESPACE_NAME || window.location.hostname.split('-')[0];
        const apiUrl = `https://${codespace}-8000.app.github.dev/api/users/`;
        
        console.log('Fetching users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched users data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Users array:', usersData);
        
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
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
          <h2 className="mb-0">👤 Users</h2>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="badge bg-primary">{users.length} Total Users</span>
            </div>
            <button className="btn btn-primary btn-sm">
              <i className="bi bi-plus-circle"></i> Add User
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Team</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td><span className="badge bg-secondary">{index + 1}</span></td>
                      <td><strong>{user.username}</strong></td>
                      <td>{user.email}</td>
                      <td>
                        {user.team_name || user.team ? (
                          <span className="badge bg-info">{user.team_name || user.team}</span>
                        ) : (
                          <span className="badge bg-light text-dark">No team</span>
                        )}
                      </td>
                      <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1">View</button>
                        <button className="btn btn-sm btn-outline-secondary">Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      <p className="mb-0">No users found</p>
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

export default Users;
