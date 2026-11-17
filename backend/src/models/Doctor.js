const mongoose = require('mongoose');

const tones = ['pine', 'copper', 'gold', 'clay', 'ink', 'sage'];

const doctorSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    credentials: { type: String, required: true, trim: true },
    years: { type: Number, required: true, min: 0 },
    bio: { type: String, required: true, trim: true },
    days: { type: String, required: true, trim: true },
    focus: { type: [String], default: [] },
    initials: { type: String, required: true, trim: true },
    tone: { type: String, enum: tones, default: 'pine' },
    photo: { type: String, default: '', trim: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

doctorSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    ret.id = ret.slug || ret._id.toString();
    ret._id = ret._id.toString();
    return ret;
  },
});

module.exports = mongoose.model('Doctor', doctorSchema);
