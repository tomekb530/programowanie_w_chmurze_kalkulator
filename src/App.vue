<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import CommitInfo from './components/CommitInfo.vue'

const authStore = useAuthStore()
</script>

<template>
  <v-app>
    <!-- Navigation bar -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>
        <router-link to="/" class="text-decoration-none text-white">
          Kalkulator
        </router-link>
      </v-app-bar-title>
      
      <v-spacer />
      
      <v-btn text @click="$router.push('/about')">
        <v-icon left>mdi-information</v-icon>
        O aplikacji
      </v-btn>
      
      <template v-if="authStore.isAuthenticated">
        <v-btn text @click="$router.push('/profile')">
          <v-icon left>mdi-account</v-icon>
          Profil
        </v-btn>
        <v-btn text @click="authStore.logout(); $router.push('/')">
          <v-icon left>mdi-logout</v-icon>
          Wyloguj
        </v-btn>
      </template>
      
      <template v-else>
        <v-btn text @click="$router.push('/auth')">
          <v-icon left>mdi-login</v-icon>
          Zaloguj
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    
    <CommitInfo />
  </v-app>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: rgba(1,1,1,0.8);
  min-height: 100vh;
}


.v-main {
  background-color: rgba(1,1,1,0.8);
}
</style>
