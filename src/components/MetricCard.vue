<template>
  <v-card class="metric-card">
    <div class="card-accent"></div>
    
    <v-card-text class="card-content">
      <div class="header-row">
        <h3 class="metric-label">{{ label }}</h3>
        <div class="metric-icon" :class="[`trend-${trendDirection}`]">
          <v-icon size="x-small" :icon="trendIcon"></v-icon>
        </div>
      </div>

      <div class="metric-value">{{ value }}</div>
      
      <div class="metric-trend" :class="[`trend-${trendDirection}`]">
        {{ trend }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  value: string | number
  trend: string
  trendDirection?: 'up' | 'down' | 'neutral'
}

const props = withDefaults(defineProps<Props>(), {
  trendDirection: 'neutral'
})

const trendIcon = computed(() => {
  if (props.trendDirection === 'up') return 'mdi-trending-up'
  if (props.trendDirection === 'down') return 'mdi-trending-down'
  return 'mdi-minus'
})
</script>

<style scoped>
.metric-card {
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.metric-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
  opacity: 0.9;
}

.card-content {
  padding: 1.5rem;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 0.75rem;
}

.metric-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  flex: 1;
}

.metric-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  flex-shrink: 0;
}

.metric-icon.trend-up {
  background-color: #ecfdf5;
  color: #059669;
}

.metric-icon.trend-down {
  background-color: #fef2f2;
  color: #dc2626;
}

.metric-icon.trend-neutral {
  background-color: #f3f4f6;
  color: #6b7280;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.75rem 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.metric-trend {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.metric-trend.trend-up {
  background-color: #ecfdf5;
  color: #059669;
}

.metric-trend.trend-down {
  background-color: #fef2f2;
  color: #dc2626;
}

.metric-trend.trend-neutral {
  background-color: #f3f4f6;
  color: #6b7280;
}
</style>
