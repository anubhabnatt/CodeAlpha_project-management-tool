import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ProjectPage from './components/ProjectPage'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project/:id" element={<ProjectPage />} /> {}
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;