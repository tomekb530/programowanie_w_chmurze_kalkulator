<script setup lang="ts">
import CalculatorWithKeyboard from '../components/CalculatorWithKeyboard.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <!-- Welcome message for logged in users -->
    <v-container v-if="authStore.isAuthenticated" class="text-center mb-4">
      <v-alert type="success" variant="outlined">
        <v-icon left>mdi-account-check</v-icon>
        Witaj {{ authStore.user?.username }}! Możesz teraz korzystać z zaawansowanych funkcji kalkulatora.
      </v-alert>
    </v-container>
    
    <!-- Info for guests -->
    <v-container v-else class="text-center mb-4">
      <v-alert type="info" variant="outlined">
        <v-icon left>mdi-information</v-icon>
        Zaloguj się aby mieć dostęp do historii obliczeń i synchronizacji z chmurą.
        <v-btn 
          variant="text" 
          color="primary" 
          @click="$router.push('/auth')"
          class="ml-2"
        >
          Zaloguj się
        </v-btn>
      </v-alert>
    </v-container>
    
    <!-- Calculator -->
    <CalculatorWithKeyboard />
  </div>
</template>
