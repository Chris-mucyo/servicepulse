# ServicePulse Dashboard

ServicePulse is a small Node.js + Express operations dashboard that displays the health of a handful of backend services alongside live CPU, memory, and request metrics. The backend serves a REST API and a static vanilla HTML/CSS/JavaScript frontend; all service data is hardcoded and the metrics are randomly generated in memory, so no database or external services are required. The dashboard refreshes itself every five seconds, making it a simple, self-contained target for DevSecOps practice.

## Prerequisites

- Node.js 20

## How to run

```bash
npm install
npm start
```

Then open <http://localhost:3000>.

Set a custom port with the `PORT` environment variable if needed (default: `3000`).

## Endpoints

| Method | Path | Description | Example response |
| ------ | ---- | ----------- | ---------------- |
| GET | `/health` | Health probe with process uptime | `{"status":"ok","uptime":12.34}` |
| GET | `/api/services` | List every monitored service | `[{"id":"auth","name":"Auth Service","status":"healthy","uptime":99.98}, ...]` |
| GET | `/api/services/:id` | Fetch one service by id | `{"id":"search","name":"Search Service","status":"degraded","uptime":97.42}` |
| GET | `/api/metrics` | Random CPU, memory, and request counts | `{"cpu":42,"memory":67,"requests":2310}` |

A request for an unknown service id returns HTTP 404 with:

```json
{ "error": "Service not found" }
```

## Usage note

Run `npm start` and open the dashboard. Metrics refresh every 5 seconds.
