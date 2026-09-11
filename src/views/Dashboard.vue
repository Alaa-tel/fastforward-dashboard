<template>
  <div class="dashboard-layout">
    <!-- App Bar Header -->
    <v-app-bar elevation="1" class="app-header">
      <v-toolbar-title class="header-title">FastForward Logistics</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="header-subtitle">Internal Operations Portal</div>
    </v-app-bar>

    <!-- Main Content Container -->
    <div class="dashboard-content">
      <!-- Title Section -->
      <div class="page-header">
        <h1 class="page-title">Executive Operations Dashboard</h1>
        <p class="page-description">Real-time view of logistics operations and performance</p>
      </div>

      <!-- Region Filter -->
      <div class="filter-bar">
        <RegionFilter />
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
      <div class="section-card">
        <div class="section-header">
          <h2 class="section-title">Shipment Volume</h2>
          <p class="section-subtitle">15-day trend</p>
        </div>
        <div class="section-body">
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
          <div class="section-body chart-body">
            <DeliveryPerformanceChart />
          </div>
        </div>

        <!-- Exception Breakdown Chart -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">Exception Breakdown</h2>
            <p class="section-subtitle">Distribution of open exceptions</p>
          </div>
          <div class="section-body chart-body">
            <ExceptionBreakdownChart />
          </div>
        </div>
      </div>

      <!-- Open Exceptions Table Section -->
      <div class="section-card">
        <div class="section-header">
          <div class="header-title-with-chip">
            <h2 class="section-title">Open Exceptions</h2>
            <div class="exception-badge">{{ exceptionCount }}</div>
          </div>
          <p class="section-subtitle">Detailed exception log</p>
        </div>
        <div class="section-body">
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
  background-color: #ffffff !important;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
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
}

/* Page header */
.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.5px;
}

.page-description {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

/* Filter bar */
.filter-bar {
  margin-bottom: 2.5rem;
  max-width: 400px;
}

/* KPI Section */
.kpi-section {
  margin-bottom: 3rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Section Cards */
.section-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.section-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  background-color: #fafbfc;
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
}

.section-body {
  padding: 1.5rem;
}

.chart-body {
  padding: 1rem 1.5rem;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .dashboard-content {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .kpi-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .charts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .dashboard-content {
    padding: 1rem 0.75rem;
  }

  .page-title {
    font-size: 1.375rem;
  }

  .page-description {
    font-size: 0.875rem;
  }

  .filter-bar {
    margin-bottom: 1.5rem;
  }

  .kpi-section {
    margin-bottom: 2rem;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .section-card {
    margin-bottom: 1.5rem;
    border-radius: 6px;
  }

  .section-header {
    padding: 1rem;
  }

  .section-body {
    padding: 1rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .charts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
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
