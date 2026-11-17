const express = require('express');
const ClinicProfile = require('../models/ClinicProfile');
const { requireAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const profile = await ClinicProfile.findOne({ key: 'default' });
    if (!profile) {
      return res.status(404).json({ message: 'Clinic profile not found' });
    }
    return res.json(profile);
  }),
);

router.put(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const profile = await ClinicProfile.findOneAndUpdate({ key: 'default' }, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    return res.json(profile);
  }),
);

module.exports = router;
