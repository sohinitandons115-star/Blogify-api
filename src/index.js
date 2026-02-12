require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 1200;

const{ requestLogger, errorHandler } = require('./middleware');
const mainRouter = require('./routes');


//Global middleware
app.use(express.json());
app.use(requestLogger);
app.use(cors());

//main server
app.get('/', (req, res) => {
  res.send(`Server is running in ${process.env.NODE_ENV} mode.`);
});

app.use('/api/v1', mainRouter);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
