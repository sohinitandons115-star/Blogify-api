const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn('MONGODB_URI is not set. Skipping MongoDB connection. Add .env to enable DB features.');
    return;
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected successfully');
};

module.exports = connectDB;
