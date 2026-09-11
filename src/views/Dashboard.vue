<template>
  <div class="dashboard-wrapper">
    <!-- App Bar Header -->
    <v-app-bar elevation="1" class="app-header">
      <v-toolbar-title>FastForward Logistics</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="header-subtitle">Internal Operations Portal</div>
    </v-app-bar>

    <!-- Main Content -->
    <v-container fluid class="dashboard-content">
      <!-- Title and Description -->
      <v-row class="mb-4">
        <v-col cols="12">
          <h2 class="page-title">Executive Operations Dashboard</h2>
          <p class="page-description">Real-time view of logistics operations and performance</p>
        </v-col>
      </v-row>

      <!-- Filters Section -->
      <v-row class="mb-6">
        <v-col cols="12">
          <RegionFilter />
        </v-col>
      </v-row>

      <!-- KPI Cards Section -->
      <v-row v-if="metrics" class="mb-6">
        <v-col cols="12" sm="6" md="3">
          <MetricCard
            label="Total Shipments"
            :value="metrics.totalShipments.current"
            :trend="metrics.totalShipments.trend"
            :trend-direction="metrics.totalShipments.direction"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <MetricCard
            label="On-Time Delivery Rate"
            :value="metrics.onTimeDeliveryRate.current"
            :trend="metrics.onTimeDeliveryRate.trend"
            :trend-direction="metrics.onTimeDeliveryRate.direction"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <MetricCard
            label="Average Transit Time"
            :value="metrics.averageTransitTime.current"
            :trend="metrics.averageTransitTime.trend"
            :trend-direction="metrics.averageTransitTime.direction"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <MetricCard
            label="Open Exceptions"
            :value="metrics.openExceptions.current"
            :trend="metrics.openExceptions.trend"
            :trend-direction="metrics.openExceptions.direction"
          />
        </v-col>
      </v-row>

      <!-- Shipment Volume Section -->
      <v-row class="mb-6">
        <v-col cols="12">
          <v-card class="section-card">
            <v-card-item>
              <v-card-title>Shipment Volume</v-card-title>
            </v-card-item>
            <v-card-text>
              <div class="placeholder-container">
                <p class="placeholder-text">Shipment volume chart placeholder ({{ shipmentVolumeData.length }} data points)</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Regional Performance Section -->
      <v-row class="mb-6">
        <v-col cols="12">
          <v-card class="section-card">
            <v-card-item>
              <v-card-title>Regional Performance</v-card-title>
            </v-card-item>
            <v-card-text>
              <RegionalPerformanceTable />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Open Exceptions Section -->
      <v-row class="mb-6">
        <v-col cols="12">
          <v-card class="section-card">
            <v-card-item>
              <v-card-title>Open Exceptions ({{ exceptionCount }} total)</v-card-title>
            </v-card-item>
            <v-card-text>
              <ExceptionsTable />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
  background-color: #f5f5f5;
}

.app-header {
  background-color: #ffffff !important;
  border-bottom: 1px solid #e0e0e0;
}

.header-subtitle {
  font-size: 0.875rem;
  color: #666;
  font-weight: 400;
}

.dashboard-content {
  padding-top: 2rem;
  padding-bottom: 2rem;
  max-width: 1400px;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
}

.page-description {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
}

.section-card {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-card :deep(.v-card-title) {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.placeholder-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background-color: #fafafa;
  border: 1px dashed #ddd;
  border-radius: 4px;
}

.placeholder-text {
  color: #999;
  font-size: 0.9rem;
  margin: 0;
}
</style>
