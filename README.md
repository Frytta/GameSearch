# Game Search App – React + RAWG API

## Opis Projektu

Aplikacja umożliwia wyszukiwanie gier oraz przeglądanie szczegółowych informacji o wybranych tytułach, sprawdzanie DLC oraz dodawanie gier do ulubionych. Projekt jest oparty o React + React Router.

## Funkcjonalności

- Wyszukiwanie gier przez RAWG API  
- Sortowanie wyników po ocenie Metacritic i tytule  
- Szczegółowa strona gry (opis, gatunki, platformy, data premiery, DLC, ocena)  
- System ulubionych gier (zapisywany w LocalStorage)  
- Paginacja wyników wyszukiwania  
- Responsywność (mobile-first)  
- Obsługa błędów i stanów ładowania  
- Oddzielne podstrony: Home, Game Details, Favorites, Not Found  
- Ciemny motyw UI  

## Instalacja i uruchomienie
<b>1. Sklonuj repozytorium<b/>

```
git clone https://github.com/Frytta/GameSearch
```
2. Wejdź do folderu projektu:
```
cd GameSearch
```
3. Zainstaluj zależności (Bun):
```
bun install
```
4. Dodaj klucz API RAWG:

Stwórz plik .env:
```
VITE_RAWG_KEY=TWÓJ_KLUCZ_API
```
Klucz wygeneruj z:
https://rawg.io/apidocs

5. Uruchom projekt:
```
bun dev
```
Aplikacja uruchomi się pod:
http://localhost:5173

<img width="1920" height="917" alt="sc1" src="https://github.com/user-attachments/assets/1b4618a6-240c-45ba-b49f-4f39da1b4cca" />
<img width="1920" height="912" alt="sc2" src="https://github.com/user-attachments/assets/1144f98e-a6b1-4769-a432-35c5a8338203" />
<img width="1920" height="914" alt="sc3" src="https://github.com/user-attachments/assets/21828c7a-780c-4f86-812a-961f4fa602eb" />
<img width="1920" height="918" alt="sc4" src="https://github.com/user-attachments/assets/2876e698-2c37-4e40-b513-ee0fcc69d2a6" />



