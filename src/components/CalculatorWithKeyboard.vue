<template>
  <div @keydown="handleKeydown" tabindex="0" class="keyboard-wrapper">
    <Calculator />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCalculatorStore } from '../stores/calculator'
import Calculator from './Calculator.vue'

const calculatorStore = useCalculatorStore()

const handleKeydown = (event: KeyboardEvent) => {
  event.preventDefault()
  
  const key = event.key
  
  // Cyfry
  if (/^[0-9]$/.test(key)) {
    calculatorStore.inputNumber(key)
  }
  
  // Operacje
  switch (key) {
    case '+':
      calculatorStore.performOperation('+')
      break
    case '-':
      calculatorStore.performOperation('-')
      break
    case '*':
      calculatorStore.performOperation('*')
      break
    case '/':
      calculatorStore.performOperation('/')
      break
    case 'Enter':
    case '=':
      calculatorStore.equals()
      break
    case '.':
    case ',':
      calculatorStore.inputDecimal()
      break
    case 'Escape':
    case 'c':
    case 'C':
      calculatorStore.clear()
      break
    case 'Backspace':
      calculatorStore.backspace()
      break
    case '%':
      calculatorStore.percentage()
      break
    case '^':
      calculatorStore.performOperation('^')
      break
  }
}

onMounted(() => {
  // Fokusuj wrapper żeby można było używać klawiatury
  const wrapper = document.querySelector('.keyboard-wrapper') as HTMLElement
  if (wrapper) {
    wrapper.focus()
  }
})
</script>

<style scoped>
.keyboard-wrapper {
  outline: none;
  width: 100%;
  height: 100%;
}
</style>