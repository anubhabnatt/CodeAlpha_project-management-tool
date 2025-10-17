import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const ProjectPage = () => {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const { id } = useParams(); // Gets the project ID from the URL

  useEffect(() => {
    // Fetch project details and tasks for this project
    const fetchData = async () => {
      try {
        // We'll need a backend route to get a single project's details.
        // For now, we'll just fetch the tasks.
        const tasksRes = await api.get(`/tasks/${id}`);
        setTasks(tasksRes.data);
      } catch (err) {
        console.error('Failed to fetch project data', err);
      }
    };
    fetchData();
  }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskTitle) return;
    try {
      const res = await api.post('/tasks', { title: taskTitle, projectId: id });
      setTasks([...tasks, res.data]);
      setTaskTitle('');
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  // Filter tasks into columns
  const todoTasks = tasks.filter((task) => task.status === 'To Do');
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress');
  const doneTasks = tasks.filter((task) => task.status === 'Done');

  return (
    <div className="project-page-container">
      <Link to="/dashboard" className="back-link">&larr; Back to Dashboard</Link>
      <h1>Project Board</h1> {/* We'll add the project name here later */}
      
      <div className="task-form">
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Enter new task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className="task-board">
        {/* To Do Column */}
        <div className="task-column">
          <h2>To Do</h2>
          {todoTasks.map((task) => (
            <div key={task._id} className="task-card">
              {task.title}
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div className="task-column">
          <h2>In Progress</h2>
          {inProgressTasks.map((task) => (
            <div key={task._id} className="task-card">
              {task.title}
            </div>
          ))}
        </div>

        {/* Done Column */}
        <div className="task-column">
          <h2>Done</h2>
          {doneTasks.map((task) => (
            <div key={task._id} className="task-card">
              {task.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;