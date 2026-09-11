<template>
  <div class="dashboard-container">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-content">
        <h1 class="header-title">FastForward Logistics</h1>
        <p class="header-subtitle">Internal Operations Portal</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="dashboard-main">
      <!-- Title and Filters Section -->
      <div class="dashboard-title-bar">
        <div>
          <h2 class="dashboard-title">Executive Operations Dashboard</h2>
          <p class="dashboard-description">Real-time view of logistics operations and performance</p>
        </div>
      </div>

      <!-- Filters Placeholder -->
      <div class="filters-section">
        <div class="filter-placeholder">
          <p>Filters go here</p>
        </div>
      </div>

      <!-- KPI Cards Section -->
      <section class="kpi-section">
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">Total Shipments</div>
            <div class="kpi-value">-</div>
            <div class="kpi-trend">Trend: -</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">On-Time Delivery Rate</div>
            <div class="kpi-value">-</div>
            <div class="kpi-trend">Trend: -</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Average Transit Time</div>
            <div class="kpi-value">-</div>
            <div class="kpi-trend">Trend: -</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-label">Open Exceptions</div>
            <div class="kpi-value">-</div>
            <div class="kpi-trend">Trend: -</div>
          </div>
        </div>
      </section>

      <!-- Shipment Volume Section -->
      <section class="chart-section">
        <div class="section-header">
          <h3>Shipment Volume</h3>
        </div>
        <div class="chart-placeholder">
          <p>Shipment volume visualization goes here</p>
        </div>
      </section>

      <!-- Regional Performance Section -->
      <section class="chart-section">
        <div class="section-header">
          <h3>Regional Performance</h3>
        </div>
        <div class="table-placeholder">
          <p>Regional performance table/grid goes here</p>
        </div>
      </section>

      <!-- Open Exceptions Section -->
      <section class="chart-section">
        <div class="section-header">
          <h3>Open Exceptions</h3>
        </div>
        <div class="table-placeholder">
          <p>Exceptions table goes here</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* Header */
.dashboard-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
}

.header-title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
}

.header-subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: #666;
  font-weight: 400;
}

/* Main Content */
.dashboard-main {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

/* Title Bar */
.dashboard-title-bar {
  margin-bottom: 2rem;
}

.dashboard-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.dashboard-description {
  margin: 0.5rem 0 0 0;
  font-size: 0.95rem;
  color: #666;
}

/* Filters Section */
.filters-section {
  margin-bottom: 2rem;
}

.filter-placeholder {
  background-color: #ffffff;
  border: 1px dashed #ccc;
  border-radius: 4px;
  padding: 1rem;
  color: #999;
  font-size: 0.9rem;
}

/* KPI Section */
.kpi-section {
  margin-bottom: 2rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.kpi-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}

.kpi-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.kpi-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.kpi-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.kpi-trend {
  font-size: 0.85rem;
  color: #999;
}

/* Chart Sections */
.chart-section {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-header {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.section-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.chart-placeholder,
.table-placeholder {
  background-color: #fafafa;
  border: 1px dashed #ddd;
  border-radius: 4px;
  padding: 3rem 1.5rem;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-main {
    padding: 1rem;
  }

  .kpi-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .header-title {
    font-size: 1.5rem;
  }

  .dashboard-title {
    font-size: 1.25rem;
  }

  .kpi-value {
    font-size: 1.5rem;
  }
}
</style>
