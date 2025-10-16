<script setup lang="ts">
import CalculatorWithKeyboard from './components/CalculatorWithKeyboard.vue'
import CommitInfo from './components/CommitInfo.vue'
</script>

<template>
  <v-app>
    <v-main>
      <CalculatorWithKeyboard />
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
