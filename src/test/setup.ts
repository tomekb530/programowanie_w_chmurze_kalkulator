import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock dla CSS imports
vi.mock('*.css', () => ({}))
vi.mock('*.scss', () => ({}))

// Konfiguracja globalnych wtyczek dla testów - uproszczona bez Vuetify dla testów
config.global.stubs = {
  // Stub Vuetify components używane w testach
  'v-card': true,
  'v-btn': true,
  'v-text-field': true,
  'v-alert': true,
  // Dodaj więcej gdy potrzebne
}

// Mock dla localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
})

// Mock dla fetch
globalThis.fetch = vi.fn()

// Mock dla API service globalnie
vi.mock('@/services/api', () => ({
  default: {
    isAuthenticated: vi.fn(() => false),
    login: vi.fn().mockResolvedValue({ success: false, error: 'Not implemented' }),
    register: vi.fn().mockResolvedValue({ success: false, error: 'Not implemented' }),
    logout: vi.fn(),
    getProfile: vi.fn().mockResolvedValue({ success: false, error: 'Not implemented' }),
    getStats: vi.fn().mockResolvedValue({ success: false, error: 'Not implemented' }),
    add: vi.fn().mockResolvedValue({ success: true, data: { result: 0 } }),
    subtract: vi.fn().mockResolvedValue({ success: true, data: { result: 0 } }),
    multiply: vi.fn().mockResolvedValue({ success: true, data: { result: 0 } }),
    divide: vi.fn().mockResolvedValue({ success: true, data: { result: 0 } }),
    power: vi.fn().mockResolvedValue({ success: true, data: { result: 0 } }),
    sqrt: vi.fn().mockResolvedValue({ success: true, data: { result: 0 } }),
    getHistory: vi.fn().mockResolvedValue({ success: true, data: [] }),
  }
}))