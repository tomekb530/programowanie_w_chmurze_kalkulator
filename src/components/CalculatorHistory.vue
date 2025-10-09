<template>
  <v-container class="pa-4">
    <div class="d-flex justify-center mb-3">
      <v-btn
        @click="calculatorStore.clearHistory"
        color="red"
        size="small"
      >
        🗑️ Wyczyść historię
      </v-btn>
    </div>
    
    <v-list v-if="calculatorStore.history.length > 0" class="history-list">
      <v-list-item
        v-for="(calculation, index) in calculatorStore.history.slice().reverse()"
        :key="index"
        class="history-item"
      >
        <template #prepend>
          <v-icon color="primary">mdi-calculator-variant</v-icon>
        </template>
        
        <v-list-item-title class="calculation-text">
          {{ calculation }}
        </v-list-item-title>
        
        <template #append>
          <v-chip
            size="small"
            color="primary"
            variant="outlined"
          >
            {{ calculatorStore.history.length - index }}
          </v-chip>
        </template>
      </v-list-item>
    </v-list>
    
    <v-alert
      v-else
      type="info"
      variant="outlined"
      class="mt-3"
    >
      Brak historii obliczeń
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { useCalculatorStore } from '../stores/calculator'

const calculatorStore = useCalculatorStore()
</script>

<style scoped>
.history-list {
  max-height: 500px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin-bottom: 10px;
}

.history-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
}

.history-item:last-child {
  border-bottom: none;
}

.calculation-text {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: white;
  font-size: 0.95rem;
  line-height: 1.4;
}

/* Stylizacja scrollbara */
.history-list::-webkit-scrollbar {
  width: 6px;
}

.history-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.history-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.history-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

@media (max-width: 960px) {
  .history-list {
    max-height: 350px;
  }
}
</style>