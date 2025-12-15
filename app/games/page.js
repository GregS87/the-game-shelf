"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";
import { getGames, addGame, removeGame } from "../_utils/game-shelf-service";
import { GameSearch } from "./game-search";
import GameList from "./game-list";
import GameDetails from "./game-details";

export default function GamesPage() {
  const router = useRouter();
  const { user, loading } = useUserAuth();

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;

    async function loadGames() {
      try {
        const userGames = await getGames(user.uid);
        setGames(userGames);
      } catch (err) {
        console.error("Error loading games", err);
        setError("Could not load your game shelf.");
      }
    }

    loadGames();
  }, [user]);

  const handleAddGame = async (rawgGame, status = "backlog") => {
    if (!user) return;

    const newGame = {
      title: rawgGame.title || rawgGame.name,
      platform:
        rawgGame.platforms?.[0]?.platform?.name ||
        rawgGame.parent_platforms?.[0]?.platform?.name ||
        "Unknown",
      status,
      rawgId: rawgGame.id,
    };

    try {
      const id = await addGame(user.uid, newGame);
      setGames((prev) => [...prev, { ...newGame, id }]);
      setError("");
    } catch (err) {
      console.error("Error adding game", err);
      setError("Could not add that game. Try again.");
    }
  };

  const handleRemoveGame = async (gameId) => {
    if (!user) return;

    try {
      await removeGame(user.uid, gameId);
      setGames((prev) => prev.filter((g) => g.id !== gameId));
      if (selectedGame && selectedGame.id === gameId) {
        setSelectedGame(null);
      }
      setError("");
    } catch (err) {
      console.error("Error removing game", err);
      setError("Could not remove that game.");
    }
  };

  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  const filteredGames =
    statusFilter === "all"
      ? games
      : games.filter((g) => g.status === statusFilter);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <p>Checking login…</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">The Game Shelf</h1>
          <p className="text-sm text-slate-300">
            Logged in as {user.displayName || user.email}
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <GameSearch onAddGame={handleAddGame} />

            <div className="flex items-center gap-3 text-sm">
              <span>Filter:</span>
              <FilterButton
                label="All"
                active={statusFilter === "all"}
                onClick={() => setStatusFilter("all")}
              />
              <FilterButton
                label="Backlog"
                active={statusFilter === "backlog"}
                onClick={() => setStatusFilter("backlog")}
              />
              <FilterButton
                label="Finished"
                active={statusFilter === "finished"}
                onClick={() => setStatusFilter("finished")}
              />
            </div>

            <GameList
              games={filteredGames}
              selectedGameId={selectedGame?.id ?? null}
              onSelectGame={handleSelectGame}
              onRemoveGame={handleRemoveGame}
            />

            {error && (
              <p className="text-sm text-red-400 mt-2" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="lg:col-span-1">
            <GameDetails game={selectedGame} />
          </div>
        </section>
      </div>
    </main>
  );
}

function FilterButton({ label, active, onClick }) {
  const base =
    "px-3 py-1 rounded-md border text-sm font-medium transition-colors";
  const activeClasses = "bg-orange-600 text-white border-orange-600";
  const inactiveClasses =
    "bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${active ? activeClasses : inactiveClasses}`}
    >
      {label}
    </button>
  );
}