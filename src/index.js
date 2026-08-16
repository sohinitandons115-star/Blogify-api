require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const { requestLogger, errorHandler } = require('./middleware');
const mainRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 1200;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(requestLogger);

app.get('/', (req, res) => {
  res.sendFile(require('path').join(__dirname, '../public/index.html'));
});

app.use('/api/v1', mainRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
