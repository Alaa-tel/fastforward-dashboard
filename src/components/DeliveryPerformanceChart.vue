<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useDashboardData } from '@/composables/useDashboardData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const { getRegionalPerformance } = useDashboardData()

const chartData = computed(() => ({
  labels: getRegionalPerformance.value.map(r => r.region),
  datasets: [
    {
      label: 'On-Time Delivery Rate',
      data: getRegionalPerformance.value.map(r => r.onTimeDeliveryRate),
      backgroundColor: [
        '#10b981',
        '#3b82f6',
        '#f59e0b',
        '#ef4444'
      ],
      borderRadius: 6,
      borderSkipped: false,
      borderColor: '#ffffff',
      borderWidth: 2
    }
  ]
}))

const chartOptions = computed(() => ({
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: true,
  interaction: {
    intersect: false,
    mode: 'index' as const
  },
  plugins: {
    legend: {
      display: false
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
          return `${context.parsed.x.toFixed(1)}%`
        }
      }
    }
  },
  scales: {
    x: {
      display: true,
      min: 85,
      max: 100,
      grid: {
        color: '#f3f4f6',
        drawBorder: false,
        lineWidth: 1
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 11,
          weight: 500
        },
        callback: function(value: any) {
          return value + '%'
        }
      }
    },
    y: {
      display: true,
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 11,
          weight: 500 as const
        }
      }
    }
  }
}))
</script>

<template>
  <div class="chart-container">
    <Bar
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
  padding: 0.5rem 0;
}
</style>
