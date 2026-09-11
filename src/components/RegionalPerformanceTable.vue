<template>
  <div class="table-wrapper">
    <table class="regional-table">
      <thead>
        <tr>
          <th class="col-region">Region</th>
          <th class="col-number">Shipments</th>
          <th class="col-performance">On-Time Delivery</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="region in regionalPerformance" :key="region.region">
          <td class="col-region">
            <span class="region-name">{{ region.region }}</span>
          </td>
          <td class="col-number">{{ region.shipmentVolume.toLocaleString() }}</td>
          <td class="col-performance">
            <div class="performance-badge" :class="performanceClass(region.onTimeDeliveryRate)">
              <span class="performance-value">{{ region.onTimeDeliveryRate.toFixed(1) }}%</span>
              <div class="performance-bar">
                <div 
                  class="performance-fill" 
                  :style="{ width: region.onTimeDeliveryRate + '%' }"
                ></div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardData } from '@/composables/useDashboardData'

const { getRegionalPerformance } = useDashboardData()

const regionalPerformance = computed(() => getRegionalPerformance.value)

const performanceClass = (rate: number): string => {
  if (rate >= 95) return 'excellent'
  if (rate >= 90) return 'good'
  if (rate >= 85) return 'fair'
  return 'poor'
}
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}

.regional-table {
  width: 100%;
  border-collapse: collapse;
  background-color: transparent;
}

.regional-table thead {
  background-color: #f9fafb;
}

.regional-table th {
  font-weight: 700;
  color: #374151;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #e5e7eb;
}

.col-region {
  width: 30%;
}

.col-number {
  width: 25%;
  text-align: right;
  padding-right: 1rem;
}

.col-performance {
  width: 45%;
}

.regional-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.15s ease;
}

.regional-table tbody tr:hover {
  background-color: #f9fafb;
}

.regional-table td {
  padding: 1rem;
  color: #374151;
  font-size: 0.95rem;
}

.region-name {
  font-weight: 600;
  color: #111827;
}

.performance-badge {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.performance-value {
  font-weight: 700;
  font-size: 0.95rem;
}

.performance-bar {
  width: 100%;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.performance-fill {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 3px;
}

.performance-badge.excellent .performance-value {
  color: #059669;
}

.performance-badge.excellent .performance-fill {
  background-color: #059669;
}

.performance-badge.good .performance-value {
  color: #0891b2;
}

.performance-badge.good .performance-fill {
  background-color: #0891b2;
}

.performance-badge.fair .performance-value {
  color: #d97706;
}

.performance-badge.fair .performance-fill {
  background-color: #d97706;
}

.performance-badge.poor .performance-value {
  color: #dc2626;
}

.performance-badge.poor .performance-fill {
  background-color: #dc2626;
}

@media (max-width: 768px) {
  .col-region {
    width: 40%;
  }

  .col-number {
    width: 25%;
  }

  .col-performance {
    width: 35%;
  }

  .regional-table th,
  .regional-table td {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
}
</style>
