# Struktura Projektu

```
game-search/
├── src/
│   ├── api/
│   │   └── rawg.js              # Integracja z RAWG API
│   ├── components/
│   │   ├── GameCard.jsx         # Komponent karty gry
│   │   ├── SearchBar.jsx        # Pasek wyszukiwania
│   │   ├── Loader.jsx           # Spinner ładowania
│   │   └── ErrorMessage.jsx     # Komunikat błędu
│   ├── context/
│   │   └── GameContext.jsx      # Global state management (ulubione gry)
│   ├── pages/
│   │   ├── Home.jsx             # Strona główna z wyszukiwaniem
│   │   ├── GameDetails.jsx      # Szczegóły gry
│   │   ├── Favorites.jsx        # Lista ulubionych gier
│   │   └── NotFound.jsx         # Strona 404
│   ├── App.jsx                  # Główny komponent aplikacji (routing)
│   ├── main.jsx                 # Punkt wejścia
│   └── Styles.css               # Style globalne
├── public/                       # Zasoby statyczne
├── index.html                    # Template HTML
├── vite.config.js                # Konfiguracja bundlera
├── eslint.config.js              # Reguły lintowania
└── package.json                  # Dependencje i skrypty
```
