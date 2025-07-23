const express = require('express');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/protected', auth, (req, res) => {
  res.json({ msg: `Hello, ${req.user.name}! This is protected data.` });
});

module.exports = router;