# Kalkulator z Integracją API

Zaawansowany kalkulator Vue.js z integracją z backendem REST API, obsługujący autoryzację użytkowników i synchronizację historii obliczeń w chmurze.

## Funkcjonalności

### ✨ Podstawowe Operacje
- **Dodawanie** (+)
- **Odejmowanie** (-)
- **Mnożenie** (×)
- **Dzielenie** (÷)
- **Potęgowanie** (^)
- **Pierwiastek kwadratowy** (√)
- **Procenty** (%)

### 🔐 Autoryzacja Użytkowników
- **Rejestracja** nowych użytkowników
- **Logowanie** istniejących użytkowników
- **Profil użytkownika** z danymi i statystykami
- **Bezpieczne przechowywanie tokenów** w localStorage

### ☁️ Integracja z API
- **Automatyczne synchronizowanie** obliczeń z backendem gdy użytkownik jest zalogowany
- **Fallback do lokalnych obliczeń** gdy API nie jest dostępne
- **Historia obliczeń** dostępna w chmurze i lokalnie
- **Statystyki użytkownika** z serwera

### 🎛️ Interfejs
- **Responsywny design** - działa na desktop i mobile
- **Obsługa klawiatury** - pełna funkcjonalność bez myszy
- **Historia obliczeń** z zakładkami (lokalne/chmura)
- **Materialne UI** (Vuetify)

## API Endpoints

Aplikacja integruje się z API pod adresem: `https://pro-kalkulator-backend-accebafzcudphjdf.canadacentral-01.azurewebsites.net`

### Autoryzacja
- `POST /api/auth/register` - rejestracja użytkownika (wymaga: username, email, password, firstName, lastName)
- `POST /api/auth/login` - logowanie użytkownika (wymaga: login, password)
- `GET /api/auth/profile` - dane profilu użytkownika

**Przykład odpowiedzi logowania:**
```json
{
    "success": true,
    "message": "Logowanie pomyślne",
    "data": {
        "user": {
            "_id": "6902d8ab7d17b24af41d0eee",
            "username": "Tomekb530",
            "email": "tomekb530@gmail.com",
            "isActive": true,
            "createdAt": "2025-10-30T03:16:59.536Z",
            "updatedAt": "2025-10-30T03:23:50.794Z",
            "lastLogin": "2025-10-30T03:23:50.786Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "expiresIn": "24h"
    }
}
```

### Kalkulator
- `POST /api/calculator/add` - dodawanie
- `POST /api/calculator/subtract` - odejmowanie
- `POST /api/calculator/multiply` - mnożenie
- `POST /api/calculator/divide` - dzielenie
- `POST /api/calculator/power` - potęgowanie
- `POST /api/calculator/sqrt` - pierwiastek kwadratowy
- `GET /api/calculator/history` - historia obliczeń
- `GET /api/calculator/stats` - statystyki użytkownika

## Instalacja i Uruchomienie

### Wymagania
- Node.js 20.19.0 lub wyższy
- npm lub yarn

### Kroki instalacji

1. **Klonowanie repozytorium**
```bash
git clone <url-repozytorium>
cd programowanie_w_chmurze_kalkulator
```

2. **Instalacja zależności**
```bash
npm install
```

3. **Konfiguracja środowiska**
   
   Plik `.env` jest już skonfigurowany z adresem API:
   ```
   VITE_API_BASE_URL=https://pro-kalkulator-backend-accebafzcudphjdf.canadacentral-01.azurewebsites.net
   ```

4. **Uruchomienie serwera deweloperskiego**
```bash
npm run dev
```

5. **Budowanie dla produkcji**
```bash
npm run build
```

## Użytkowanie

### Dla Niezalogowanych Użytkowników
- Wszystkie podstawowe operacje kalkulatora dostępne lokalnie
- Historia obliczeń przechowywana lokalnie w sesji
- Możliwość rejestracji/logowania w każdej chwili

### Dla Zalogowanych Użytkowników
- Wszystkie obliczenia synchronizowane z API
- Historia obliczeń dostępna w chmurze
- Statystyki użytkowania
- Profil użytkownika z danymi

### Skróty Klawiszowe
- **Cyfry 0-9**: wprowadzanie liczb
- **+ - * /**: operacje podstawowe
- **^**: potęgowanie
- **Enter lub =**: wykonanie obliczeń
- **. lub ,**: przecinek dziesiętny
- **Escape lub C**: wyczyszczenie
- **Backspace**: usunięcie ostatniego znaku
- **%**: procenty

## Struktura Projektu

```
src/
├── components/          # Komponenty Vue
│   ├── Calculator.vue
│   ├── CalculatorButtons.vue
│   ├── CalculatorDisplay.vue
│   ├── CalculatorHistory.vue
│   └── CalculatorWithKeyboard.vue
├── views/              # Widoki/strony
│   ├── HomeView.vue
│   ├── AuthView.vue
│   └── ProfileView.vue
├── stores/             # Pinia stores
│   ├── auth.ts
│   └── calculator.ts
├── services/           # Serwisy API
│   ├── api.ts
│   └── types.ts
└── router/             # Vue Router
    └── index.ts
```

## Bezpieczeństwo

- **JWT Token Authentication** - bezpieczne przechowywanie sesji
- **HTTPS** - szyfrowana komunikacja z API
- **Input Validation** - walidacja danych wejściowych
- **Error Handling** - graceful handling błędów API

## Rozwój

### Dodanie Nowych Operacji
1. Dodaj endpoint w `src/services/api.ts`
2. Dodaj typ w `src/services/types.ts`
3. Dodaj logikę w `src/stores/calculator.ts`
4. Dodaj przycisk w `src/components/CalculatorButtons.vue`

### Testowanie
```bash
npm run lint          # ESLint
npm run format        # Prettier
npm run type-check    # TypeScript check
```

## Deployment

Aplikacja jest skonfigurowana do deployment na Azure Static Web Apps z `staticwebapp.config.json`.

## Licencja

MIT License