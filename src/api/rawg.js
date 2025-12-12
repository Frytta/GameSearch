const API = import.meta.env.VITE_BACKEND_URL;

export async function searchGames(query, page = 1) {
    const res = await fetch(
        `${API}/search`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query, page: page.toString() }) }
    );

    if (!res.ok) throw new Error("Błąd API");

    const data = await res.json();
    return data;
}

export async function getGame(id) {
    const res = await fetch(`${API}/game/${id}`);

    if (!res.ok) throw new Error("Błąd API");
    return res.json();
}

export async function getDLC(id) {
    const res = await fetch(`${API}/game/${id}/dlc`);

    if (!res.ok) throw new Error("Błąd API");
    return res.json();
}
export async function getScreenshots(id) {
    const res = await fetch(
        `${API}/game/${id}/screenshots`
    );
    return res.json();
}