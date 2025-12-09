import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getGame, getDLC } from "../api/rawg";
import { GameContext } from "../context/GameContext";

export default function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [dlc, setDLC] = useState([]);
    const [loading, setLoading] = useState(true);

    const { state, dispatch } = useContext(GameContext);

    useEffect(() => {
        async function load() {
            try {
                const gameData = await getGame(id);
                const dlcData = await getDLC(id);

                setGame(gameData);
                setDLC(dlcData.results || []);
            } catch (err) {
                console.error(err);
                setGame(null);
            }
            setLoading(false);
        }
        load();
    }, [id]);

    if (loading) return <Loader />;
    if (!game) return <ErrorMessage message="Nie znaleziono gry" />;

    const isFav = state.favorites.some(f => f.id === game.id);

    const toggleFav = () => {
        if (isFav) {
            dispatch({ type: "REMOVE_FAVORITE", payload: game.id });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: game });
        }
    };

    return (
        <>
            <div
                className="details-background"
                style={{ backgroundImage: `url(${game.background_image})` }}
            />

            <div className="details-container">

                <h1>{game.name}</h1>

                <div className="details-hero">
                    <img src={game.background_image} alt={game.name} />
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10
                }}>
                    <div className="metacritic-badge">
                        <img
                            src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/metacritic-v4mt6kt4i7dvc1ouf1yu5.png/metacritic-ftfgubcsl0406bwla6utd4u.png?_a=DATAg1AAZAA0"
                            className="metacritic-icon"
                        />
                        {game.metacritic ?? "Brak"}
                    </div>

                    <button
                        onClick={toggleFav}
                        style={{
                            padding: "12px 18px",
                            background: isFav ? "#333" : "#3a7afe",
                            border: "none",
                            borderRadius: 10,
                            cursor: "pointer",
                            color: "#fff"
                        }}
                    >
                        {isFav ? "★ Usuń z ulubionych" : "☆ Dodaj do ulubionych"}
                    </button>
                </div>

                <div className="info-block">
                    <p><strong>Gatunki:</strong> {game.genres?.map(g => g.name).join(", ")}</p>
                    <p><strong>Platformy:</strong> {game.platforms?.map(p => p.platform?.name).join(", ")}</p>
                    <p><strong>Data premiery:</strong> {game.released}</p>
                    <p><strong>Opis:</strong><br /> {game.description_raw}</p>

                    <h2>DLC</h2>
                    {dlc.length ? (
                        <ul>{dlc.map(d => <li key={d.id}>{d.name}</li>)}</ul>
                    ) : (
                        <p>Brak dodatków.</p>
                    )}
                </div>

            </div>
        </>
    );
}
