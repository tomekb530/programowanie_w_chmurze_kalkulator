<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ isLogin ? 'Logowanie' : 'Rejestracja' }}</v-toolbar-title>
          </v-toolbar>
          
          <v-card-text>
            <v-form @submit.prevent="handleSubmit" ref="form">
              <!-- Login form -->
              <template v-if="isLogin">
                <v-text-field
                  v-model="loginField"
                  label="Login"
                  prepend-icon="mdi-account"
                  type="text"
                  :rules="loginRules"
                  required
                />
                
                <v-text-field
                  v-model="password"
                  label="Hasło"
                  prepend-icon="mdi-lock"
                  type="password"
                  :rules="passwordRules"
                  required
                />
              </template>
              
              <!-- Registration form -->
              <template v-else>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="firstName"
                      label="Imię"
                      prepend-icon="mdi-account"
                      type="text"
                      :rules="nameRules"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="lastName"
                      label="Nazwisko"
                      prepend-icon="mdi-account-outline"
                      type="text"
                      :rules="nameRules"
                      required
                    />
                  </v-col>
                </v-row>
                
                <v-text-field
                  v-model="username"
                  label="Nazwa użytkownika"
                  prepend-icon="mdi-account-circle"
                  type="text"
                  :rules="usernameRules"
                  required
                />
                
                <v-text-field
                  v-model="email"
                  label="Email"
                  prepend-icon="mdi-email"
                  type="email"
                  :rules="emailRules"
                  required
                />
                
                <v-text-field
                  v-model="password"
                  label="Hasło"
                  prepend-icon="mdi-lock"
                  type="password"
                  :rules="passwordRules"
                  required
                />
              </template>
              
              <v-alert
                v-if="authStore.error"
                type="error"
                dismissible
                @click:close="authStore.clearError"
                class="mb-4"
              >
                {{ authStore.error }}
              </v-alert>
            </v-form>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              @click="toggleMode"
              :disabled="authStore.isLoading"
            >
              {{ isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się' }}
            </v-btn>
            <v-btn
              color="primary"
              @click="handleSubmit"
              :loading="authStore.isLoading"
              :disabled="!isFormValid"
            >
              {{ isLogin ? 'Zaloguj' : 'Zarejestruj' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const username = ref('')
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const loginField = ref('')
const form = ref()

const usernameRules = [
  (v: string) => !!v || 'Nazwa użytkownika jest wymagana',
  (v: string) => v.length >= 3 || 'Nazwa użytkownika musi mieć co najmniej 3 znaki'
]

const loginRules = [
  (v: string) => !!v || 'Login jest wymagany',
  (v: string) => v.length >= 3 || 'Login musi mieć co najmniej 3 znaki'
]

const emailRules = [
  (v: string) => !!v || 'Email jest wymagany',
  (v: string) => /.+@.+\..+/.test(v) || 'Email musi być prawidłowy'
]

const passwordRules = [
  (v: string) => !!v || 'Hasło jest wymagane',
  (v: string) => v.length >= 6 || 'Hasło musi mieć co najmniej 6 znaków'
]

const nameRules = [
  (v: string) => !!v || 'To pole jest wymagane',
  (v: string) => v.length >= 2 || 'Musi mieć co najmniej 2 znaki'
]

const isFormValid = computed(() => {
  if (isLogin.value) {
    return loginField.value.length >= 3 && password.value.length >= 6
  } else {
    return firstName.value.length >= 2 && 
           lastName.value.length >= 2 &&
           username.value.length >= 3 && 
           email.value.includes('@') && 
           password.value.length >= 6
  }
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  authStore.clearError()
  // Clear form fields when switching modes
  username.value = ''
  email.value = ''
  password.value = ''
  firstName.value = ''
  lastName.value = ''
  loginField.value = ''
}

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  let success = false
  
  if (isLogin.value) {
    success = await authStore.login(loginField.value, password.value)
  } else {
    success = await authStore.register(username.value, email.value, password.value, firstName.value, lastName.value)
  }
  
  if (success) {
    router.push('/')
  }
}

// Redirect if already authenticated
if (authStore.isAuthenticated) {
  router.push('/')
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.v-card {
  border-radius: 15px;
}
</style>