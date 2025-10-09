<template>
  <v-card-text>
    <div class="display-container">
      <!-- Bieżące obliczenie -->
      <div class="current-calculation" v-if="calculatorStore.currentCalculation">
        {{ calculatorStore.currentCalculation }}
      </div>
      
      <!-- Główny wyświetlacz -->
      <v-text-field
        :model-value="formatDisplay(calculatorStore.displayValue)"
        readonly
        variant="outlined"
        class="display-field"
        hide-details
        single-line
        reverse
      />
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import { useCalculatorStore } from '../stores/calculator'

const calculatorStore = useCalculatorStore()

const formatDisplay = (value: string): string => {
  // Formatuj duże liczby z separatorami tysięcy
  const num = parseFloat(value)
  if (!isNaN(num) && Math.abs(num) >= 1000) {
    return num.toLocaleString('pl-PL')
  }
  return value
}
</script>

<style scoped>
.display-container {
  padding: 10px 0;
}

.current-calculation {
  text-align: right;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 5px 15px;
  margin-bottom: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-family: 'Courier New', monospace;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.display-field {
  font-size: 2rem;
  font-weight: bold;
  text-align: right;
}

.display-field :deep(.v-field__input) {
  text-align: right;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  padding: 20px;
  min-height: 80px;
}

.display-field :deep(.v-field) {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.display-field :deep(.v-field--focused) {
  border-color: rgba(255, 255, 255, 0.6);
}
</style>