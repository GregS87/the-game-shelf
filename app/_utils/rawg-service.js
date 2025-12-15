// app/_services/rawg-service.js
const API_BASE = process.env.NEXT_PUBLIC_RAWG_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function searchGames(query) {
  if (!query || !query.trim()) return [];

  const url = `${API_BASE}/games?search=${encodeURIComponent(
    query.trim()
  )}&page_size=10&key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.error("RAWG search error", await response.text());
    return [];
  }

  const data = await response.json();

  if (!data.results) return [];

  return data.results.map((game) => ({
    id: game.id,
    title: game.name,
    released: game.released,
    rating: game.rating,
    imageUrl: game.background_image,
    platforms: game.parent_platforms?.map((p) => p.platform.name) ?? [],
  }));
}

export async function getGameDetails(gameId) {
  if (!gameId) return null;

  const url = `${API_BASE}/games/${gameId}?key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.error("RAWG details error", await response.text());
    return null;
  }

  const game = await response.json();

  return {
    id: game.id,
    title: game.name,
    description: game.description_raw || "",
    released: game.released,
    rating: game.rating,
    genres: game.genres?.map((g) => g.name) ?? [],
    platforms: game.parent_platforms?.map((p) => p.platform.name) ?? [],
    imageUrl: game.background_image,
    website: game.website || "",
  };
}