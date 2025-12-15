const API_BASE = "https://api.rawg.io/api";
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

  return (data.results || []).map((game) => ({
    id: game.id,
    title: game.name,
    imageUrl: game.background_image,
    released: game.released,
    rating: game.rating,
    platforms:
      game.parent_platforms?.map((p) => p.platform.name) ??
      game.platforms?.map((p) => p.platform.name) ??
      [],
  }));
}

export async function getGameDetails(id) {
  if (!id) return null;

  const url = `${API_BASE}/games/${id}?key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.error("RAWG details error", await response.text());
    throw new Error("Failed to fetch game details");
  }

  const game = await response.json();

  return {
    id: game.id,
    name: game.name,
    description: game.description_raw || "",
    released: game.released,
    rating: game.rating,
    genres: game.genres?.map((g) => g.name) ?? [],
    platforms: game.parent_platforms?.map((p) => p.platform.name) ?? [],
    imageUrl: game.background_image,
    website: game.website || "",
  };
}