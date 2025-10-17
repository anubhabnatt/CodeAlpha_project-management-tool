const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Create a new project
// @route   POST /api/projects
const createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Project name is required' });
  }

  try {
    const project = new Project({
      name,
      description,
      owner: req.user.id, // We get this from the auth middleware
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get logged in user's projects
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createProject, getProjects };