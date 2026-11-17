const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectDb } = require('./config/db');
const { env } = require('./config/env');
const { ensureAdmin, seedContent } = require('./seed/seed');
const { uploadsDir } = require('./middleware/upload');

const authRoutes = require('./routes/auth');
const bannerRoutes = require('./routes/banners');
const doctorRoutes = require('./routes/doctors');
const serviceRoutes = require('./routes/services');
const clinicRoutes = require('./routes/clinic');
const enquiryRoutes = require('./routes/enquiries');
const uploadRoutes = require('./routes/uploads');

async function bootstrap() {
  await connectDb(env.mongodbUri);
  await ensureAdmin();
  await seedContent();

  const app = express();
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || env.corsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error(`CORS blocked for origin: ${origin}`));
      },
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));
  app.use('/uploads', express.static(uploadsDir));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'clinic-api' });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/banners', bannerRoutes);
  app.use('/api/doctors', doctorRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/clinic', clinicRoutes);
  app.use('/api/enquiries', enquiryRoutes);
  app.use('/api/uploads', uploadRoutes);

  app.use((err, _req, res, _next) => {
    console.error(err);
    if (err.message && err.message.startsWith('CORS blocked')) {
      return res.status(403).json({ message: err.message });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate value' });
    }
    return res.status(500).json({ message: 'Server error' });
  });

  app.listen(env.port, '0.0.0.0', () => {
    console.log(`API listening on port ${env.port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start API', err);
  process.exit(1);
});
