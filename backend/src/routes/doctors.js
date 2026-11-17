const express = require('express');
const Doctor = require('../models/Doctor');
const { requireAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../utils/asyncHandler');
const { slugify } = require('../utils/slugify');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const items = await Doctor.find({ active: true }).sort({ order: 1, name: 1 });
    res.json(items);
  }),
);

router.get(
  '/all',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const items = await Doctor.find().sort({ order: 1, name: 1 });
    res.json(items);
  }),
);

router.post(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const payload = { ...req.body };
    if (!payload.slug && payload.name) {
      payload.slug = slugify(payload.name);
    }
    const item = await Doctor.create(payload);
    res.status(201).json(item);
  }),
);

router.put(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const payload = { ...req.body };
    if (payload.name && !payload.slug) {
      payload.slug = slugify(payload.name);
    }
    const item =
      (await Doctor.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })) ||
      (await Doctor.findOneAndUpdate({ slug: req.params.id }, payload, {
        new: true,
        runValidators: true,
      }));
    if (!item) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    return res.json(item);
  }),
);

router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const item =
      (await Doctor.findByIdAndDelete(req.params.id)) ||
      (await Doctor.findOneAndDelete({ slug: req.params.id }));
    if (!item) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    return res.json({ message: 'Doctor deleted' });
  }),
);

module.exports = router;
