import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getGame, getDLC, getScreenshots } from "../api/rawg";
import { GameContext } from "../context/GameContext";

export default function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [dlc, setDLC] = useState([]);
    const [loading, setLoading] = useState(true);
    const { state, dispatch } = useContext(GameContext);
    const [screens, setScreens] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(0);
    }, [screens]);

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        async function load() {
            try {
                const [gameRes, dlcRes, shotsRes] = await Promise.allSettled([
                    getGame(id),
                    getDLC(id),
                    getScreenshots(id),
                ]);

                if (!mounted) return;

                if (gameRes.status === "fulfilled") setGame(gameRes.value);
                else {
                    console.error("getGame failed", gameRes.reason);
                    setGame(null);
                }


                if (dlcRes.status === "fulfilled") setDLC(dlcRes.value?.results || []);
                else setDLC([]);

                const thumb = gameRes.status === "fulfilled" ? gameRes.value?.background_image : null;
                const apiShots = shotsRes.status === "fulfilled" ? (shotsRes.value?.results || []) : [];

                const combined = [];
                if (thumb) combined.push({ id: "thumb", image: thumb });

                apiShots.forEach((s) => {
                    if (!s?.image) return;
                    if (thumb && s.image === thumb) return;
                    combined.push(s);
                });

                setScreens(combined);
            } catch (err) {
                console.error(err);
                if (mounted) {
                    setGame(null);
                    setDLC([]);
                    setScreens([]);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, [id]);

    if (loading) return <Loader />;
    if (!game) return <ErrorMessage message="Nie znaleziono gry" />;

    const isFav = !!state?.favorites?.some((f) => f.id === game.id);

    const toggleFav = () => {
        if (isFav) {
            dispatch({ type: "REMOVE_FAVORITE", payload: game.id });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: game });
        }
    };

    const hasScreens = screens && screens.length > 0;
    const showIndexSafe = () => {
        if (!hasScreens) return 0;
        return Math.max(0, Math.min(index, screens.length - 1));
    };

    const prevScreen = () => {
        if (!hasScreens) return;
        setIndex((i) => (i - 1 + screens.length) % screens.length);
    };

    const nextScreen = () => {
        if (!hasScreens) return;
        setIndex((i) => (i + 1) % screens.length);
    };

    return (
        <>
            <div
                className="details-background"
                style={{
                    backgroundImage: game?.background_image
                        ? `url(${game.background_image})`
                        : undefined,
                }}
            />

            <div className="details-container">
                <h1>{game.name}</h1>

                <div className="screenshots-carousel" aria-label="Screenshots carousel">
                    <button
                        className="arrow-btn left"
                        onClick={prevScreen}
                        aria-label="Poprzedni screenshot"
                    >
                        ◀
                    </button>

                    <img
                        className={`screenshot-main ${showIndexSafe() === 0 ? "first" : ""}`}
                        src={hasScreens ? screens[showIndexSafe()]?.image : game.background_image || "/placeholder.png"}
                        alt={game.name || "Game cover"}
                    />

                    <button
                        className="arrow-btn right"
                        onClick={nextScreen}
                        aria-label="Następny screenshot"
                    >
                        ▶
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <div className="metacritic-badge">
                        <img
                            src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/metacritic-v4mt6kt4i7dvc1ouf1yu5.png/metacritic-ftfgubcsl0406bwla6utd4u.png?_a=DATAg1AAZAA0"
                            className="metacritic-icon"
                        />
                        {game.metacritic ?? "Brak"}
                    </div>

                    <button
                        onClick={toggleFav}
                        aria-pressed={isFav}
                        style={{
                            padding: "12px 18px",
                            background: isFav ? "#333" : "#3a7afe",
                            border: "none",
                            borderRadius: 10,
                            cursor: "pointer",
                            color: "#fff",
                        }}
                    >
                        {isFav
                            ? "★ Usuń z ulubionych"
                            : "☆ Dodaj do ulubionych"}
                    </button>
                </div>

                <div className="info-block">
                    <p>
                        <strong>Gatunki:</strong>{" "}
                        {game.genres?.map((g) => g.name).join(", ")}
                    </p>

                    <p>
                        <strong>Platformy:</strong>{" "}
                        {game.platforms
                            ?.map((p) => p.platform?.name)
                            .join(", ")}
                    </p>

                    <p>
                        <strong>Data premiery:</strong> {game.released}
                    </p>

                    <p>
                        <strong>Opis:</strong>
                        <br />
                        {game.description_raw}
                    </p>

                    <h2>DLC</h2>

                    {dlc.length ? (
                        <ul>
                            {dlc.map((d) => (
                                <li key={d.id}>{d.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Brak dodatków.</p>
                    )}
                </div>
            </div>
        </>
    );
}
