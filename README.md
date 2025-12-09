# Game Search App – React + RAWG API

## Opis Projektu

Aplikacja umożliwia wyszukiwanie gier, sortowanie po ocenie, przeglądanie szczegółowych informacji o wybranych tytułach, sprawdzanie DLC oraz dodawanie gier do ulubionych (zapisywanych w LocalStorage). Projekt jest w pełni responsywny i oparty o React + React Router.

## Funkcjonalności

- Wyszukiwanie gier przez RAWG API  
- Sortowanie wyników po ocenie Metacritic i tytule  
- Szczegółowa strona gry (opis, gatunki, platformy, data premiery, DLC, ocena)  
- System ulubionych gier (zapisywany w LocalStorage)  
- Paginacja wyników wyszukiwania  
- Responsywność (mobile-first)  
- Obsługa błędów i stanów ładowania  
- Oddzielne podstrony: Home, Game Details, Favorites, Not Found  
- Nowoczesny ciemny motyw UI  

## Instalacja i uruchomienie
1. Sklonuj repozytorium

2. Wejdź do folderu projektu:
cd game-search-app

3. Zainstaluj zależności:
npm install

4. Dodaj klucz API RAWG:
Stwórz plik .env:

VITE_RAWG_KEY=TWÓJ_KLUCZ_API

Klucz pobierzesz z:
https://rawg.io/apidocs

5. Uruchom projekt:
npm run dev

Aplikacja uruchomi się pod:
http://localhost:5173


```bash
git clone https://github.com/Frytta/GameSearch