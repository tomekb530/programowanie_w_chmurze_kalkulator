<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Profil użytkownika</span>
            <v-btn color="error" @click="handleLogout">Wyloguj</v-btn>
          </v-card-title>
          
          <v-card-text v-if="authStore.user">
            <v-row>
              <v-col cols="12" md="6">
                <v-list>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-account</v-icon>
                    </template>
                    <v-list-item-title>Nazwa użytkownika</v-list-item-title>
                    <v-list-item-subtitle>{{ authStore.user.username }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-email</v-icon>
                    </template>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{ authStore.user.email }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-calendar</v-icon>
                    </template>
                    <v-list-item-title>Data utworzenia</v-list-item-title>
                    <v-list-item-subtitle>{{ formatDate(authStore.user.createdAt) }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-login</v-icon>
                    </template>
                    <v-list-item-title>Ostatnie logowanie</v-list-item-title>
                    <v-list-item-subtitle>{{ authStore.user.lastLogin ? formatDate(authStore.user.lastLogin) : 'N/A' }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>mdi-calculator</v-icon>
                    </template>
                    <v-list-item-title>Liczba obliczeń</v-list-item-title>
                    <v-list-item-subtitle>{{ totalOperations }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon>{{ authStore.user.isActive ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
                    </template>
                    <v-list-item-title>Status konta</v-list-item-title>
                    <v-list-item-subtitle>{{ authStore.user.isActive ? 'Aktywne' : 'Nieaktywne' }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-card-title class="d-flex justify-space-between align-center">
                    <span>Statystyki</span>
                    <v-btn size="small" icon @click="refreshProfile">
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </v-card-title>
                  
                  <v-card-text>
                    <v-progress-linear v-if="authStore.isLoading" indeterminate />
                    
                    <div v-else-if="authStore.user?.operationStats">
                      <v-chip class="ma-1" color="primary">
                        Wszystkich: {{ totalOperations }}
                      </v-chip>
                      
                      <div class="mt-3">
                        <h4>Operacje:</h4>
                        <v-chip 
                          v-for="stat in authStore.user.operationStats" 
                          :key="stat._id"
                          class="ma-1"
                          color="secondary"
                        >
                          {{ getOperationName(stat._id) }}: {{ stat.count }}
                        </v-chip>
                      </div>
                    </div>
                    
                    <v-alert v-else-if="authStore.error" type="error">
                      {{ calculatorStore.error }}
                    </v-alert>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Historia obliczeń -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Historia obliczeń</span>
            <v-btn size="small" icon @click="loadHistory">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-card-title>
          
          <v-card-text>
            <v-progress-linear v-if="calculatorStore.isLoading" indeterminate />
            
            <v-list v-else-if="calculatorStore.apiHistory.length > 0" lines="two">
              <v-list-item
                v-for="item in calculatorStore.apiHistory.slice(0, 20)"
                :key="item._id"
              >
                <template v-slot:prepend>
                  <v-icon>{{ getOperationIcon(item.operation) }}</v-icon>
                </template>
                <v-list-item-title>
                  {{ formatCalculation(item) }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ formatDate(item.timestamp) }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            
            <v-alert v-else type="info">
              Brak historii obliczeń
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCalculatorStore } from '../stores/calculator'
import type { HistoryEntry } from '../services/types'

const router = useRouter()
const authStore = useAuthStore()
const calculatorStore = useCalculatorStore()

onMounted(() => {
  refreshProfile()
  loadHistory()
})

const refreshProfile = () => {
  authStore.loadProfile()
}

const totalOperations = computed(() => {
  if (!authStore.user?.operationStats) return 0
  return authStore.user.operationStats.reduce((sum, stat) => sum + stat.count, 0)
})

const loadHistory = () => {
  calculatorStore.loadApiHistory()
}

const handleLogout = () => {
  authStore.logout()
  router.push('/auth')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('pl-PL')
}

const getOperationName = (operation: string) => {
  const names: { [key: string]: string } = {
    'add': 'Dodawanie',
    'addition': 'Dodawanie',
    'subtract': 'Odejmowanie',
    'subtraction': 'Odejmowanie', 
    'multiply': 'Mnożenie',
    'multiplication': 'Mnożenie',
    'divide': 'Dzielenie',
    'division': 'Dzielenie',
    'power': 'Potęgowanie',
    'exponentiation': 'Potęgowanie',
    'sqrt': 'Pierwiastek'
  }
  return names[operation] || operation
}

const getOperationIcon = (operation: string) => {
  const icons: { [key: string]: string } = {
    'add': 'mdi-plus',
    'addition': 'mdi-plus',
    'subtract': 'mdi-minus',
    'subtraction': 'mdi-minus',
    'multiply': 'mdi-close',
    'multiplication': 'mdi-close',
    'divide': 'mdi-division',
    'division': 'mdi-division',
    'power': 'mdi-exponent',
    'exponentiation': 'mdi-exponent',
    'sqrt': 'mdi-square-root'
  }
  return icons[operation] || 'mdi-calculator'
}

const formatCalculation = (item: HistoryEntry) => {
  const symbol = getOperationSymbol(item.operation)
  
  // Handle new operands structure with a and b properties
  if (item.operation === 'sqrt' && item.operands.a !== undefined) {
    return `${symbol}${item.operands.a} = ${item.result}`
  } else {
    return `${item.operands.a} ${symbol} ${item.operands.b} = ${item.result}`
  }
}

const getOperationSymbol = (operation: string) => {
  const symbols: { [key: string]: string } = {
    'add': '+',
    'addition': '+',
    'subtract': '-',
    'subtraction': '-',
    'multiply': '×',
    'multiplication': '×',
    'divide': '÷',
    'division': '÷',
    'power': '^',
    'exponentiation': '^',
    'sqrt': '√'
  }
  return symbols[operation] || operation
}

// Redirect if not authenticated
if (!authStore.isAuthenticated) {
  router.push('/auth')
}
</script>