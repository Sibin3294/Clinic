const bcrypt = require('bcryptjs');
const { connectDb } = require('../config/db');
const { env } = require('../config/env');
const Admin = require('../models/Admin');
const Banner = require('../models/Banner');
const Doctor = require('../models/Doctor');
const Service = require('../models/Service');
const ClinicProfile = require('../models/ClinicProfile');
const { clinicProfile, banners, doctors, services } = require('./data');

async function ensureAdmin() {
  const email = env.adminEmail.toLowerCase();
  const passwordHash = await bcrypt.hash(env.adminPassword, 10);

  // Keep a single admin matching env credentials (old logins stop working).
  await Admin.deleteMany({ email: { $ne: email } });

  const existing = await Admin.findOne({ email });
  if (existing) {
    existing.passwordHash = passwordHash;
    existing.name = 'Clinic Admin';
    await existing.save();
    console.log(`Admin updated: ${email}`);
    return;
  }

  await Admin.create({ email, passwordHash, name: 'Clinic Admin' });
  console.log(`Admin created: ${email}`);
}

async function ensureClinicBrand() {
  const updated = await ClinicProfile.findOneAndUpdate(
    { key: 'default' },
    { $set: { ...clinicProfile } },
    { upsert: true, new: true },
  );
  console.log(`Clinic brand: ${updated.name}`);
}

async function ensureServices() {
  const slugs = services.map((item) => item.slug);
  for (const service of services) {
    await Service.findOneAndUpdate({ slug: service.slug }, { $set: service }, { upsert: true });
  }
  await Service.deleteMany({ slug: { $nin: slugs } });
  console.log(`Services synced (${services.length})`);
}

async function seedContent({ force = false } = {}) {
  if (force) {
    await ClinicProfile.deleteMany({});
    await ClinicProfile.create(clinicProfile);
    console.log('Clinic profile seeded');
  } else {
    await ensureClinicBrand();
  }

  const bannerCount = await Banner.countDocuments();
  if (force || bannerCount === 0) {
    await Banner.deleteMany({});
    await Banner.insertMany(banners);
    console.log(`Banners seeded (${banners.length})`);
  }

  const doctorCount = await Doctor.countDocuments();
  if (force || doctorCount === 0) {
    await Doctor.deleteMany({});
    await Doctor.insertMany(doctors);
    console.log(`Doctors seeded (${doctors.length})`);
  }

  if (force) {
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log(`Services seeded (${services.length})`);
  } else {
    await ensureServices();
  }
}

async function run() {
  await connectDb(env.mongodbUri);
  await ensureAdmin();
  await seedContent({ force: process.argv.includes('--force') });
  console.log('Seed complete');
  process.exit(0);
}

if (require.main === module) {
  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { ensureAdmin, seedContent };
