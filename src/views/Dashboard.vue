<template>
  <div class="dashboard-wrapper">
    <!-- App Bar Header -->
    <v-app-bar elevation="1" class="app-header">
      <v-toolbar-title class="header-title">FastForward Logistics</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="header-subtitle">Internal Operations Portal</div>
    </v-app-bar>

    <!-- Main Content -->
    <v-container fluid class="dashboard-content">
      <!-- Title Section -->
      <div class="title-section">
        <h2 class="page-title">Executive Operations Dashboard</h2>
        <p class="page-description">Real-time view of logistics operations and performance</p>
      </div>

      <!-- Filters Section -->
      <div class="filters-section">
        <RegionFilter />
      </div>

      <!-- KPI Cards Section -->
      <div class="kpi-section" v-if="metrics">
        <v-row class="kpi-row">
          <v-col cols="12" sm="6" lg="3">
            <MetricCard
              label="Total Shipments"
              :value="metrics.totalShipments.current"
              :trend="metrics.totalShipments.trend"
              :trend-direction="metrics.totalShipments.direction"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <MetricCard
              label="On-Time Delivery Rate"
              :value="metrics.onTimeDeliveryRate.current"
              :trend="metrics.onTimeDeliveryRate.trend"
              :trend-direction="metrics.onTimeDeliveryRate.direction"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <MetricCard
              label="Average Transit Time"
              :value="metrics.averageTransitTime.current"
              :trend="metrics.averageTransitTime.trend"
              :trend-direction="metrics.averageTransitTime.direction"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <MetricCard
              label="Open Exceptions"
              :value="metrics.openExceptions.current"
              :trend="metrics.openExceptions.trend"
              :trend-direction="metrics.openExceptions.direction"
            />
          </v-col>
        </v-row>
      </div>

      <!-- Shipment Volume Section -->
      <div class="section-wrapper">
        <v-card class="section-card">
          <v-card-item class="section-header">
            <template #title>
              <span class="section-title">Shipment Volume</span>
              <span class="section-subtitle">({{ shipmentVolumeData.length }} days tracked)</span>
            </template>
          </v-card-item>
          <v-card-text class="section-content">
            <div class="placeholder-container">
              <p class="placeholder-text">Chart visualization coming soon</p>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- Regional Performance Section -->
      <div class="section-wrapper">
        <v-card class="section-card">
          <v-card-item class="section-header">
            <template #title>
              <span class="section-title">Regional Performance</span>
            </template>
          </v-card-item>
          <v-card-text class="section-content">
            <RegionalPerformanceTable />
          </v-card-text>
        </v-card>
      </div>

      <!-- Open Exceptions Section -->
      <div class="section-wrapper">
        <v-card class="section-card">
          <v-card-item class="section-header">
            <template #title>
              <span class="section-title">Open Exceptions</span>
              <v-chip class="exception-count" size="small" variant="tonal">{{ exceptionCount }}</v-chip>
            </template>
          </v-card-item>
          <v-card-text class="section-content">
            <ExceptionsTable />
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MetricCard from '../components/MetricCard.vue'
import RegionFilter from '../components/RegionFilter.vue'
import RegionalPerformanceTable from '../components/RegionalPerformanceTable.vue'
import ExceptionsTable from '../components/ExceptionsTable.vue'
import { useDashboardData } from '@/composables/useDashboardData'

const { getMetrics, getShipmentVolumeData, getExceptions } = useDashboardData()

const metrics = computed(() => getMetrics.value)
const shipmentVolumeData = computed(() => getShipmentVolumeData.value)
const exceptionCount = computed(() => getExceptions.value.length)
</script>

<style scoped>
.dashboard-wrapper {
  min-height: 100vh;
  background-color: #f9fafb;
}

.app-header {
  background-color: #ffffff !important;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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

.dashboard-content {
  padding: 2rem 1rem;
  max-width: 1280px;
}

.title-section {
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.5px;
}

.page-description {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

.filters-section {
  margin-bottom: 2.5rem;
}

.kpi-section {
  margin-bottom: 2.5rem;
}

.kpi-row {
  row-gap: 1.5rem;
}

.section-wrapper {
  margin-bottom: 2.5rem;
}

.section-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  overflow: hidden;
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
}

.section-subtitle {
  margin-left: 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: #9ca3af;
}

.exception-count {
  margin-left: 0.75rem;
  font-weight: 600;
  font-size: 0.8rem;
}

.section-content {
  padding: 1.5rem;
}

.placeholder-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border: 2px dashed #d1d5db;
  border-radius: 6px;
}

.placeholder-text {
  color: #9ca3af;
  font-size: 0.95rem;
  margin: 0;
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .dashboard-content {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .section-wrapper {
    margin-bottom: 2rem;
  }
}

@media (max-width: 640px) {
  .dashboard-content {
    padding: 1rem;
  }

  .title-section {
    margin-bottom: 1.5rem;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .page-description {
    font-size: 0.875rem;
  }

  .filters-section {
    margin-bottom: 2rem;
  }

  .kpi-section {
    margin-bottom: 2rem;
  }

  .section-wrapper {
    margin-bottom: 1.5rem;
  }

  .section-header {
    padding: 1rem;
  }

  .section-content {
    padding: 1rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .placeholder-container {
    min-height: 180px;
  }
}
</style>
