// Types for API responses and requests
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
  expiresIn: string;
}

export interface CalculationRequest {
  a: number;
  b?: number;
}

export interface CalculationResponse {
  result: number;
  operation: string;
  operands: number[];
  timestamp: string;
}

export interface HistoryEntry {
  _id: string;
  userId: string;
  operation: string;
  operands: {
    a: number;
    b: number;
  };
  result: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    userAgent: string;
    ipAddress: string;
  };
}

export interface OperationStat {
  _id: string;
  count: number;
  lastUsed: number;
}

export interface StatsResponse {
  totalCalculations: number;
  operationStats: OperationStat[];
  firstCalculation?: {
    _id: string;
    timestamp: string;
  };
  lastCalculation?: {
    _id: string;
    timestamp: string;
  };
}

export interface UserProfile {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  calculationsCount?: number;
  operationStats?: OperationStat[];
}

export interface ProfileResponse {
  user: UserProfile;
  stats: StatsResponse;
}