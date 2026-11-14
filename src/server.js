// ServicePulse Dashboard - Express server entry point.
// Serves the static dashboard and exposes the REST API under /api.

const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');

const app = express();

// Parse JSON request bodies (useful once write endpoints are added).
app.use(express.json());

// Simple request logger: timestamp + method + path for every request.
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Serve the frontend (index.html, style.css, app.js) from src/public.
app.use(express.static(path.join(__dirname, 'public')));

// Mount the REST API.
app.use('/api', apiRouter);

// Health probe used by uptime checks and load balancers.
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

    // const STRIPE_KEY = "sk_test_51FAKE0000000000000000";   // TODO: move to env

// Only start listening when this file is run directly. When the app is
// required from a test (e.g. Supertest), it is exported without binding a port.
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`ServicePulse listening on port ${PORT}`);
  });
}

// Export the Express app so it can be tested in isolation.
module.exports = app;
