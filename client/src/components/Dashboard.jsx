import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const navigate = useNavigate();

  // Function to log out the user
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Fetch projects when the component loads
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to fetch projects', err);
        // If token is invalid, log out the user
        if (err.response.status === 401) {
          handleLogout();
        }
      }
    };
    fetchProjects();
  }, []);

  // Handle new project creation
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName) return;
    try {
      const res = await api.post('/projects', { name: projectName });
      setProjects([...projects, res.data]); // Add new project to the list
      setProjectName(''); // Clear the input field
    } catch (err) {
      console.error('Failed to create project', err);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="project-form">
        <h2>Create a New Project</h2>
        <form onSubmit={handleCreateProject}>
          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button type="submit">Create Project</button>
        </form>
      </div>

      <div className="project-list">
        <h2>Your Projects</h2>
        {projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <Link to={`/project/${project._id}`} key={project._id} className="project-link">
  <li>{project.name}</li>
</Link>
            ))}
          </ul>
        ) : (
          <p>You don't have any projects yet. Create one above!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;