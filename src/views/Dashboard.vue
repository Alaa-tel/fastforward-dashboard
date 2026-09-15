<template>
  <div class="dashboard-layout">
    <!-- App Bar Header -->
    <header class="app-header">
      <div class="app-header-inner">
        <span class="header-title">FastForward Logistics</span>
        <span class="header-subtitle">Internal Operations Portal</span>
      </div>
    </header>

    <!-- Main Content Container -->
    <div class="dashboard-content">
      <!-- Page Header with integrated filter -->
      <div class="page-header">
        <div class="header-top">
          <div class="header-text">
            <h1 class="page-title">Executive Operations Dashboard</h1>
            <p class="page-description">Real-time view of logistics operations and performance</p>
          </div>
          <div class="header-filter">
            <RegionFilter />
          </div>
        </div>
      </div>

      <!-- KPI Cards Section -->
      <div class="kpi-section" v-if="metrics">
        <div class="kpi-grid">
          <MetricCard
            label="Total Shipments"
            :value="metrics.totalShipments.current"
            :trend="metrics.totalShipments.trend"
            :trend-direction="metrics.totalShipments.direction"
          />
          <MetricCard
            label="On-Time Delivery Rate"
            :value="metrics.onTimeDeliveryRate.current"
            :trend="metrics.onTimeDeliveryRate.trend"
            :trend-direction="metrics.onTimeDeliveryRate.direction"
          />
          <MetricCard
            label="Average Transit Time"
            :value="metrics.averageTransitTime.current"
            :trend="metrics.averageTransitTime.trend"
            :trend-direction="metrics.averageTransitTime.direction"
          />
          <MetricCard
            label="Open Exceptions"
            :value="metrics.openExceptions.current"
            :trend="metrics.openExceptions.trend"
            :trend-direction="metrics.openExceptions.direction"
          />
        </div>
      </div>

      <!-- Shipment Volume Chart Section -->
      <div class="section-card full-width">
        <div class="section-header">
          <h2 class="section-title">Shipment Volume</h2>
          <p class="section-subtitle">15-day trend</p>
        </div>
        <div class="section-body chart-body-large">
          <ShipmentVolumeChart />
        </div>
      </div>

      <!-- Charts Grid Section -->
      <div class="charts-grid">
        <!-- Delivery Performance Chart -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">Regional Performance</h2>
            <p class="section-subtitle">On-time delivery by region</p>
          </div>
          <div class="section-body chart-body-medium">
            <DeliveryPerformanceChart />
          </div>
        </div>

        <!-- Exception Breakdown Chart -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">Exception Breakdown</h2>
            <p class="section-subtitle">Distribution of open exceptions</p>
          </div>
          <div class="section-body chart-body-medium">
            <ExceptionBreakdownChart />
          </div>
        </div>
      </div>

      <!-- Open Exceptions Table Section -->
      <div class="section-card full-width">
        <div class="section-header">
          <div class="header-title-with-chip">
            <h2 class="section-title">Open Exceptions</h2>
            <div class="exception-badge">{{ exceptionCount }}</div>
          </div>
          <p class="section-subtitle">Detailed exception log</p>
        </div>
        <div class="section-body table-body">
          <ExceptionsTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MetricCard from '@/components/MetricCard.vue'
import RegionFilter from '@/components/RegionFilter.vue'
import ExceptionsTable from '@/components/ExceptionsTable.vue'
import ShipmentVolumeChart from '@/components/ShipmentVolumeChart.vue'
import DeliveryPerformanceChart from '@/components/DeliveryPerformanceChart.vue'
import ExceptionBreakdownChart from '@/components/ExceptionBreakdownChart.vue'
import { useDashboardData } from '@/composables/useDashboardData'

const { getMetrics, getExceptions } = useDashboardData()

const metrics = computed(() => getMetrics.value)
const exceptionCount = computed(() => getExceptions.value.length)
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.app-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 64px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.5px;
}

.header-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

/* Content below app bar */
.dashboard-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 1rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

/* Page header with integrated filter */
.page-header {
  margin-bottom: 2.5rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.page-description {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

.header-filter {
  flex-shrink: 0;
  min-width: 250px;
}

/* KPI Section */
.kpi-section {
  margin-bottom: 3rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

/* Section Cards */
.section-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.section-card.full-width {
  margin-bottom: 2rem;
}

.section-card:not(.full-width) {
  margin-bottom: 0;
}

.section-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  background-color: #fafbfc;
  flex-shrink: 0;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.25px;
  margin: 0;
}

.section-subtitle {
  font-size: 0.85rem;
  color: #9ca3af;
  font-weight: 500;
  margin: 0.25rem 0 0 0;
}

.header-title-with-chip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.exception-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  background-color: #fee2e2;
  color: #991b1b;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 4px;
  flex-shrink: 0;
}

/* Section body with different sizing */
.section-body {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.chart-body-large {
  padding: 1.5rem;
  min-height: 380px;
}

.chart-body-medium {
  padding: 1.5rem;
  min-height: 300px;
}

.table-body {
  padding: 0;
  overflow-x: auto;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .dashboard-content {
    max-width: 100%;
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  .charts-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .dashboard-content {
    padding: 1.5rem 1rem;
  }

  .header-top {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }

  .header-filter {
    min-width: auto;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .charts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .chart-body-large {
    min-height: 320px;
  }

  .chart-body-medium {
    min-height: 280px;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 1.25rem 0.75rem;
  }

  .page-title {
    font-size: 1.375rem;
  }

  .page-description {
    font-size: 0.875rem;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .charts-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .chart-body-large {
    min-height: 280px;
    padding: 1rem;
  }

  .chart-body-medium {
    min-height: 240px;
    padding: 1rem;
  }

  .section-header {
    padding: 1.25rem;
  }

  .section-body {
    padding: 1rem;
  }

  .section-card.full-width {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 640px) {
  .dashboard-content {
    padding: 1rem 0.5rem;
  }

  .header-top {
    gap: 1rem;
  }

  .page-title {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  .page-description {
    font-size: 0.8125rem;
  }

  .header-filter {
    width: 100%;
  }

  .page-header {
    margin-bottom: 2rem;
  }

  .kpi-section {
    margin-bottom: 2rem;
  }

  .section-card {
    border-radius: 6px;
  }

  .section-header {
    padding: 1rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .section-subtitle {
    font-size: 0.8rem;
  }

  .chart-body-large {
    min-height: 240px;
    padding: 0.75rem;
  }

  .chart-body-medium {
    min-height: 200px;
    padding: 0.75rem;
  }
}

/* Scrollbar styling for better UX */
.dashboard-content::-webkit-scrollbar {
  width: 8px;
}

.dashboard-content::-webkit-scrollbar-track {
  background: transparent;
}

.dashboard-content::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 4px;
}

.dashboard-content::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>
