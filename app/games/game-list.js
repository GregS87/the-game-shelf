"use client";

import { useState } from "react";
import GameItem from "./game-item";

export default function GameList({
  games,
  selectedGameId,
  onSelectGame,
  onRemoveGame,
}) {
  const [sortBy, setSortBy] = useState("title");

  const sortedGames = [...games].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return a.status.localeCompare(b.status);
  });

  const baseButton =
    "px-3 py-1 rounded-md border text-xs font-medium transition-colors";
  const activeButton = "bg-orange-600 text-white border-orange-600";
  const inactiveButton =
    "bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700";

  return (
    <section className="bg-slate-900 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-lg">Your Games</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSortBy("title")}
            className={`${baseButton} ${
              sortBy === "title" ? activeButton : inactiveButton
            }`}
          >
            Title
          </button>
          <button
            type="button"
            onClick={() => setSortBy("status")}
            className={`${baseButton} ${
              sortBy === "status" ? activeButton : inactiveButton
            }`}
          >
            Status
          </button>
        </div>
      </div>

      {sortedGames.length === 0 ? (
        <p className="text-sm text-slate-300">
          You don&apos;t have any games saved yet.
        </p>
      ) : (
        <ul className="list-none m-0 p-0">
          {sortedGames.map((game) => (
            <GameItem
              key={game.id}
              game={game}
              isSelected={game.id === selectedGameId}
              onClick={() => onSelectGame(game)}
              onRemove={() => onRemoveGame(game.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}