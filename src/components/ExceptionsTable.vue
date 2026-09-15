<template>
  <div class="table-wrapper">
    <table class="exceptions-table">
      <thead>
        <tr>
          <th class="col-shipment">Shipment ID</th>
          <th class="col-region">Region</th>
          <th class="col-type">Exception Type</th>
          <th class="col-severity">Severity</th>
          <th class="col-status">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exception in exceptions" :key="exception.shipmentId" :class="severityClass(exception.severity)">
          <td class="col-shipment">
            <code class="shipment-id">{{ exception.shipmentId }}</code>
          </td>
          <td class="col-region">{{ exception.region }}</td>
          <td class="col-type">{{ exception.exceptionType }}</td>
          <td class="col-severity">
            <span class="severity-badge" :class="`severity-${exception.severity}`">
              {{ exception.severity }}
            </span>
          </td>
          <td class="col-status">
            <span class="status-badge" :class="`status-${exception.status.toLowerCase().replace(/\\s+/g, '-')}`">
              {{ exception.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardData } from '@/composables/useDashboardData'

const { getExceptions } = useDashboardData()

const exceptions = computed(() => getExceptions.value)

const severityClass = (severity: string): string => {
  return `severity-${severity}`
}
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}

.exceptions-table {
  width: 100%;
  border-collapse: collapse;
  background-color: transparent;
}

.exceptions-table thead {
  background-color: #f9fafb;
}

.exceptions-table th {
  font-weight: 700;
  color: #374151;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 2px solid #e5e7eb;
}

.col-shipment {
  width: 15%;
  min-width: 120px;
}

.col-region {
  width: 15%;
  min-width: 100px;
}

.col-type {
  width: 25%;
  min-width: 140px;
}

.col-severity {
  width: 12%;
  min-width: 90px;
}

.col-status {
  width: 20%;
  min-width: 120px;
}

.exceptions-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.15s ease;
}

.exceptions-table tbody tr:hover {
  background-color: #f9fafb;
}

.exceptions-table tbody tr.severity-high {
  border-left: 4px solid #dc2626;
}

.exceptions-table tbody tr.severity-medium {
  border-left: 4px solid #f59e0b;
}

.exceptions-table tbody tr.severity-low {
  border-left: 4px solid #6b7280;
}

.exceptions-table td {
  padding: 0.75rem 1rem;
  color: #374151;
  font-size: 0.95rem;
  vertical-align: middle;
}

.shipment-id {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #2563eb;
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.85rem;
}

.severity-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.severity-badge.severity-high {
  background-color: #fee2e2;
  color: #991b1b;
}

.severity-badge.severity-medium {
  background-color: #fef3c7;
  color: #92400e;
}

.severity-badge.severity-low {
  background-color: #e5e7eb;
  color: #374151;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-in-progress {
  background-color: #dbeafe;
  color: #1e40af;
}

.status-monitoring {
  background-color: #e9d5ff;
  color: #581c87;
}

.status-pending-resolution {
  background-color: #fbcfe8;
  color: #831843;
}

.status-resolved {
  background-color: #dcfce7;
  color: #15803d;
}

.status-escalated {
  background-color: #fecaca;
  color: #7f1d1d;
}

@media (max-width: 768px) {
  .exceptions-table th,
  .exceptions-table td {
    padding: 0.75rem;
    font-size: 0.875rem;
  }

  .col-shipment {
    width: 20%;
    min-width: 90px;
  }

  .col-type {
    width: 30%;
    min-width: 120px;
  }

  .col-severity {
    width: 15%;
  }

  .col-status {
    width: 20%;
  }

  .severity-badge,
  .status-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }

  .shipment-id {
    font-size: 0.75rem;
  }
}
</style>
