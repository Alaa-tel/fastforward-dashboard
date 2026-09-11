import { ref, computed } from 'vue'
import metricsData from '@/data/metrics.json'

export interface MetricsSummary {
  totalShipments: number
  onTimeDeliveryRate: number
  averageTransitTime: number
  openExceptions: number
}

export interface RegionalPerformance {
  region: string
  shipmentVolume: number
  onTimeDeliveryRate: number
}

export interface Exception {
  shipmentId: string
  region: string
  exceptionType: string
  severity: 'low' | 'medium' | 'high'
  status: string
}

export interface ShipmentDataPoint {
  date: string
  volume: number
}

// Global state - shared across all component instances
let dashboardState: ReturnType<typeof createDashboardState> | null = null

function createDashboardState() {
  const selectedRegion = ref('All Regions')

  // Get the available regions
  const regions = [
    'All Regions',
    'Northeast',
    'Southeast',
    'Midwest',
    'West'
  ]

  // Calculate trend direction
  const calculateTrendDirection = (current: number, previous: number): 'up' | 'down' | 'neutral' => {
    if (current > previous) return 'up'
    if (current < previous) return 'down'
    return 'neutral'
  }

  // Calculate trend percentage
  const calculateTrendPercentage = (current: number, previous: number): string => {
    const diff = current - previous
    const percentage = ((diff / previous) * 100).toFixed(1)
    
    if (percentage === '0.0') return 'No change'
    if (parseFloat(percentage) > 0) {
      return `+${percentage}%`
    }
    return `${percentage}%`
  }

  // Get KPI metrics based on selected region
  const getMetrics = computed(() => {
    if (selectedRegion.value === 'All Regions') {
      const current = metricsData.summary.allRegions
      const previous = metricsData.summary.previousPeriod

      return {
        totalShipments: {
          current: current.totalShipments,
          trend: `${calculateTrendPercentage(current.totalShipments, previous.totalShipments)} from last period`,
          direction: calculateTrendDirection(current.totalShipments, previous.totalShipments) as 'up' | 'down' | 'neutral'
        },
        onTimeDeliveryRate: {
          current: `${current.onTimeDeliveryRate}%`,
          trend: `${calculateTrendPercentage(current.onTimeDeliveryRate, previous.onTimeDeliveryRate)} from last period`,
          direction: calculateTrendDirection(current.onTimeDeliveryRate, previous.onTimeDeliveryRate) as 'up' | 'down' | 'neutral'
        },
        averageTransitTime: {
          current: `${current.averageTransitTime} days`,
          trend: current.averageTransitTime < previous.averageTransitTime 
            ? `-${(previous.averageTransitTime - current.averageTransitTime).toFixed(1)} days from last period`
            : `+${(current.averageTransitTime - previous.averageTransitTime).toFixed(1)} days from last period`,
          direction: (current.averageTransitTime < previous.averageTransitTime ? 'down' : 'up') as 'up' | 'down'
        },
        openExceptions: {
          current: current.openExceptions,
          trend: `${current.openExceptions - previous.openExceptions > 0 ? '+' : ''}${current.openExceptions - previous.openExceptions} from last period`,
          direction: (current.openExceptions > previous.openExceptions ? 'up' : 'down') as 'up' | 'down'
        }
      }
    }

    // Get region-specific data
    const regionData = metricsData.regions[selectedRegion.value as keyof typeof metricsData.regions]
    if (!regionData) {
      return null
    }

    const current = regionData.current
    const previous = regionData.previous

    return {
      totalShipments: {
        current: current.totalShipments,
        trend: `${calculateTrendPercentage(current.totalShipments, previous.totalShipments)} from last period`,
        direction: calculateTrendDirection(current.totalShipments, previous.totalShipments) as 'up' | 'down' | 'neutral'
      },
      onTimeDeliveryRate: {
        current: `${current.onTimeDeliveryRate}%`,
        trend: `${calculateTrendPercentage(current.onTimeDeliveryRate, previous.onTimeDeliveryRate)} from last period`,
        direction: calculateTrendDirection(current.onTimeDeliveryRate, previous.onTimeDeliveryRate) as 'up' | 'down' | 'neutral'
      },
      averageTransitTime: {
        current: `${current.averageTransitTime} days`,
        trend: current.averageTransitTime < previous.averageTransitTime 
          ? `-${(previous.averageTransitTime - current.averageTransitTime).toFixed(1)} days from last period`
          : `+${(current.averageTransitTime - previous.averageTransitTime).toFixed(1)} days from last period`,
        direction: (current.averageTransitTime < previous.averageTransitTime ? 'down' : 'up') as 'up' | 'down'
      },
      openExceptions: {
        current: current.openExceptions,
        trend: `${current.openExceptions - previous.openExceptions > 0 ? '+' : ''}${current.openExceptions - previous.openExceptions} from last period`,
        direction: (current.openExceptions > previous.openExceptions ? 'up' : 'down') as 'up' | 'down'
      }
    }
  })

  // Get shipment volume data for chart
  const getShipmentVolumeData = computed(() => {
    if (selectedRegion.value === 'All Regions') {
      return metricsData.shipmentVolume.allRegions
    }
    return metricsData.shipmentVolume[selectedRegion.value as keyof typeof metricsData.shipmentVolume]
  })

  // Get regional performance data
  const getRegionalPerformance = computed(() => {
    if (selectedRegion.value === 'All Regions') {
      return metricsData.regionalPerformance
    }

    // Filter to show only selected region
    return metricsData.regionalPerformance.filter(
      r => r.region === selectedRegion.value
    )
  })

  // Get exceptions filtered by region
  const getExceptions = computed(() => {
    if (selectedRegion.value === 'All Regions') {
      return metricsData.exceptions
    }

    return metricsData.exceptions.filter(
      e => e.region === selectedRegion.value
    )
  })

  return {
    selectedRegion,
    regions,
    getMetrics,
    getShipmentVolumeData,
    getRegionalPerformance,
    getExceptions
  }
}

export function useDashboardData() {
  if (!dashboardState) {
    dashboardState = createDashboardState()
  }
  return dashboardState
}
