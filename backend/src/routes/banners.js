const express = require('express');
const Banner = require('../models/Banner');
const { requireAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const items = await Banner.find({ active: true }).sort({ order: 1, createdAt: 1 });
    res.json(items);
  }),
);

router.get(
  '/all',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const items = await Banner.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  }),
);

router.post(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const item = await Banner.create(req.body);
    res.status(201).json(item);
  }),
);

router.put(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const item = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    return res.json(item);
  }),
);

router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const item = await Banner.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    return res.json({ message: 'Banner deleted' });
  }),
);

module.exports = router;
