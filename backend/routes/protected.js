const express = require('express');
const auth = require('../middleware/authMiddleware');
const axios = require('axios'); // or use node-fetch if you prefer

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

module.exports = router;