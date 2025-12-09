import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim().length < 2) return;
        onSearch(query);
        setQuery("");
    };

    return (
        <form onSubmit={handleSubmit} className="search-container">
            <input
                type="text"
                placeholder="Szukaj gry..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
            />
            <button type="submit">Szukaj</button>
        </form>
    );
}
