import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import GameCard from "../components/GameCard";

export default function Favorites() {
    const { state } = useContext(GameContext);

    return (
        <div className="favorites-container">
            <h1>Ulubione gry</h1>

            <div className="favorites-grid">
                {state.favorites.length === 0 ? (
                    <p style={{ textAlign: "center" }}>Brak ulubionych gier.</p>
                ) : (
                    state.favorites.map(f => <GameCard key={f.id} game={f} />)
                )}
            </div>
        </div>
    );
}
