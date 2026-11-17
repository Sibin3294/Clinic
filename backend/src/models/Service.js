const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    includes: { type: [String], default: [] },
    suitedFor: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

serviceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    ret.id = ret.slug || ret._id.toString();
    ret._id = ret._id.toString();
    return ret;
  },
});

module.exports = mongoose.model('Service', serviceSchema);
