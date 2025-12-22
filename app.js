'use strict';

// app.js - simple Express application for the VOC repo
// - loads environment variables from .env
// - basic security, logging, JSON parsing
// - serves static files from /public
// - exposes a health check and root route

require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

// Optional middleware: morgan for logging and helmet for basic security
try {
  const morgan = require('morgan');
  app.use(morgan('dev'));
} catch (e) {
  // morgan not installed; skip logging middleware
}

try {
  const helmet = require('helmet');
  app.use(helmet());
} catch (e) {
  // helmet not installed; skip security middleware
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic routes
app.get('/', (req, res) => {
  res.send('Welcome to the VOC application');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Example API route
app.get('/api/info', (req, res) => {
  res.json({ repo: 'VOC', owner: 'Alan-Ezequiel-Sosa' });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start server if this file is run directly
if (require.main === module) {
  const port = parseInt(process.env.PORT, 10) || 3000;
  app.listen(port, () => {
    console.log(`VOC app listening on port ${port}`);
  });
}

module.exports = app;
