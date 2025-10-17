const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Create a new task for a project
// @route   POST /api/tasks
const createTask = async (req, res) => {
  const { title, description, projectId } = req.body;

  if (!title || !projectId) {
    return res.status(400).json({ message: 'Title and Project ID are required' });
  }

  try {
    // Make sure the project exists and the user owns it
    const project = await Project.findById(projectId);
    if (!project || project.owner.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Project not found or user not authorized' });
    }

    const task = new Task({
      title,
      description,
      project: projectId,
      assignedTo: req.user.id, // Assign to the creator by default
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all tasks for a specific project
// @route   GET /api/tasks/:projectId
const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Simple authorization check later: check if user is a member of the project

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.assignedTo = assignedTo || task.assignedTo;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
};