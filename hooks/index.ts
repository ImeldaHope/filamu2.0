import { SeriesProps, MovieResponse, SeriesResponse, GenresResponse, GenreProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/utils";

export const useNewReleases = () => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["new_releases"],
    queryFn: () => fetchApi<MovieResponse>("movie/now_playing"),
  });
};

export const useNewReleasesTv = () => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["new_releases_tv"],
    queryFn: () => fetchApi<SeriesResponse>("tv/on_the_air"),
  });
};

export const usePopularMovies = () => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["popular_movies"],
    queryFn: () => fetchApi<MovieResponse>("trending/movie/week"),
  });
};

export const usePopularSeries = () => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["popular_series"],
    queryFn: () => fetchApi<SeriesResponse>("trending/tv/week")
  })
};

export const useMovieGenre = () => {
  return useQuery<GenresResponse, Error>({
    queryKey: ["movie_genres"],
    queryFn: () => fetchApi<GenresResponse>("genre/movie/list"),
  });
}

export const useMovieGenreDetails = (id: number) => {   
  return useQuery<MovieResponse, Error>({
    queryKey: ["movie_posters", id],
    queryFn: () => fetchApi<MovieResponse>(`discover/movie?with_genres=${id}`),
  });
};

export const useUpcomingMovies = () => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["upcoming_movies"],
    queryFn: () =>
      fetchApi<MovieResponse>(
        `discover/movie?primary_release_date.gte=2025-01-01&primary_release_date.lte=2030-12-31&with_original_language=en&sort_by=release_date.asc`
      ),
  });
}

export const useUpcomingSeries = () => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["upcoming_series"],
    queryFn: () =>
      fetchApi<SeriesResponse>(
        `discover/tv?primary_release_date.gte=2025-01-01&primary_release_date.lte=2030-12-31&with_original_language=en&sort_by=first_air_date.desc`,
      ),
  });
};

export const useSeriesGenre = () => {
  return useQuery<GenresResponse, Error>({
    queryKey: ["series_genres"],
    queryFn: () => fetchApi<GenresResponse>("genre/tv/list"),
  });
};

export const useSeriesGenreDetails = (id: number) => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["series_posters", id],
    queryFn: () => fetchApi<SeriesResponse>(`discover/tv?with_genres=${id}`),
  });
};

export const useMovieDetails =  (movie: MovieResponse) => {
  return movie;
};

export const useSeriesDetails = async (series: SeriesProps) => {
  return series;
};