import { createContext, useEffect, useReducer } from "react";

export const GameContext = createContext();

const initialState = {
    favorites: []
};

function reducer(state, action) {
    switch (action.type) {
        case "LOAD_FROM_STORAGE":
            return { ...state, favorites: action.payload };

        case "ADD_FAVORITE":
            const added = [...state.favorites, action.payload];
            localStorage.setItem("favorites", JSON.stringify(added));
            return { ...state, favorites: added };

        case "REMOVE_FAVORITE":
            const removed = state.favorites.filter(g => g.id !== action.payload);
            localStorage.setItem("favorites", JSON.stringify(removed));
            return { ...state, favorites: removed };

        default:
            return state;
    }
}

export function GameProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const saved = localStorage.getItem("favorites");
        if (saved) {
            dispatch({
                type: "LOAD_FROM_STORAGE",
                payload: JSON.parse(saved)
            });
        }
    }, []);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}
