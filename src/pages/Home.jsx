import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import GameCard from "../components/GameCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { searchGames } from "../api/rawg";

export default function Home() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [heroBg, setHeroBg] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function loadCover() {
            try {
                const data = await searchGames("dark souls: remastered", 1);
                if (!mounted) return;
                setHeroBg(data?.results?.[0]?.background_image || null);
            } catch (e) {
            }
        }
        loadCover();
        return () => (mounted = false);
    }, []);

    useEffect(() => {
        if (query.length > 1) handleSearch(query, page);
    }, [page]);

    const handleSearch = async (q, pg = 1) => {
        setQuery(q);
        setLoading(true);
        setError("");

        try {
            const data = await searchGames(q, pg);
            const queryLower = q.toLowerCase();

            const sorted = [...data.results].sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();

                //EXACT MATCH 
                const exactA = nameA === queryLower;
                const exactB = nameB === queryLower;
                if (exactA && !exactB) return -1;
                if (exactB && !exactA) return 1;

                //STARTS WITH 
                const startsA = nameA.startsWith(queryLower);
                const startsB = nameB.startsWith(queryLower);
                if (startsA && !startsB) return -1;
                if (startsB && !startsA) return 1;

                //ALL WORDS MATCH 
                const words = queryLower.split(" ");
                const scoreA = words.filter(w => nameA.includes(w)).length;
                const scoreB = words.filter(w => nameB.includes(w)).length;
                if (scoreA !== scoreB) return scoreB - scoreA;

                return (b.metacritic || 0) - (a.metacritic || 0);
            });

            setGames(sorted);
        } catch (err) {
            setError("Błąd podczas wyszukiwania.");
        }
        setLoading(false);
    };


    return (
        <div className="page-container">
            <div
                className="home-bg"
                style={{ backgroundImage: heroBg ? `url(${heroBg})` : undefined }}
            />

            <div className="home-hero">
                <div className="hero-inner">
                    <SearchBar onSearch={(q) => { setPage(1); handleSearch(q, 1); }} />
                </div>
            </div>

            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}
            <div className="games-grid">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            {games.length > 0 && (
                <div className="pagination-controls">
                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                        ⬅
                    </button>
                    <span>Strona {page}</span>
                    <button onClick={() => setPage(page + 1)}>
                        ➡
                    </button>
                </div>
            )}
        </div>
    );
}
