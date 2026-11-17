const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    doctor: { type: String, default: '' },
    preferredDate: { type: String, required: true },
    message: { type: String, required: true, trim: true },
    reference: { type: String, required: true, unique: true },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  },
  { timestamps: true },
);

enquirySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    ret.submittedAt = ret.createdAt;
    delete ret._id;
    return ret;
  },
});

module.exports = mongoose.model('Enquiry', enquirySchema);
