import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");

  if (!endpoint) {
    return NextResponse.json(
      { error: "Endpoint is required" },
      { status: 400 },
    );
  }

  const api = new URL(`${TMDB_BASE_URL}/${endpoint}`);
  api.searchParams.set("api_key", TMDB_API_KEY || "");
  api.searchParams.append("language", "en-US");

  // dynamically append all search params to the api url except the endpoint to avoid failing url on
  // upcoming movies & tv shows as the rest of the search params gets misparsed.
  searchParams.forEach((value, key) => {
    if (key !== "endpoint") {
      api.searchParams.append(key, value);
    }
  });
  api.searchParams.append("page", "1");

  const response = await fetch(api.toString());

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
