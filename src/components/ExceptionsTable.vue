<template>
  <v-table class="exceptions-table">
    <thead>
      <tr>
        <th>Shipment ID</th>
        <th>Region</th>
        <th>Exception Type</th>
        <th>Severity</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="exception in exceptions" :key="exception.shipmentId">
        <td class="shipment-id">{{ exception.shipmentId }}</td>
        <td>{{ exception.region }}</td>
        <td>{{ exception.exceptionType }}</td>
        <td>
          <v-chip
            :color="severityColor(exception.severity)"
            size="small"
            label
          >
            {{ exception.severity }}
          </v-chip>
        </td>
        <td>
          <span :class="['status-badge', `status-${exception.status.toLowerCase().replace(' ', '-')}`]">
            {{ exception.status }}
          </span>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardData } from '@/composables/useDashboardData'

const { getExceptions } = useDashboardData()

const exceptions = computed(() => getExceptions.value)

const severityColor = (severity: string): string => {
  const colors: Record<string, string> = {
    low: '#e8f5e9',
    medium: '#fff3e0',
    high: '#ffebee'
  }
  return colors[severity] || '#f5f5f5'
}
</script>

<style scoped>
.exceptions-table {
  width: 100%;
  background-color: transparent;
}

.exceptions-table thead tr {
  border-bottom: 2px solid #e0e0e0;
}

.exceptions-table th {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 1rem;
  text-align: left;
}

.exceptions-table tbody tr {
  border-bottom: 1px solid #f0f0f0;
}

.exceptions-table tbody tr:hover {
  background-color: #fafafa;
}

.exceptions-table td {
  padding: 1rem;
  color: #333;
  font-size: 0.95rem;
  vertical-align: middle;
}

.shipment-id {
  font-family: 'Courier New', monospace;
  font-weight: 500;
  color: #1976d2;
}

.status-badge {
  display: inline-block;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
}

.status-in-progress {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-monitoring {
  background-color: #f3e5f5;
  color: #6a1b9a;
}

.status-pending-resolution {
  background-color: #fce4ec;
  color: #c2185b;
}

.status-resolved {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-escalated {
  background-color: #ffebee;
  color: #c62828;
}
</style>
