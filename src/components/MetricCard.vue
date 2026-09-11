<template>
  <v-card class="metric-card">
    <v-card-item>
      <template #prepend>
        <div class="metric-icon" :class="[`trend-${trendDirection}`]">
          <v-icon v-if="trendDirection === 'up'" size="small">mdi-trending-up</v-icon>
          <v-icon v-else-if="trendDirection === 'down'" size="small">mdi-trending-down</v-icon>
          <v-icon v-else size="small">mdi-minus</v-icon>
        </div>
      </template>

      <v-card-title class="metric-label">{{ label }}</v-card-title>
    </v-card-item>

    <v-card-text>
      <div class="metric-value">{{ value }}</div>
      <div class="metric-trend" :class="[`trend-${trendDirection}`]">
        {{ trend }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  trend: string
  trendDirection?: 'up' | 'down' | 'neutral'
}

withDefaults(defineProps<Props>(), {
  trendDirection: 'neutral'
})
</script>

<style scoped>
.metric-card {
  height: 100%;
  transition: all 0.2s ease;
  border: 1px solid #e0e0e0;
  position: relative;
  overflow: hidden;
}

.metric-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1976d2, #42a5f5);
  opacity: 0.8;
}

.metric-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.25rem;
  margin-right: 0.5rem;
}

.metric-icon.trend-up {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.metric-icon.trend-down {
  background-color: #ffebee;
  color: #c62828;
}

.metric-icon.trend-neutral {
  background-color: #f5f5f5;
  color: #757575;
}

.metric-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 !important;
  margin: 0 !important;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0.75rem 0 0.5rem 0;
  line-height: 1;
}

.metric-trend {
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  display: inline-block;
  margin-top: 0.5rem;
}

.metric-trend.trend-up {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.metric-trend.trend-down {
  background-color: #ffebee;
  color: #c62828;
}

.metric-trend.trend-neutral {
  background-color: #f5f5f5;
  color: #757575;
}
</style>
