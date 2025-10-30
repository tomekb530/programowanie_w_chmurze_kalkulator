import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '../services/api'
import type { HistoryEntry, StatsResponse } from '../services/types'

export const useCalculatorStore = defineStore('calculator', () => {
  const display = ref('0')
  const previousValue = ref(0)
  const operator = ref('')
  const waitingForNewNumber = ref(false)
  const history = ref<string[]>([])
  const apiHistory = ref<HistoryEntry[]>([])
  const stats = ref<StatsResponse | null>(null)
  const currentCalculation = ref('')
  const isLoading = ref(false)
  const error = ref('')

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
    const operatorSymbol = nextOperator === '*' ? '×' : 
                          nextOperator === '/' ? '÷' : 
                          nextOperator === '^' ? '^' : nextOperator
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
      case '^':
        return Math.pow(firstValue, secondValue)
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const equals = async () => {
    const inputValue = parseFloat(display.value)
    
    if (previousValue.value !== 0 && operator.value) {
      let newValue: number
      
      // Use API if authenticated, otherwise local calculation
      if (apiService.isAuthenticated()) {
        try {
          const apiOperation = operator.value === '+' ? 'add' : 
                              operator.value === '-' ? 'subtract' : 
                              operator.value === '*' ? 'multiply' : 
                              operator.value === '/' ? 'divide' : 
                              operator.value === '^' ? 'power' : null
          
          if (apiOperation) {
            newValue = await performApiOperation(apiOperation, previousValue.value, inputValue)
          } else {
            newValue = calculate(previousValue.value, inputValue, operator.value)
          }
        } catch (error) {
          // Fallback to local calculation if API fails
          newValue = calculate(previousValue.value, inputValue, operator.value)
          console.warn('API calculation failed, using local fallback:', error)
        }
      } else {
        newValue = calculate(previousValue.value, inputValue, operator.value)
        
        // Add to local history for non-authenticated users
        const operatorSymbol = operator.value === '*' ? '×' : 
                              operator.value === '/' ? '÷' : 
                              operator.value === '^' ? '^' : operator.value
        history.value.push(`${previousValue.value} ${operatorSymbol} ${inputValue} = ${newValue}`)
        if (history.value.length > 10) {
          history.value.shift()
        }
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
  const sqrt = async () => {
    const value = parseFloat(display.value)
    if (value >= 0) {
      let result: number
      
      // Use API if authenticated, otherwise local calculation
      if (apiService.isAuthenticated()) {
        try {
          const response = await performApiOperation('sqrt', value)
          result = response
        } catch (error) {
          // Fallback to local calculation if API fails
          result = Math.sqrt(value)
          console.warn('API sqrt failed, using local fallback:', error)
        }
      } else {
        result = Math.sqrt(value)
        // Add to local history for non-authenticated users
        history.value.push(`√${value} = ${result}`)
        if (history.value.length > 10) {
          history.value.shift()
        }
      }
      
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

  // API Methods
  const performApiOperation = async (operation: string, a: number, b?: number) => {
    isLoading.value = true
    error.value = ''
    
    try {
      let response
      switch (operation) {
        case 'add':
          response = await apiService.add(a, b!)
          break
        case 'subtract':
          response = await apiService.subtract(a, b!)
          break
        case 'multiply':
          response = await apiService.multiply(a, b!)
          break
        case 'divide':
          response = await apiService.divide(a, b!)
          break
        case 'power':
          response = await apiService.power(a, b!)
          break
        case 'sqrt':
          response = await apiService.sqrt(a)
          break
        default:
          throw new Error('Unknown operation')
      }

      if (response.success && response.data) {
        display.value = String(response.data.result)
        waitingForNewNumber.value = true
        
        // Add to local history for immediate display
        const operationSymbol = getOperationSymbol(operation)
        if (b !== undefined) {
          history.value.push(`${a} ${operationSymbol} ${b} = ${response.data.result}`)
        } else {
          history.value.push(`${operationSymbol}${a} = ${response.data.result}`)
        }
        
        if (history.value.length > 10) {
          history.value.shift()
        }
        
        return response.data.result
      } else {
        error.value = response.error || 'Calculation failed'
        throw new Error(response.error || 'Calculation failed')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Network error'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const getOperationSymbol = (operation: string): string => {
    switch (operation) {
      case 'add': return '+'
      case 'subtract': return '-'
      case 'multiply': return '×'
      case 'divide': return '÷'
      case 'power': return '^'
      case 'sqrt': return '√'
      default: return operation
    }
  }

  const loadApiHistory = async () => {
    if (!apiService.isAuthenticated()) return
    
    isLoading.value = true
    try {
      const response = await apiService.getHistory()
      
      if (response.success && response.data) {
        apiHistory.value = response.data
      } else {
        error.value = response.error || 'Failed to load history'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Network error'
    } finally {
      isLoading.value = false
    }
  }

  const loadStats = async () => {
    // Stats are now loaded as part of profile in auth store
    // This method is kept for compatibility but redirects to auth store
    return
  }

  // Enhanced operations that use API when authenticated
  const performCalculation = async (operation: string) => {
    const a = parseFloat(display.value)
    
    if (operation === 'sqrt') {
      if (apiService.isAuthenticated()) {
        try {
          await performApiOperation('sqrt', a)
        } catch {
          // Fallback to local calculation
          sqrt()
        }
      } else {
        sqrt()
      }
    }
  }

  const performBinaryCalculation = async (operation: string, a: number, b: number) => {
    if (apiService.isAuthenticated()) {
      try {
        return await performApiOperation(operation, a, b)
      } catch {
        // Fallback to local calculation
        return calculate(a, b, operation === 'add' ? '+' : operation === 'subtract' ? '-' : operation === 'multiply' ? '*' : '/')
      }
    } else {
      return calculate(a, b, operation === 'add' ? '+' : operation === 'subtract' ? '-' : operation === 'multiply' ? '*' : '/')
    }
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    display,
    displayValue,
    history,
    apiHistory,
    stats,
    currentCalculation,
    isLoading,
    error,
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
    negate,
    performApiOperation,
    loadApiHistory,
    loadStats,
    performCalculation,
    performBinaryCalculation,
    clearError
  }
})