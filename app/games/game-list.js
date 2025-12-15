"use client";

import { useState } from "react";
import GameItem from "./game-item";

export default function GameList({
    games,
    selectGameId,
    onSelectGame,
    onRemoveGame,
}) {

    const [ sortBy, setSortBy ] = useState("title");

    const sortedGames = [...games].sort((a,b) => {
        if (sortBy === "title") {
            return a.title.localeCompare(b.title);
        }
        return a.platform.localeCompare(b.platform);
    });

    const baseButton = "px-3 py-1 rounded-md border text-sm font-medium transition mr-2";
    const activeButton = "bg-slate-700 text-slate-100 border-slate-700";
    const inactiveButton = "bg-transparent text-slate-400 border-slate-400";

    return (
        <section className="bg-slate-900 text-slate-100 rounded-xl p-6 shadow-lg w-full">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-sm mr-1">Sort by: </span>
                <button
                    type="button"
                    onClick={() => setSortBy("title")}
                    className={`${baseButton} ${sortBy === "title" ? activeButton : inactiveButton}`}
                >
                    Title
                </button>

                <button
                    type="button"
                    onClick={() => setSortBy("platform")}
                    className={`${baseButton} ${sortBy === "platform" ? activeButton : inactiveButton                        
                    }`}
                    >
                    Platform
                    </button>
            </div>

            {sortedGames.length === 0 ? (
                <p className="text-sm text-slate-300">No games in your shelf. Start adding some! :D</p>
            ) : (
                <ul>
                    {sortedGames.map((game) => (
                        <GameItem
                            key={game.id}
                            game={game}
                            isSelected={game.id === selectGameId}
                            onSelectGame={() => onSelectGame(game.id)}
                            onRemoveGame={() => onRemoveGame(game.id)}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}