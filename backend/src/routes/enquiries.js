const express = require('express');
const Enquiry = require('../models/Enquiry');
const { requireAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

function makeReference() {
  return `MR-${Math.floor(1000 + Math.random() * 9000)}`;
}

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, phone, email, department, doctor, preferredDate, message } = req.body || {};
    if (!name || !phone || !email || !department || !preferredDate || !message) {
      return res.status(400).json({ message: 'Missing required enquiry fields' });
    }

    let reference = makeReference();
    for (let i = 0; i < 5; i += 1) {
      const exists = await Enquiry.exists({ reference });
      if (!exists) break;
      reference = makeReference();
    }

    const enquiry = await Enquiry.create({
      name,
      phone,
      email,
      department,
      doctor: doctor || '',
      preferredDate,
      message,
      reference,
    });

    return res.status(201).json(enquiry);
  }),
);

router.get(
  '/',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const items = await Enquiry.find().sort({ createdAt: -1 });
    res.json(items);
  }),
);

router.patch(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const item = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    );
    if (!item) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    return res.json(item);
  }),
);

router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const item = await Enquiry.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    return res.json({ message: 'Enquiry deleted' });
  }),
);

module.exports = router;
