"use client";

import { useEffect, useState } from "react";
import { getGameDetails } from "../_utils/rawg-service";

export default function GameDetails({ game }) {
    const [ details, setDetails ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");

    useEffect(() => {
        if (!game){
            setDetails(null);
            return;
        }

        const loadDetails = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getGameDetails(game.rawgId);
                setDetails(data);
            } catch (error){
                console.error(error);
                setError("Failed to load game information.");
            }
        };
        loadDetails();
    }, [game]);

    return(
        <section className="bg-slate-900 text-slate-100 rounded-xl p-6 shadow-lg w-full mb-4">
            <h2 className="text-x1 font-bold mb-3">Game Details</h2>

            {!game && (
                <p className="text-sm text-slate-300">Select a game to see details.</p>
            )}

            {game && loading && <p className="text-sm">Loading game details</p>}

            {error && <p className="text-red-400 mb-2">{error}</p>}

            {game && details && (
                <div className="space-y-3">
                    <div className="flex gap-4">
                        {details.imageURL && (
                            <img
                                src={details.imageURL}
                                alt={details.title}
                                className="w-32 h-32 object-cover rounded-md    "
                            />
                        )}
                    </div>

                    <h3 className="text-lg font-semibold">{details.title}</h3>
                    <p className="text-xs text-slate-300">
                        {details.released && <> Released: {details.released} - </>}
                        Rating: {details.rating ?? "N/A"}
                    </p>

                    {details.genres?.length > 0 && (
                        <p className="text-sm text-slate-300">
                            Genres: {details.genres.join(", ")}
                        </p>
                    )}

                    {details.platforms?.length > 0 && (
                        <p className="text-sm text-slate-300">
                            Platforms: {details.platforms.join(", ")}
                        </p>
                    )}

                    {details.website && (
                        <a
                            href={details.website}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-400 underline"
                        >
                            Visit Website
                        </a>
                    )}

                    {details.description && (
                        <p className="text-sm text-slate-200 whitespace-pre-line max-h-64 overflow-y-auto">
                            {details.description}
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}