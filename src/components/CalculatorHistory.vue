<template>
  <v-container class="pa-4">
    <div class="d-flex justify-center mb-3">
      <v-btn
        @click="clearAllHistory"
        color="red"
        size="small"
      >
        🗑️ Wyczyść historię
      </v-btn>
      
      <v-btn
        v-if="authStore.isAuthenticated"
        @click="refreshApiHistory"
        color="primary"
        size="small"
        class="ml-2"
        :loading="calculatorStore.isLoading"
      >
        <v-icon left>mdi-refresh</v-icon>
        Odśwież
      </v-btn>
    </div>

    <!-- Tabs for different history types when authenticated -->
    <v-tabs v-if="authStore.isAuthenticated" v-model="activeTab" grow>
      <v-tab value="local">Lokalne</v-tab>
      <v-tab value="cloud">Chmura</v-tab>
    </v-tabs>
    
    <v-tabs-window v-if="authStore.isAuthenticated" v-model="activeTab">
      <!-- Local history tab -->
      <v-tabs-window-item value="local">
        <v-list v-if="calculatorStore.history.length > 0" class="history-list">
          <v-list-item
            v-for="(calculation, index) in calculatorStore.history.slice().reverse()"
            :key="`local-${index}`"
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
        
        <v-alert v-else type="info" variant="outlined" class="mt-3" color="primary">
          Brak lokalnej historii obliczeń
        </v-alert>
      </v-tabs-window-item>
      
      <!-- Cloud history tab -->
      <v-tabs-window-item value="cloud">
        <v-progress-linear v-if="calculatorStore.isLoading" indeterminate class="mb-3" />
        
        <v-list v-if="calculatorStore.apiHistory.length > 0" class="history-list">
          <v-list-item
            v-for="calculation in calculatorStore.apiHistory.slice(-20).reverse()"
            :key="`api-${calculation._id}`"
            class="history-item"
          >
            <template #prepend>
              <v-icon :color="getOperationColor(calculation.operation)">
                {{ getOperationIcon(calculation.operation) }}
              </v-icon>
            </template>
            
            <v-list-item-title class="calculation-text">
              {{ formatCalculation(calculation) }}
            </v-list-item-title>
            
            <v-list-item-subtitle class="text-caption">
              {{ formatDate(calculation.timestamp) }}
            </v-list-item-subtitle>
            
            <template #append>
              <v-chip
                size="small"
                :color="getOperationColor(calculation.operation)"
                variant="outlined"
              >
                {{ getOperationName(calculation.operation) }}
              </v-chip>
            </template>
          </v-list-item>
        </v-list>
        
        <v-alert v-else-if="!calculatorStore.isLoading" type="info" variant="outlined" class="mt-3">
          Brak historii obliczeń w chmurze
        </v-alert>
        
        <v-alert v-if="calculatorStore.error" type="error" variant="outlined" class="mt-3">
          {{ calculatorStore.error }}
        </v-alert>
      </v-tabs-window-item>
    </v-tabs-window>
    
    <!-- Simple history view for non-authenticated users -->
    <div v-else>
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
      
      <v-alert v-else type="info" variant="outlined" class="mt-3">
        Brak historii obliczeń
      </v-alert>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCalculatorStore } from '../stores/calculator'
import { useAuthStore } from '../stores/auth'
import type { HistoryEntry } from '../services/types'

const calculatorStore = useCalculatorStore()
const authStore = useAuthStore()
const activeTab = ref('local')

const clearAllHistory = () => {
  calculatorStore.clearHistory()
}

const refreshApiHistory = () => {
  calculatorStore.loadApiHistory()
}

const formatCalculation = (item: HistoryEntry) => {
  const symbol = getOperationSymbol(item.operation)
  
  // Handle new operands structure with a and b properties
  if (item.operation === 'sqrt' && item.operands.a !== undefined) {
    return `${symbol}${item.operands.a} = ${item.result}`
  } else {
    return `${item.operands.a} ${symbol} ${item.operands.b} = ${item.result}`
  }
}

const getOperationSymbol = (operation: string) => {
  const symbols: { [key: string]: string } = {
    'add': '+',
    'addition': '+',
    'subtract': '-',
    'subtraction': '-',
    'multiply': '×',
    'multiplication': '×',
    'divide': '÷',
    'division': '÷',
    'power': '^',
    'exponentiation': '^',
    'sqrt': '√'
  }
  return symbols[operation] || operation
}

const getOperationIcon = (operation: string) => {
  const icons: { [key: string]: string } = {
    'add': 'mdi-plus',
    'addition': 'mdi-plus',
    'subtract': 'mdi-minus',
    'subtraction': 'mdi-minus',
    'multiply': 'mdi-close',
    'multiplication': 'mdi-close',
    'divide': 'mdi-division',
    'division': 'mdi-division',
    'power': 'mdi-exponent',
    'exponentiation': 'mdi-exponent',
    'sqrt': 'mdi-square-root'
  }
  return icons[operation] || 'mdi-calculator'
}

const getOperationColor = (operation: string) => {
  const colors: { [key: string]: string } = {
    'add': 'green',
    'addition': 'green',
    'subtract': 'red',
    'subtraction': 'red',
    'multiply': 'blue',
    'multiplication': 'blue',
    'divide': 'orange',
    'division': 'orange',
    'power': 'purple',
    'exponentiation': 'purple',
    'sqrt': 'teal'
  }
  return colors[operation] || 'primary'
}

const getOperationName = (operation: string) => {
  const names: { [key: string]: string } = {
    'add': '+',
    'addition': '+',
    'subtract': '-',
    'subtraction': '-',
    'multiply': '×',
    'multiplication': '×',
    'divide': '÷',
    'division': '÷',
    'power': '^',
    'exponentiation': '^',
    'sqrt': '√'
  }
  return names[operation] || operation
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('pl-PL', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
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