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
  const existing = await Admin.findOne({ email });
  const passwordHash = await bcrypt.hash(env.adminPassword, 10);

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

async function seedContent({ force = false } = {}) {
  const profileCount = await ClinicProfile.countDocuments();
  if (force || profileCount === 0) {
    await ClinicProfile.deleteMany({});
    await ClinicProfile.create(clinicProfile);
    console.log('Clinic profile seeded');
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

  const serviceCount = await Service.countDocuments();
  if (force || serviceCount === 0) {
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log(`Services seeded (${services.length})`);
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
