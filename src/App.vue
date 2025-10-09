<script setup lang="ts">
import CalculatorWithKeyboard from './components/CalculatorWithKeyboard.vue'
</script>

<template>
  <v-app>
    <v-main>
      <CalculatorWithKeyboard />
    </v-main>
  </v-app>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  min-height: 100vh;
}

.v-application {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

.v-main {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

html {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}
</style>
