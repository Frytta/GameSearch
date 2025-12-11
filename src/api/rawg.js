const API = "https://api.rawg.io/api";

export async function searchGames(query, page = 1) {
    const key = import.meta.env.VITE_RAWG_KEY;

    const res = await fetch(
        `${API}/games?search=${query}&key=${key}&page=${page}&page_size=20`
    );

    if (!res.ok) throw new Error("Błąd API");

    const data = await res.json();
    return data;
}

export async function getGame(id) {
    const key = import.meta.env.VITE_RAWG_KEY;
    const res = await fetch(`${API}/games/${id}?key=${key}`);

    if (!res.ok) throw new Error("Błąd API");
    return res.json();
}

export async function getDLC(id) {
    const key = import.meta.env.VITE_RAWG_KEY;
    const res = await fetch(`${API}/games/${id}/additions?key=${key}`);

    if (!res.ok) throw new Error("Błąd API");
    return res.json();
}
export async function getScreenshots(id) {
    const res = await fetch(
        `https://api.rawg.io/api/games/${id}/screenshots?key=${import.meta.env.VITE_RAWG_KEY}`
    );
    return res.json();
}