const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Ustawienie folderu ui jako statycznego
app.use(express.static(path.join(__dirname, 'ui')));

// Middleware do obsługi JSON i URL-encoded danych
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Główna trasa - serwuje index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
    console.log(`Otwórz http://localhost:${PORT} w przeglądarce`);
});

module.exports = app;