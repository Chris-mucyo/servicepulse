// ServicePulse dashboard controller: loads services + metrics every 5 seconds.

// Escape values before inserting them into innerHTML.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Build and inject the service cards.
function renderServices(services) {
  document.getElementById('services').innerHTML = services
    .map((service) => {
      const status = escapeHtml(service.status);
      return `
        <article class="card">
          <div class="service-header">
            <h2>${escapeHtml(service.name)}</h2>
            <span class="badge ${status}">${status}</span>
          </div>
          <p class="service-id">${escapeHtml(service.id)}</p>
          <p class="uptime">Uptime: <strong>${Number(service.uptime).toFixed(2)}%</strong></p>
        </article>`;
    })
    .join('');
}

// Update the three metric values.
function renderMetrics(metrics) {
  document.getElementById('cpu-value').textContent = `${metrics.cpu}%`;
  document.getElementById('memory-value').textContent = `${metrics.memory}%`;
  document.getElementById('requests-value').textContent = metrics.requests;
}

// Fetch services and metrics in parallel, then update the page.
async function loadAll() {
  const errorBox = document.getElementById('error-message');

  try {
    const [servicesResponse, metricsResponse] = await Promise.all([
      fetch('/api/services'),
      fetch('/api/metrics')
    ]);
    if (!servicesResponse.ok || !metricsResponse.ok) throw new Error('Request failed');

    const [services, metrics] = await Promise.all([
      servicesResponse.json(),
      metricsResponse.json()
    ]);
    renderServices(services);
    renderMetrics(metrics);
    errorBox.textContent = '';
  } catch (error) {
    errorBox.textContent = 'Unable to reach the ServicePulse API. Retrying...';
  }
}

// Start on load and refresh every 5 seconds.
document.addEventListener('DOMContentLoaded', () => {
  loadAll();
  setInterval(loadAll, 5000);
});
