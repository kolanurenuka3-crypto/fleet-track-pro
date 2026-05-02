const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Security & Utility Middleware
app.use(helmet());          // sets secure HTTP headers
app.use(cors());            // allow cross-origin
app.use(morgan('dev'));     // log every request
app.use(express.json());    // parse JSON body

// Health check — interviewers love seeing this
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'fleet-tracker-api'
  });
});

// Routes (we'll add these next)
// app.use('/api/auth', authRoutes);
// app.use('/api/vehicles', vehicleRoutes);

// Global error handler — must be LAST
app.use(errorHandler);

module.exports = app;