import {
  MovieResponse,
  SeriesResponse,
  GenresResponse,
  CastCrewResponse,
  DetailedMovieResponse,
  DetailedSeriesResponse,
  SeasonResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";


const fetchJson = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`/api?endpoint=${endpoint}`);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${endpoint}`);
  }
  return response.json();
};

// First day of next month as YYYY-MM-DD. "Upcoming" means strictly beyond the
// current month, so we anchor discover queries here (built from local date
// parts to avoid a UTC off-by-one).
const firstOfNextMonth = () => {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${d.getFullYear()}-${month}-01`;
};

export const useNewReleases = () => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["new_releases"],
    queryFn: () => fetchJson<MovieResponse>("movie/now_playing"),
  });
};

export const useNewReleasesTv = () => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["new_releases_tv"],
    queryFn: () => fetchJson<SeriesResponse>("tv/on_the_air"),
  });
};

export const usePopularMovies = () => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["popular_movies"],
    queryFn: () => fetchJson<MovieResponse>("trending/movie/week"),
  });
};

export const usePopularSeries = () => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["popular_series"],
    queryFn: () => fetchJson<SeriesResponse>("trending/tv/week"),
  });
};

export const useMovieGenre = () => {
  return useQuery<GenresResponse, Error>({
    queryKey: ["movie_genres"],
    queryFn: () => fetchJson<GenresResponse>("genre/movie/list"),
  });
};

export const useMovieGenreDetails = (id: number) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["movie_posters", id],
    queryFn: () => fetchJson<MovieResponse>(`discover/movie?with_genres=${id}`),
    enabled: !!id,
  });
};

export const useUpcomingMovies = () => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["upcoming_movies"],
    queryFn: () =>
      fetchJson<MovieResponse>(
        `discover/movie?primary_release_date.gte=${firstOfNextMonth()}&with_original_language=en&sort_by=popularity.desc`,
      ),
  });
};

export const useUpcomingSeries = () => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["upcoming_series"],
    queryFn: () =>
      fetchJson<SeriesResponse>(
        `discover/tv?first_air_date.gte=${firstOfNextMonth()}&with_original_language=en&sort_by=popularity.desc`,
      ),
  });
};

export const useSeriesGenre = () => {
  return useQuery<GenresResponse, Error>({
    queryKey: ["series_genres"],
    queryFn: () => fetchJson<GenresResponse>("genre/tv/list"),
  });
};

export const useSeriesGenreDetails = (id: number) => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["series_posters", id],
    queryFn: () => fetchJson<SeriesResponse>(`discover/tv?with_genres=${id}`),
    enabled: !!id,
  });
};

export const useMovieDetails = (id: number) => {
  return useQuery<DetailedMovieResponse, Error>({
    queryKey: ["movie_details", id],
    queryFn: () => fetchJson<DetailedMovieResponse>(`movie/${id}`),
    enabled: !!id,
  });
};

export const useMovieCastCrew = (id: number) => {
  return useQuery<CastCrewResponse, Error>({
    queryKey: ["cast_crew", id],
    queryFn: () => fetchJson<CastCrewResponse>(`movie/${id}/credits`),
    enabled: !!id,
  });
};

export const useSeriesDetails = (id: number) => {
  return useQuery<DetailedSeriesResponse, Error>({
    queryKey: ["series_details", id],
    queryFn: () => fetchJson<DetailedSeriesResponse>(`tv/${id}`),
    enabled: !!id,
  });
};

export const useSeriesCastCrew = (id: number) => {
  return useQuery<CastCrewResponse, Error>({
    queryKey: ["series_cast_crew", id],
    queryFn: () => fetchJson<CastCrewResponse>(`tv/${id}/credits`),
    enabled: !!id,
  });
};

export const useSeasonDetails = (id: number, seasonNumber: number) => {
  return useQuery<SeasonResponse, Error>({
    queryKey: ["season_details", id, seasonNumber],
    queryFn: () =>
      fetchJson<SeasonResponse>(`tv/${id}/season/${seasonNumber}`),
    enabled: !!id && seasonNumber !== undefined && seasonNumber !== null,
  });
};
