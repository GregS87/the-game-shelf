"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/hooks/useUserAuth";
import { getGames, addGame, removeGame } from "../_utils/firestore-service";
import GameList from "./game-list";
import GameSearch from "./game-search";
import GameDetails from "./game-details";

export default function GamesPage() {
    const{ user, loading, firebaseSignOut } = useUserAuth();
    const router = useRouter();

    const [ games, setGames ] = useState([]);
    const [ loadingGames, setLoadingGames ] = useState(true);
    const [ selectedGameId, setSelectedGameId ] = useState(null);
    const [ selectedGame, setSelectedGame ] = useState(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;

        const loadGames = async () => {
            try {
                const items = await getGames(user.uid);
                setGames(items);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingGames(false);
            }
        };
        loadGames();
    }, [user]);

    const handleAddGame = async (rawGame) => {
        if (!user) return;

        const primaryPlatform = rawGame.platforms && rawGame.platforms.length > 0
            ? rawGame.platforms[0]
            : "Unknown";

        const gameToAdd = {
            title: rawGame.title,
            status: "backlog",
            platform: primaryPlatform,
            rawgId: rawGame.id,
        };

        try {
            const id = await addGame(user.uid, gameToAdd);
            setGames((prev) => [...prev, { ...gameToAdd, id }]);
        } catch (error) {
            console.error("Failed to add game:", error);
        }
    };

    const handleRemoveGame = async (gameId) => {
        if (!user) return;
        try {
            await removeGame(user.uid, gameId);
            setGames((prev) => prev.filter((g) => g.id !== gameId));
            if (selectedGameId === gameId) {
                setSelectedGameId(null);
                setSelectedGame(null);
            }
        } catch (error) {
            console.error("Failed to remove game:", error);
        }
    };

    const handleSelectGame = (gameId) => {
        setSelectedGameId(gameId);
        const game = games.find((g) => g.id === gameId) || null;
        setSelectedGame(game);
    };

    const handleLogOut = async () => {
        await firebaseSignOut();
        router.push("/");
    };

    if (loading || (!user && !loading)) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </main>
        );
    }

    return (
        <main className="">
            <div className="">
                <header className="">
                    <h1 className="">My Game Shelf</h1>
                    <button
                        type="button"
                        onClick={handleLogOut}
                        className="">
                        Sign Out
                    </button>
                </header>

                <div className="">
                    <div className=""> 
                        <GameSearch onAddGame={handleAddGame} />
                        {loadingGames ? (
                            <div className="">
                                <p className="">Loading Collection...</p>
                            </div>
                        ) : (
                            <GameList
                                games={games}
                                selectedGameId={selectedGameId}
                                onSelectGame={handleSelectGame}
                                onRemoveGame={handleRemoveGame}
                            />
                        )}
                    </div>

                            <div className="">
                                <GameDetails game={selectedGame} />
                            </div>
                        </div>
                    </div>
                </main>
            );
        }
