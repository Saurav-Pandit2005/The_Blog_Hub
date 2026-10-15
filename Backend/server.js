require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { fail } = require('./utils/helpers');

connectDB();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://the-blog-hub-h6-xi.vercel.app'],
    credentials: true,
  })
);
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to The Blog Hub API' });
});

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/blogs', require('./routes/blogRoutes'));
app.use('/api/v1/podcasts', require('./routes/podcastRoutes'));
app.use('/api/v1/resources', require('./routes/resourceRoutes'));
app.use('/api/v1/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/v1/author', require('./routes/authorRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/ai', require('./routes/aiRoutes'));

app.use((req, res) => fail(res, 404, 'Route not found'));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
