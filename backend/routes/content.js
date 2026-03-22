const express = require('express');
const Content = require('../models/Content');
const jwt = require('jsonwebtoken');

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Get all content
router.get('/', async (req, res) => {
  try {
    const contents = await Content.find();
    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update content (admin only)
router.put('/:section', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });

  try {
    const content = await Content.findOneAndUpdate(
      { section: req.params.section },
      { data: req.body },
      { new: true, upsert: true }
    );
    res.json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;