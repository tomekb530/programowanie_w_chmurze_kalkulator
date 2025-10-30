import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import apiService from '@/services/api'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should initialize with correct default values', () => {
    const store = useAuthStore()
    
    expect(store.user).toBe(null)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe('')
    expect(store.isAuthenticated).toBe(false)
  })

  it('should login successfully', async () => {
    const store = useAuthStore()
    const mockUser = {
      _id: '123',
      username: 'testuser',
      email: 'test@example.com',
      isActive: true,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    }

    const mockResponse = {
      success: true,
      data: {
        user: mockUser,
        token: 'mock-token',
        expiresIn: '3600'
      }
    }

    vi.mocked(apiService.login).mockResolvedValue(mockResponse)
    vi.mocked(apiService.isAuthenticated).mockReturnValue(true)

    const result = await store.login('testuser', 'password')

    expect(result).toBe(true)
    expect(store.user).toEqual(mockUser)
    expect(store.error).toBe('')
  })

  it('should handle login failure', async () => {
    const store = useAuthStore()
    const mockResponse = {
      success: false,
      error: 'Invalid credentials'
    }

    vi.mocked(apiService.login).mockResolvedValue(mockResponse)

    const result = await store.login('testuser', 'wrongpassword')

    expect(result).toBe(false)
    expect(store.user).toBe(null)
    expect(store.error).toBe('Invalid credentials')
  })

  it('should register successfully', async () => {
    const store = useAuthStore()
    const mockUser = {
      _id: '123',
      username: 'newuser',
      email: 'new@example.com',
      isActive: true,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    }

    const mockResponse = {
      success: true,
      data: {
        user: mockUser,
        token: 'mock-token',
        expiresIn: '3600'
      }
    }

    vi.mocked(apiService.register).mockResolvedValue(mockResponse)
    vi.mocked(apiService.isAuthenticated).mockReturnValue(true)

    const result = await store.register('newuser', 'new@example.com', 'password123', 'John', 'Doe')

    expect(result).toBe(true)
    expect(store.user).toEqual(mockUser)
    expect(store.error).toBe('')
  })

  it('should handle registration failure', async () => {
    const store = useAuthStore()
    const mockResponse = {
      success: false,
      error: 'Username already exists'
    }

    vi.mocked(apiService.register).mockResolvedValue(mockResponse)

    const result = await store.register('existinguser', 'existing@example.com', 'password123', 'John', 'Doe')

    expect(result).toBe(false)
    expect(store.user).toBe(null)
    expect(store.error).toBe('Username already exists')
  })

  it('should logout correctly', () => {
    const store = useAuthStore()
    
    // Ustaw jakieś dane użytkownika
    store.user = {
      _id: '123',
      username: 'testuser',
      email: 'test@example.com',
      isActive: true,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    }

    store.logout()

    expect(store.user).toBe(null)
    expect(store.error).toBe('')
    expect(apiService.logout).toHaveBeenCalled()
  })

  it('should load profile successfully', async () => {
    const store = useAuthStore()
    const mockProfile = {
      user: {
        _id: '123',
        username: 'testuser',
        email: 'test@example.com',
        isActive: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z'
      },
      stats: {
        totalCalculations: 5,
        operationStats: [
          { _id: 'addition', count: 3, lastUsed: Date.now() }
        ]
      }
    }

    vi.mocked(apiService.isAuthenticated).mockReturnValue(true)
    vi.mocked(apiService.getProfile).mockResolvedValue({
      success: true,
      data: mockProfile
    })

    await store.loadProfile()

    expect(store.user).toEqual({
      ...mockProfile.user,
      operationStats: mockProfile.stats.operationStats
    })
  })

  it('should clear error', () => {
    const store = useAuthStore()
    
    store.error = 'Some error'
    store.clearError()
    
    expect(store.error).toBe('')
  })
})