const express = require('express');
const jwt = require('jsonwebtoken');
const PageView = require('../models/PageView');

const router = express.Router();

const verifyAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/pageview', async (req, res) => {
  const path = req.body?.path;
  const isAllowedPath = typeof path === 'string'
    && path.length <= 200
    && /^\/(?:|about|contact|checkout|products\/[a-z0-9-]+)$/.test(path);

  if (!isAllowedPath) return res.status(400).json({ error: 'Invalid page path' });

  try {
    const date = new Date().toISOString().slice(0, 10);
    await PageView.findOneAndUpdate(
      { date, path },
      { $inc: { views: 1 } },
      { upsert: true },
    );
    res.status(204).end();
  } catch (error) {
    console.error('Could not record page view:', error);
    res.status(500).json({ error: 'Could not record page view' });
  }
});

router.get('/summary', verifyAdmin, async (req, res) => {
  try {
    const today = new Date();
    const firstDay = new Date(today);
    firstDay.setUTCDate(firstDay.getUTCDate() - 29);
    const startDate = firstDay.toISOString().slice(0, 10);
    const endDate = today.toISOString().slice(0, 10);

    const totals = await PageView.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: { date: '$date', path: '$path' },
          views: { $sum: '$views' },
        },
      },
    ]);

    const dailyViews = new Map();
    const pageViews = new Map();
    let totalViews = 0;
    for (const entry of totals) {
      dailyViews.set(entry._id.date, (dailyViews.get(entry._id.date) || 0) + entry.views);
      pageViews.set(entry._id.path, (pageViews.get(entry._id.path) || 0) + entry.views);
      totalViews += entry.views;
    }

    const daily = [];
    for (let offset = 0; offset < 30; offset += 1) {
      const date = new Date(firstDay);
      date.setUTCDate(firstDay.getUTCDate() + offset);
      const key = date.toISOString().slice(0, 10);
      daily.push({ date: key, views: dailyViews.get(key) || 0 });
    }

    const popularPages = [...pageViews.entries()]
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8);

    res.json({ totalViews, daily, popularPages });
  } catch (error) {
    console.error('Could not load analytics summary:', error);
    res.status(500).json({ error: 'Could not load analytics summary' });
  }
});

module.exports = router;
