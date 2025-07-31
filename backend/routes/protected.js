const express = require('express');
const auth = require('../middleware/authMiddleware');
const axios = require('axios'); // or use node-fetch if you prefer
const Roadmap = require('../models/Roadmap');
const Progress = require('../models/Progress');

const router = express.Router();

async function isEducationalOrCSE(message) {
  const prompt = `Is the following question about education or computer science? Answer only "yes" or "no".\n\nQuestion: "${message}"`;
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo", // or your model
    messages: [{ role: "user", content: prompt }]
  }, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
  });

  const answer = response.data.choices[0].message.content.trim().toLowerCase();
  return answer.startsWith("yes");
}

// In your chat route:
router.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  if (!(await isEducationalOrCSE(userMessage))) {
    return res.json({ reply: "I can't help you with this question. Please ask something related to your career path." });
  }

  // Call your AI assistant API here
  try {
    const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo", // or your model
      messages: [{ role: "user", content: userMessage }]
    }, {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
    });

    const reply = aiResponse.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('AI API error:', error.response ? error.response.data : error.message);
    res.status(500).json({ reply: "Sorry, I couldn't process your request right now." });
  }
});

router.get('/protected', auth, (req, res) => {
  res.json({ msg: `Hello, ${req.user.name}! This is protected data.` });
});

// Save or update roadmap for logged-in user
router.post('/roadmap', auth, async (req, res) => {
  try {
    const { steps, dreamGoal, duration, knowledgeLevel, knowledgeDetails, dailyTime } = req.body;
    if (!Array.isArray(steps)) {
      return res.status(400).json({ msg: 'Steps must be an array.' });
    }
    let roadmap = await Roadmap.findOne({ userId: req.user.userId });
    if (roadmap) {
      roadmap.steps = steps;
      roadmap.dreamGoal = dreamGoal || '';
      roadmap.duration = duration || 12;
      roadmap.knowledgeLevel = knowledgeLevel || '';
      roadmap.knowledgeDetails = knowledgeDetails || '';
      roadmap.dailyTime = dailyTime || 2;
      roadmap.updatedAt = Date.now();
      await roadmap.save();
    } else {
      roadmap = new Roadmap({
        userId: req.user.userId,
        steps,
        dreamGoal: dreamGoal || '',
        duration: duration || 12,
        knowledgeLevel: knowledgeLevel || '',
        knowledgeDetails: knowledgeDetails || '',
        dailyTime: dailyTime || 2
      });
      await roadmap.save();
    }
    res.json({ success: true, roadmap });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Fetch roadmap for logged-in user
router.get('/roadmap', auth, async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user.userId });
    res.json({ roadmap });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Save or update progress for logged-in user
router.post('/progress', auth, async (req, res) => {
  try {
    const { completedSteps } = req.body;
    if (!Array.isArray(completedSteps)) {
      return res.status(400).json({ msg: 'completedSteps must be an array.' });
    }
    let progress = await Progress.findOne({ userId: req.user.userId });
    if (progress) {
      progress.completedSteps = completedSteps;
      progress.updatedAt = Date.now();
      await progress.save();
    } else {
      progress = new Progress({ userId: req.user.userId, completedSteps });
      await progress.save();
    }
    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Fetch progress for logged-in user
router.get('/progress', auth, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.userId });
    res.json({ progress });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;