import type { 
  ApiResponse, 
  RegisterRequest, 
  LoginRequest, 
  AuthResponse, 
  CalculationResponse, 
  HistoryEntry, 
  StatsResponse,
  UserProfile,
  ProfileResponse
} from './types'

class ApiService {
  private baseURL: string
  private token: string | null = null

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://pro-kalkulator-backend-accebafzcudphjdf.canadacentral-01.azurewebsites.net'
    this.token = localStorage.getItem('auth_token')
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>)
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      })

      let data: any
      try {
        data = await response.json()
      } catch {
        data = { message: 'No JSON response' }
      }

      if (!response.ok) {
        return {
          success: false,
          error: data?.message || data?.error || `HTTP ${response.status}`,
          data: data
        }
      }

      const result = {
        success: true,
        data: data?.data || data, // Extract nested data if it exists
        message: data?.message
      }
      console.log('API makeRequest result:', result)
      return result
    } catch (error) {
      console.error('API makeRequest error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      }
    }
  }

  // Authentication methods
  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await this.makeRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    
    if (response.success && response.data?.token) {
      this.token = response.data.token
      localStorage.setItem('auth_token', this.token)
    }
    
    return response
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await this.makeRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    
    if (response.success && response.data?.token) {
      this.token = response.data.token
      localStorage.setItem('auth_token', this.token)
    }
    
    return response
  }

  async getProfile(): Promise<ApiResponse<ProfileResponse>> {
    return this.makeRequest<ProfileResponse>('/api/auth/profile')
  }

  logout(): void {
    this.token = null
    localStorage.removeItem('auth_token')
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  // Calculator methods
  async add(a: number, b: number): Promise<ApiResponse<CalculationResponse>> {
    return this.makeRequest<CalculationResponse>('/api/calculator/add', {
      method: 'POST',
      body: JSON.stringify({ a, b })
    })
  }

  async subtract(a: number, b: number): Promise<ApiResponse<CalculationResponse>> {
    return this.makeRequest<CalculationResponse>('/api/calculator/subtract', {
      method: 'POST',
      body: JSON.stringify({ a, b })
    })
  }

  async multiply(a: number, b: number): Promise<ApiResponse<CalculationResponse>> {
    return this.makeRequest<CalculationResponse>('/api/calculator/multiply', {
      method: 'POST',
      body: JSON.stringify({ a, b })
    })
  }

  async divide(a: number, b: number): Promise<ApiResponse<CalculationResponse>> {
    return this.makeRequest<CalculationResponse>('/api/calculator/divide', {
      method: 'POST',
      body: JSON.stringify({ a, b })
    })
  }

  async power(a: number, b: number): Promise<ApiResponse<CalculationResponse>> {
    return this.makeRequest<CalculationResponse>('/api/calculator/power', {
      method: 'POST',
      body: JSON.stringify({ a, b })
    })
  }

  async sqrt(a: number): Promise<ApiResponse<CalculationResponse>> {
    return this.makeRequest<CalculationResponse>('/api/calculator/sqrt', {
      method: 'POST',
      body: JSON.stringify({ a })
    })
  }

  async getHistory(): Promise<ApiResponse<HistoryEntry[]>> {
    return this.makeRequest<HistoryEntry[]>('/api/calculator/history')
  }

  async getStats(): Promise<ApiResponse<StatsResponse>> {
    return this.makeRequest<StatsResponse>('/api/calculator/stats')
  }
}

export const apiService = new ApiService()
export default apiService