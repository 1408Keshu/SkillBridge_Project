const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  steps: { type: Array, required: true }, // Array of roadmap steps (customize as needed)
  dreamGoal: { type: String, default: '' },
  duration: { type: Number, default: 12 },
  knowledgeLevel: { type: String, default: '' },
  knowledgeDetails: { type: String, default: '' },
  dailyTime: { type: Number, default: 2 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roadmap', roadmapSchema);