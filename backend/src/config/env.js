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

const env = {
  port: Number(process.env.PORT || 4000),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/clinic',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@meridianclinic.example',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin@123',
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN),
  uploadsDir: process.env.UPLOADS_DIR || path.join(__dirname, '../../uploads'),
};

module.exports = { env };
