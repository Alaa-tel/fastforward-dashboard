<template>
  <v-table class="regional-table">
    <thead>
      <tr>
        <th>Region</th>
        <th>Shipment Volume</th>
        <th>On-Time Delivery %</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="region in regionalPerformance" :key="region.region">
        <td class="region-name">{{ region.region }}</td>
        <td class="numeric">{{ region.shipmentVolume.toLocaleString() }}</td>
        <td class="numeric">{{ region.onTimeDeliveryRate.toFixed(1) }}%</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardData } from '@/composables/useDashboardData'

const { getRegionalPerformance } = useDashboardData()

const regionalPerformance = computed(() => getRegionalPerformance.value)
</script>

<style scoped>
.regional-table {
  width: 100%;
  background-color: transparent;
}

.regional-table thead tr {
  border-bottom: 2px solid #e0e0e0;
}

.regional-table th {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 1rem;
  text-align: left;
}

.regional-table tbody tr {
  border-bottom: 1px solid #f0f0f0;
}

.regional-table tbody tr:hover {
  background-color: #fafafa;
}

.regional-table td {
  padding: 1rem;
  color: #333;
  font-size: 0.95rem;
}

.region-name {
  font-weight: 500;
  color: #1a1a1a;
}

.numeric {
  text-align: right;
  font-family: 'Courier New', monospace;
  font-weight: 500;
}
</style>
