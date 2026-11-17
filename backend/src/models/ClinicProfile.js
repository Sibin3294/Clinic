const mongoose = require('mongoose');

const hourSchema = new mongoose.Schema(
  {
    days: { type: String, required: true },
    time: { type: String, required: true },
  },
  { _id: false },
);

const clinicProfileSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'default', unique: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    tagline: { type: String, required: true },
    lede: { type: String, required: true },
    announcement: { type: String, required: true },
    phoneDisplay: { type: String, required: true },
    phoneHref: { type: String, required: true },
    email: { type: String, required: true },
    addressLines: { type: [String], default: [] },
    hours: { type: [hourSchema], default: [] },
    notes: { type: [String], default: [] },
    departments: { type: [String], default: [] },
  },
  { timestamps: true },
);

clinicProfileSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.key;
    return ret;
  },
});

module.exports = mongoose.model('ClinicProfile', clinicProfileSchema);
