<template>
  <v-card class="filter-card">
    <v-card-text>
      <div class="filter-container">
        <label class="filter-label">Filter by Region:</label>
        <v-select
          v-model="selectedRegion"
          :items="regions"
          variant="outlined"
          density="compact"
          class="region-select"
          hide-details
        ></v-select>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useDashboardData } from '@/composables/useDashboardData'

const { selectedRegion, regions } = useDashboardData()
</script>

<style scoped>
.filter-card {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  font-weight: 500;
  color: #666;
  white-space: nowrap;
  margin: 0;
}

.region-select {
  min-width: 200px;
  flex-shrink: 0;
}
</style>
