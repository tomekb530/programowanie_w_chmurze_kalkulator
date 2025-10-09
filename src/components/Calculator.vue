<template>
  <v-container class="calculator-container" fluid>
    <v-row justify="center" no-gutters class="full-height">
      <!-- Główny kalkulator -->
      <v-col cols="12" md="6" lg="5" xl="4" class="calculator-column">
        <v-card class="calculator-card" elevation="10">
          <v-card-title class="text-center">
            <v-icon left>mdi-calculator</v-icon>
            Kalkulator
          </v-card-title>
          
          <!-- Wyświetlacz -->
          <CalculatorDisplay />
          
          <!-- Przyciski -->
          <v-card-text>
            <CalculatorButtons />
          </v-card-text>
        </v-card>
      </v-col>
      
      <!-- Historia po prawej stronie -->
      <v-col 
        v-if="calculatorStore.history.length > 0" 
        cols="12" 
        md="6" 
        lg="4" 
        xl="3" 
        class="history-column"
      >
        <v-card class="history-card" elevation="10">
          <v-card-title class="text-center">
            <v-icon left>mdi-history</v-icon>
            Historia obliczeń
          </v-card-title>
          <v-card-text class="pa-0">
            <CalculatorHistory />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useCalculatorStore } from '../stores/calculator'
import CalculatorDisplay from './CalculatorDisplay.vue'
import CalculatorButtons from './CalculatorButtons.vue'
import CalculatorHistory from './CalculatorHistory.vue'

const calculatorStore = useCalculatorStore()
</script>

<style scoped>
.calculator-container {
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.full-height {
  min-height: calc(100vh - 40px);
  align-items: center;
}

.calculator-column {
  display: flex;
  justify-content: center;
  padding: 0 10px;
}

.history-column {
  display: flex;
  justify-content: center;
  padding: 0 10px;
}

.calculator-card {
  width: 100%;
  max-width: 450px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}

.history-card {
  width: 100%;
  max-width: 400px;
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  height: fit-content;
}

.calculator-card :deep(.v-card-title),
.history-card :deep(.v-card-title) {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px 20px 0 0;
  font-size: 1.3rem;
  text-align: center;
  padding: 15px 20px;
}

@media (max-width: 960px) {
  .calculator-container {
    padding: 15px;
  }
  
  .calculator-column,
  .history-column {
    padding: 0 5px;
    margin-bottom: 20px;
  }
  
  .full-height {
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .calculator-container {
    padding: 10px;
  }
  
  .calculator-card,
  .history-card {
    max-width: 100%;
  }
}
</style>