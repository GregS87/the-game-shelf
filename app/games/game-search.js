import { useState } from 'react';
import { searchGames } from '../_utils/rawg-service';

export function GameSearch({onAddGame}) {
    const [ query, setQuery ] = useState("");
    const [ results, setResults ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try{
            const games = await searchGames(query);
            setResults(games);
        } catch (error){
            console.error(error);
            setError("Failed to find game.");
        } finally {
            setLoading (false);
        }
    };

    return (
        <section className = "bg-slate-900 text-slate-100 rounded-xl p-6 shadow-lg w-full mb-4">
            <h2 className= "text-xl font-bold mb-3">Search Games</h2>

            <form className="flex gap-2 mb-4" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Find a game here!"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 rounded-md border border-slate-600 bg-slate-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
                <button type="submit" className="bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-2 px-4 rounded-md transition">
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && <p className="text-red-400 mb-2">{error}</p>}

            {results.length > 0 && (
                <ul className="space-y-2">
                    {results.map((game) => (
                        <li
                            key={game.id}
                            className="flex items-center justify-between bg-slate-800 rounded-md px-3 py-2"
                        >
                            <div>
                                <p className="font-semibold">{game.title}</p>
                                <p className="text-sm text-slate-300">
                                    {game.released
                                        ? `Released: ${game.released}`
                                        : "No information available"}
                                    {game.platforms?.length ? (
                                        <> - Platforms: {game.platforms.join(", ")}</>
                                    ) : null}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => onAddGame(game)}
                                className="bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-1 px-3 rounded-md transition"
                            >
                                Add to Shelf
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}