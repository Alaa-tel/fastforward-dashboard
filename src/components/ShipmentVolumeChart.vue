<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { useDashboardData } from '@/composables/useDashboardData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const { getShipmentVolumeData } = useDashboardData()

const chartData = computed(() => ({
  labels: getShipmentVolumeData.value.map(d => {
    const date = new Date(d.date)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }),
  datasets: [
    {
      label: 'Shipment Volume',
      data: getShipmentVolumeData.value.map(d => d.volume),
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.08)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#1d4ed8'
    }
  ]
}))

const chartOptions = computed(() => ({
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
          return `${context.parsed.y} shipments`
        }
      }
    }
  },
  scales: {
    x: {
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
        },
        maxRotation: 45,
        minRotation: 0
      }
    },
    y: {
      display: true,
      beginAtZero: false,
      grid: {
        color: '#f3f4f6',
        drawBorder: false,
        lineWidth: 1
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 11,
          weight: 500 as const
        },
        stepSize: 20
      }
    }
  }
}))
</script>

<template>
  <div class="chart-container">
    <Line
      :data="chartData"
      :options="chartOptions"
      :height="300"
    />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 300px;
  padding: 0.5rem 0;
}
</style>
