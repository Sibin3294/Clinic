const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

function parseCorsOrigins(value) {
  const raw = value || 'http://127.0.0.1:4200';
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => (item.startsWith('http') ? item : `https://${item}`));
}

const isRender = process.env.RENDER === 'true';
const mongodbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/clinic';

if (isRender && (!process.env.MONGODB_URI || /localhost|127\.0\.0\.1/.test(mongodbUri))) {
  throw new Error(
    'MONGODB_URI is missing or points to localhost. Set it in Render to your Atlas connection string (with /clinic).',
  );
}

const env = {
  port: Number(process.env.PORT || 4000),
  mongodbUri,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@meridianclinic.example',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin@123',
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN),
  uploadsDir: process.env.UPLOADS_DIR || path.join(__dirname, '../../uploads'),
};

module.exports = { env };
