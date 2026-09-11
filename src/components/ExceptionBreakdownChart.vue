<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { useDashboardData } from '@/composables/useDashboardData'

ChartJS.register(ArcElement, Tooltip, Legend)

const { getExceptions } = useDashboardData()

const exceptionBreakdown = computed(() => {
  const breakdown: Record<string, number> = {
    'Delayed shipment': 0,
    'Weather disruption': 0,
    'Carrier issue': 0,
    'Missing documentation': 0,
    'Capacity constraint': 0
  }

  getExceptions.value.forEach(exc => {
    if (breakdown.hasOwnProperty(exc.exceptionType)) {
      breakdown[exc.exceptionType]++
    }
  })

  return breakdown
})

const chartData = computed(() => ({
  labels: Object.keys(exceptionBreakdown.value),
  datasets: [
    {
      data: Object.values(exceptionBreakdown.value),
      backgroundColor: [
        '#ef4444',
        '#f97316',
        '#eab308',
        '#8b5cf6',
        '#ec4899'
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: '#6b7280',
        font: {
          size: 12,
          weight: 500
        },
        padding: 16,
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      padding: 12,
      titleFont: { size: 13, weight: 600 },
      bodyFont: { size: 12 },
      borderColor: '#e5e7eb',
      borderWidth: 1,
      bodyColor: '#ffffff',
      titleColor: '#ffffff',
      callbacks: {
        label: function(context: any) {
          const value = context.parsed
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((value / total) * 100).toFixed(1)
          return `${value} (${percentage}%)`
        }
      }
    }
  }
}))
</script>

<template>
  <div class="chart-container">
    <Doughnut
      :data="chartData"
      :options="chartOptions"
      :height="200"
    />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 200px;
}
</style>
