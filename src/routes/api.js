// ServicePulse API routes.
// All data is kept in memory; there is no database in this project.

const express = require('express');
const router = express.Router();

// Hardcoded service inventory used by the dashboard.
const allServices = [
  { id: 'auth', name: 'Auth Service', status: 'healthy', uptime: 99.98 },
  { id: 'billing', name: 'Billing Service', status: 'healthy', uptime: 99.91 },
  { id: 'search', name: 'Search Service', status: 'degraded', uptime: 97.42 },
  { id: 'notify', name: 'Notification Service', status: 'healthy', uptime: 99.99 },
  { id: 'gateway', name: 'API Gateway', status: 'healthy', uptime: 99.95 }
];

// GET /api/services - return every service.
router.get('/services', (req, res) => {
  res.json(allServices);
});

// GET /api/services/:id - return a single service or a 404.
router.get('/services/:id', (req, res) => {
  const service = allServices.find((item) => item.id === req.params.id);

  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }

  res.json(service);
});

// GET /api/metrics - return synthetic, randomly generated metrics.
router.get('/metrics', (req, res) => {
  res.json({
    cpu: Math.round(Math.random() * 100),
    memory: Math.round(Math.random() * 100),
    requests: Math.floor(Math.random() * 4900) + 100
  });
});

module.exports = router;
