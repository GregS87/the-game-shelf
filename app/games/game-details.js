"use client";

import { useEffect, useState } from "react";
import { getGameDetails } from "../_utils/rawg-service";

export default function GameDetails({ game }) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!game) {
      setDetails(null);
      setError("");
      return;
    }

    const loadDetails = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getGameDetails(game.rawgId || game.id);
        setDetails(data);
      } catch (err) {
        console.error("Error loading details", err);
        setError("Could not load game details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDetails();
  }, [game]);

  return (
    <section className="bg-slate-900 text-slate-100 rounded-xl p-4 shadow-lg h-full">
      <h2 className="text-lg font-semibold mb-3">Game Details</h2>

      {!game && (
        <p className="text-sm text-slate-300">
          Select a game from your shelf or from search results to view details.
        </p>
      )}

      {game && isLoading && (
        <p className="text-sm text-slate-300">Loading details…</p>
      )}

      {game && !isLoading && error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {game && !isLoading && !error && details && (
        <div className="space-y-2">
          <p className="text-lg font-bold">{details.name}</p>
          <p className="text-xs text-slate-300">
            Released: {details.released || "Unknown"} • Rating:{" "}
            {details.rating ? `${details.rating} / 5` : "N/A"}
          </p>
          {details.website && (
            <a
              href={details.website}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2 text-xs px-3 py-1 rounded-md border border-orange-500 hover:bg-orange-500 hover:text-slate-900"
            >
              Official site
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