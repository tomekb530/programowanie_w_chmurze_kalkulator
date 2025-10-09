import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCalculatorStore = defineStore('calculator', () => {
  const display = ref('0')
  const previousValue = ref(0)
  const operator = ref('')
  const waitingForNewNumber = ref(false)
  const history = ref<string[]>([])
  const currentCalculation = ref('')

  const displayValue = computed(() => display.value)

  const inputNumber = (number: string) => {
    if (waitingForNewNumber.value) {
      display.value = number
      waitingForNewNumber.value = false
    } else {
      display.value = display.value === '0' ? number : display.value + number
    }
    
    // Aktualizuj bieżące obliczenie
    if (previousValue.value !== 0 && operator.value) {
      currentCalculation.value = `${previousValue.value} ${operator.value} ${display.value}`
    } else {
      currentCalculation.value = display.value
    }
  }

  const inputDecimal = () => {
    if (waitingForNewNumber.value) {
      display.value = '0.'
      waitingForNewNumber.value = false
    } else if (display.value.indexOf('.') === -1) {
      display.value += '.'
    }
    
    // Aktualizuj bieżące obliczenie
    if (previousValue.value !== 0 && operator.value) {
      currentCalculation.value = `${previousValue.value} ${operator.value} ${display.value}`
    } else {
      currentCalculation.value = display.value
    }
  }

  const clear = () => {
    display.value = '0'
    previousValue.value = 0
    operator.value = ''
    waitingForNewNumber.value = false
    currentCalculation.value = ''
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display.value)

    if (previousValue.value === 0) {
      previousValue.value = inputValue
    } else if (operator.value) {
      const currentValue = previousValue.value || 0
      const newValue = calculate(currentValue, inputValue, operator.value)

      display.value = String(newValue)
      previousValue.value = newValue
    }

    waitingForNewNumber.value = true
    operator.value = nextOperator
    
    // Aktualizuj bieżące obliczenie
    const operatorSymbol = nextOperator === '*' ? '×' : nextOperator === '/' ? '÷' : nextOperator
    currentCalculation.value = `${display.value} ${operatorSymbol}`
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const equals = () => {
    const inputValue = parseFloat(display.value)
    
    if (previousValue.value !== 0 && operator.value) {
      const newValue = calculate(previousValue.value, inputValue, operator.value)
      
      // Dodaj do historii
      const operatorSymbol = operator.value === '*' ? '×' : operator.value === '/' ? '÷' : operator.value
      history.value.push(`${previousValue.value} ${operatorSymbol} ${inputValue} = ${newValue}`)
      if (history.value.length > 10) {
        history.value.shift() // Zachowaj tylko ostatnie 10 operacji
      }
      
      display.value = String(newValue)
      previousValue.value = 0
      operator.value = ''
      waitingForNewNumber.value = true
      currentCalculation.value = ''
    }
  }

  const clearHistory = () => {
    history.value = []
  }

  const backspace = () => {
    if (display.value.length > 1) {
      display.value = display.value.slice(0, -1)
    } else {
      display.value = '0'
    }
    
    // Aktualizuj bieżące obliczenie
    if (previousValue.value !== 0 && operator.value) {
      currentCalculation.value = `${previousValue.value} ${operator.value} ${display.value}`
    } else {
      currentCalculation.value = display.value === '0' ? '' : display.value
    }
  }

  // Operacje zaawansowane
  const sqrt = () => {
    const value = parseFloat(display.value)
    if (value >= 0) {
      const result = Math.sqrt(value)
      history.value.push(`√${value} = ${result}`)
      display.value = String(result)
      waitingForNewNumber.value = true
    }
  }

  const square = () => {
    const value = parseFloat(display.value)
    const result = value * value
    history.value.push(`${value}² = ${result}`)
    display.value = String(result)
    waitingForNewNumber.value = true
  }

  const percentage = () => {
    const value = parseFloat(display.value)
    const result = value / 100
    display.value = String(result)
    waitingForNewNumber.value = true
  }

  const negate = () => {
    if (display.value !== '0') {
      display.value = display.value.startsWith('-') 
        ? display.value.slice(1) 
        : '-' + display.value
    }
  }

  return {
    display,
    displayValue,
    history,
    currentCalculation,
    inputNumber,
    inputDecimal,
    clear,
    performOperation,
    equals,
    clearHistory,
    backspace,
    sqrt,
    square,
    percentage,
    negate
  }
})