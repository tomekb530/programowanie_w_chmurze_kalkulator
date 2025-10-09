<template>
  <v-container fluid class="pa-2">
    <!-- Pierwszy rząd - funkcje zaawansowane -->
    <v-row dense class="mb-2">
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.clear"
          color="red darken-1"
          variant="elevated"
          block
          class="calculator-btn"
        >
          C
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.backspace"
          color="orange darken-1"
          variant="elevated"
          block
          class="calculator-btn"
        >
          ⌫
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.percentage"
          color="blue darken-1"
          variant="elevated"
          block
          class="calculator-btn"
        >
          %
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.performOperation('/')"
          color="purple darken-1"
          variant="elevated"
          block
          class="calculator-btn operator-btn"
        >
          ÷
        </v-btn>
      </v-col>
    </v-row>

    <!-- Drugi rząd -->
    <v-row dense class="mb-2">
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.sqrt"
          color="teal darken-1"
          variant="elevated"
          block
          class="calculator-btn"
        >
          √
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.square"
          color="teal darken-1"
          variant="elevated"
          block
          class="calculator-btn"
        >
          x²
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.negate"
          color="indigo darken-1"
          variant="elevated"
          block
          class="calculator-btn"
        >
          ±
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.performOperation('*')"
          color="purple darken-1"
          variant="elevated"
          block
          class="calculator-btn operator-btn"
        >
          ×
        </v-btn>
      </v-col>
    </v-row>

    <!-- Trzeci rząd - cyfry 7,8,9 -->
    <v-row dense class="mb-2">
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.inputNumber('7')"
          color="blue-grey darken-1"
          variant="elevated"
          block
          class="calculator-btn number-btn"
        >
          7
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.inputNumber('8')"
          color="blue-grey darken-1"
          variant="elevated"
          block
          class="calculator-btn number-btn"
        >
          8
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.inputNumber('9')"
          color="blue-grey darken-1"
          variant="elevated"
          block
          class="calculator-btn number-btn"
        >
          9
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.performOperation('-')"
          color="purple darken-1"
          variant="elevated"
          block
          class="calculator-btn operator-btn"
        >
          −
        </v-btn>
      </v-col>
    </v-row>

    <!-- Czwarty rząd - cyfry 4,5,6 -->
    <v-row dense class="mb-2">
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.inputNumber('4')"
          color="blue-grey darken-1"
          variant="elevated"
          block
          class="calculator-btn number-btn"
        >
          4
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.inputNumber('5')"
          color="blue-grey darken-1"
          variant="elevated"
          block
          class="calculator-btn number-btn"
        >
          5
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.inputNumber('6')"
          color="blue-grey darken-1"
          variant="elevated"
          block
          class="calculator-btn number-btn"
        >
          6
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.performOperation('+')"
          color="purple darken-1"
          variant="elevated"
          block
          class="calculator-btn operator-btn"
        >
          +
        </v-btn>
      </v-col>
    </v-row>

    <!-- Piąty i szósty rząd - cyfry 1,2,3 oraz 0,. z przyciskiem = -->
    <v-row dense>
      <v-col cols="9">
        <!-- Lewy blok z cyframi 1,2,3 oraz 0,. -->
        <v-row dense class="mb-2">
          <v-col cols="4">
            <v-btn
              @click="calculatorStore.inputNumber('1')"
              color="blue-grey darken-1"
              variant="elevated"
              block
              class="calculator-btn number-btn"
            >
              1
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              @click="calculatorStore.inputNumber('2')"
              color="blue-grey darken-1"
              variant="elevated"
              block
              class="calculator-btn number-btn"
            >
              2
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              @click="calculatorStore.inputNumber('3')"
              color="blue-grey darken-1"
              variant="elevated"
              block
              class="calculator-btn number-btn"
            >
              3
            </v-btn>
          </v-col>
        </v-row>
        
        <!-- Rząd z 0 i . -->
        <v-row dense>
          <v-col cols="8">
            <v-btn
              @click="calculatorStore.inputNumber('0')"
              color="blue-grey darken-1"
              variant="elevated"
              block
              class="calculator-btn number-btn"
            >
              0
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              @click="calculatorStore.inputDecimal"
              color="blue-grey darken-1"
              variant="elevated"
              block
              class="calculator-btn"
            >
              .
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      
      <!-- Przycisk = po prawej -->
      <v-col cols="3">
        <v-btn
          @click="calculatorStore.equals"
          color="green darken-1"
          variant="elevated"
          block
          class="calculator-btn equals-btn"
          style="height: 146px;"
        >
          =
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useCalculatorStore } from '../stores/calculator'

const calculatorStore = useCalculatorStore()
</script>

<style scoped>
.calculator-btn {
  height: 70px;
  font-size: 1.4rem;
  font-weight: bold;
  min-width: 80px !important;
}

.number-btn {
  background: linear-gradient(135deg, #74b9ff, #0984e3) !important;
}

.operator-btn {
  background: linear-gradient(135deg, #fd79a8, #e84393) !important;
}

.equals-btn {
  background: linear-gradient(135deg, #00b894, #00a085) !important;
}

.calculator-btn {
  transition: all 0.2s ease;
}

.calculator-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.calculator-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 480px) {
  .calculator-btn {
    height: 50px;
    font-size: 1rem;
  }
}
</style>