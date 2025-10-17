const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'], // status can only be one of these values
    default: 'To Do'
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);