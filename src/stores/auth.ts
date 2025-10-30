import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '../services/api'
import type { UserProfile, StatsResponse } from '../services/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProfile | null>(null)
  const userStats = ref<StatsResponse | null>(null)
  const isLoading = ref(false)
  const error = ref<string>('')

  const isAuthenticated = computed(() => !!user.value && apiService.isAuthenticated())

  const login = async (login: string, password: string) => {
    isLoading.value = true
    error.value = ''
    
    try {
      const response = await apiService.login({ login, password })
      
      if (response.success && response.data) {
        user.value = response.data.user
        return true
      } else {
        error.value = response.error || 'Login failed'
        return false
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const register = async (username: string, email: string, password: string, firstName: string, lastName: string) => {
    isLoading.value = true
    error.value = ''
    
    try {
      const response = await apiService.register({ username, email, password, firstName, lastName })
      
      if (response.success && response.data) {
        user.value = response.data.user
        return true
      } else {
        error.value = response.error || 'Registration failed'
        return false
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const loadProfile = async () => {
    if (!apiService.isAuthenticated()) return
    
    isLoading.value = true
    try {
      // Load profile which already contains stats
      const profileResponse = await apiService.getProfile()
      
      if (profileResponse.success && profileResponse.data) {
        // Profile response has nested structure: data.user and data.stats
        const userData: UserProfile = { ...profileResponse.data.user }
        
        // Add operation stats from profile response (which already contains stats)
        if (profileResponse.data.stats?.operationStats) {
          userData.operationStats = profileResponse.data.stats.operationStats
        }
        
        user.value = userData
        userStats.value = profileResponse.data.stats || null
      } else {
        logout()
      }
    } catch (err) {
      console.error('Failed to load profile:', err)
      logout()
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    apiService.logout()
    user.value = null
    userStats.value = null
    error.value = ''
  }

  const clearError = () => {
    error.value = ''
  }

  const initializeAuth = () => {
    // Initialize user on store creation if token exists
    if (apiService.isAuthenticated()) {
      loadProfile()
    }
  }

  // Call initialization
  initializeAuth()

  return {
    user,
    userStats,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    loadProfile,
    logout,
    clearError
  }
})