import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img 
              src="/octofitapp-small.png" 
              alt="OctoFit Logo" 
              className="navbar-logo"
            />
            OctoFit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid px-4">
        <Routes>
          <Route path="/" element={
            <div className="welcome-section">
              <h1 className="display-4">🏋️ Welcome to OctoFit Tracker</h1>
              <p className="lead">Track your fitness journey and compete with your team!</p>
              
              <div className="row mt-5">
                <div className="col-md-4 mb-4">
                  <div className="feature-card">
                    <h4>👤 User Profiles</h4>
                    <p>Create and manage your personal fitness profile with detailed tracking.</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="feature-card">
                    <h4>📊 Activity Logging</h4>
                    <p>Log your workouts, track progress, and see your achievements grow.</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="feature-card">
                    <h4>👥 Team Management</h4>
                    <p>Join or create teams and work together toward fitness goals.</p>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-4 mb-4">
                  <div className="feature-card">
                    <h4>🏆 Leaderboards</h4>
                    <p>Compete with others and climb the ranks to become champion.</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="feature-card">
                    <h4>💪 Workout Plans</h4>
                    <p>Get personalized workout suggestions tailored to your level.</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="feature-card">
                    <h4>📈 Progress Tracking</h4>
                    <p>Monitor your improvements and celebrate your milestones.</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <Link to="/users" className="btn btn-primary btn-lg mx-2">Get Started</Link>
                <Link to="/leaderboard" className="btn btn-outline-primary btn-lg mx-2">View Leaderboard</Link>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
