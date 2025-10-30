<template>
  <v-container class="about-page">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="elevation-12 about-card">
          <v-card-title class="text-center">
            <v-icon left large>mdi-calculator</v-icon>
            Kalkulator Cloud
          </v-card-title>
          
          <v-divider />
          
          <v-card-text>
            <div class="text-center mb-4">
              <v-chip color="primary" variant="outlined" class="ma-1">Vue.js 3</v-chip>
              <v-chip color="secondary" variant="outlined" class="ma-1">TypeScript</v-chip>
              <v-chip color="success" variant="outlined" class="ma-1">Vuetify</v-chip>
              <v-chip color="info" variant="outlined" class="ma-1">Pinia</v-chip>
              <v-chip color="warning" variant="outlined" class="ma-1">REST API</v-chip>
            </div>
            
            <v-list lines="two">
              <v-list-subheader>Funkcjonalności</v-list-subheader>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-calculator-variant</v-icon>
                </template>
                <v-list-item-title>Podstawowe Operacje</v-list-item-title>
                <v-list-item-subtitle>
                  Dodawanie, odejmowanie, mnożenie, dzielenie, potęgowanie, pierwiastek
                </v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="success">mdi-keyboard</v-icon>
                </template>
                <v-list-item-title>Obsługa Klawiatury</v-list-item-title>
                <v-list-item-subtitle>
                  Pełna funkcjonalność dostępna przez klawiaturę
                </v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="info">mdi-account</v-icon>
                </template>
                <v-list-item-title>Konta Użytkowników</v-list-item-title>
                <v-list-item-subtitle>
                  Rejestracja, logowanie, profil użytkownika
                </v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="warning">mdi-cloud</v-icon>
                </template>
                <v-list-item-title>Synchronizacja w Chmurze</v-list-item-title>
                <v-list-item-subtitle>
                  Historia obliczeń i statystyki przechowywane w API
                </v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="purple">mdi-history</v-icon>
                </template>
                <v-list-item-title>Historia Obliczeń</v-list-item-title>
                <v-list-item-subtitle>
                  Lokalna i zdalna historia z detailed view
                </v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="teal">mdi-responsive</v-icon>
                </template>
                <v-list-item-title>Responsywny Design</v-list-item-title>
                <v-list-item-subtitle>
                  Optymalizowane dla desktop i urządzeń mobilnych
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            
            <v-divider class="my-4" />
            
            <div class="text-center">
              <h3>Skróty Klawiszowe</h3>
              <v-row class="mt-3">
                <v-col cols="6" sm="4">
                  <v-card variant="outlined" class="pa-2">
                    <strong>0-9</strong><br>
                    <small>Cyfry</small>
                  </v-card>
                </v-col>
                <v-col cols="6" sm="4">
                  <v-card variant="outlined" class="pa-2">
                    <strong>+ - * /</strong><br>
                    <small>Operacje</small>
                  </v-card>
                </v-col>
                <v-col cols="6" sm="4">
                  <v-card variant="outlined" class="pa-2">
                    <strong>^</strong><br>
                    <small>Potęga</small>
                  </v-card>
                </v-col>
                <v-col cols="6" sm="4">
                  <v-card variant="outlined" class="pa-2">
                    <strong>Enter/=</strong><br>
                    <small>Równa się</small>
                  </v-card>
                </v-col>
                <v-col cols="6" sm="4">
                  <v-card variant="outlined" class="pa-2">
                    <strong>. lub ,</strong><br>
                    <small>Przecinek</small>
                  </v-card>
                </v-col>
                <v-col cols="6" sm="4">
                  <v-card variant="outlined" class="pa-2">
                    <strong>Esc/C</strong><br>
                    <small>Wyczyść</small>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            
            <v-divider class="my-4" />
            
            <div class="text-center">
              <p class="text-body-2 text-medium-emphasis">
                Aplikacja wykorzystuje zewnętrzne API do synchronizacji danych.<br>
                Wszystkie obliczenia są dostępne lokalnie nawet bez połączenia z internetem.
              </p>
              
              <div class="mt-3">
                <v-btn 
                  href="https://github.com/tomekb530/programowanie_w_chmurze_kalkulator" 
                  target="_blank"
                  color="primary" 
                  variant="outlined"
                  class="ma-1"
                >
                  <v-icon left>mdi-github</v-icon>
                  GitHub
                </v-btn>
                
                <v-btn 
                  @click="$router.push('/')" 
                  color="success"
                  class="ma-1"
                >
                  <v-icon left>mdi-calculator</v-icon>
                  Użyj Kalkulatora
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.about-card {
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

@media (max-width: 600px) {
  .about-page {
    padding: 10px;
  }
}
</style>
