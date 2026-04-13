const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const adminRoutes = require('./routes/adminRoutes');
const podcastRoutes = require('./routes/podcastRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const authorRoutes = require('./routes/authorRoutes');
const normalRoutes = require('./routes/normalRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/podcasts', podcastRoutes);
app.use('/api/v1/resources', resourceRoutes);
app.use('/api/v1/inquiries', inquiryRoutes);
app.use('/api/v1/author', authorRoutes);
app.use('/api/v1/normal', normalRoutes);
app.use('/api/v1/ai', aiRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to The Blog Hub API'
  });
});

// Port configuration
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
