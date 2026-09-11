<template>
  <v-card class="filter-card">
    <v-card-text class="filter-content">
      <div class="filter-container">
        <label class="filter-label">Region:</label>
        <v-select
          v-model="selectedRegion"
          :items="regions"
          variant="outlined"
          density="comfortable"
          class="region-select"
          hide-details
          prepend-inner-icon="mdi-map-marker"
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
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.filter-content {
  padding: 1rem;
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-label {
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
  margin: 0;
  font-size: 0.95rem;
  letter-spacing: -0.25px;
}

.region-select {
  min-width: 180px;
  flex: 0 1 auto;
}

@media (max-width: 640px) {
  .filter-container {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }

  .region-select {
    min-width: 100%;
  }
}
</style>
