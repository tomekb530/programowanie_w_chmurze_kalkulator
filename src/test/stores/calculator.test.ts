import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCalculatorStore } from '@/stores/calculator'

describe('Calculator Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with correct default values', () => {
    const store = useCalculatorStore()
    
    expect(store.display).toBe('0')
    expect(store.history).toEqual([])
    expect(store.apiHistory).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe('')
  })

  it('should input number correctly', () => {
    const store = useCalculatorStore()
    
    store.inputNumber('5')
    expect(store.display).toBe('5')
    
    store.inputNumber('3')
    expect(store.display).toBe('53')
  })

  it('should handle decimal input', () => {
    const store = useCalculatorStore()
    
    store.inputDecimal()
    expect(store.display).toBe('0.')
    
    store.inputNumber('5')
    expect(store.display).toBe('0.5')
  })

  it('should prevent multiple decimals', () => {
    const store = useCalculatorStore()
    
    store.inputDecimal()
    store.inputDecimal() // Drugi decimal powinien być ignorowany
    expect(store.display).toBe('0.')
  })

  it('should clear calculator state', () => {
    const store = useCalculatorStore()
    
    store.inputNumber('123')
    store.clear()
    
    expect(store.display).toBe('0')
  })



  it('should perform percentage calculation', () => {
    const store = useCalculatorStore()
    
    store.inputNumber('50')
    store.percentage()
    
    expect(store.display).toBe('0.5')
  })

  it('should handle backspace', () => {
    const store = useCalculatorStore()
    
    store.inputNumber('123')
    store.backspace()
    
    expect(store.display).toBe('12')
    
    // Test backspace na pojedynczej cyfrze
    store.clear()
    store.inputNumber('5')
    store.backspace()
    
    expect(store.display).toBe('0')
  })

  it('should clear history', () => {
    const store = useCalculatorStore()
    
    // Dodaj coś do historii
    store.history.push('2 + 2 = 4')
    expect(store.history).toHaveLength(1)
    
    store.clearHistory()
    expect(store.history).toHaveLength(0)
  })

  it('should handle negate operation', () => {
    const store = useCalculatorStore()
    
    store.inputNumber('5')
    store.negate()
    
    expect(store.display).toBe('-5')
    
    // Test negacji ujemnej liczby
    store.negate()
    expect(store.display).toBe('5')
  })


})