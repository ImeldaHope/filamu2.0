const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const api = new URL(`${TMDB_BASE_URL}/${endpoint}`);
  api.searchParams.set("api_key", TMDB_API_KEY || "");
  api.searchParams.append("language", "en-US");
  api.searchParams.append("page", "1");

  const response = await fetch(api.toString());
  
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`);
  }

  return response.json();
}
