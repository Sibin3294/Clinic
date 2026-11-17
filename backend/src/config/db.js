const mongoose = require('mongoose');

async function connectDb(uri) {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
  } catch (err) {
    console.error('MongoDB connection failed. Check MONGODB_URI, Atlas user/password, and Network Access 0.0.0.0/0.');
    console.error(err.message);
    throw err;
  }
}

module.exports = { connectDb };
