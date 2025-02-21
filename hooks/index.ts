import { SeriesProps, MovieResponse, SeriesResponse, GenresResponse, GenreProps, MovieProps, CastCrewResponse, DetailedMovieResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useNewReleases = () => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["new_releases"],
    queryFn:async () => {
      const response = await fetch("/api?endpoint=movie/now_playing");
      return response.json();
    },    
  });
};

export const useNewReleasesTv = () => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["new_releases_tv"],
    queryFn: async () => {      
      const response = await fetch("/api?endpoint=tv/on_the_air");
      return response.json();
    },
  });
};

export const usePopularMovies = () => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["popular_movies"],
    queryFn: async () => {      
      const response = await fetch( "/api?endpoint=trending/movie/week");
      return response.json();
    },
  });
};

export const usePopularSeries = () => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["popular_series"],
    queryFn: async () => {      
      const response = await fetch( "/api?endpoint=trending/tv/week");
      return response.json();
    },
  });
};

export const useMovieGenre = () => {
  return useQuery<GenresResponse, Error>({
    queryKey: ["movie_genres"],
    queryFn: async () => {      
      const response = await fetch( "/api?endpoint=genre/movie/list");
      return response.json();
    },
  });
}

export const useMovieGenreDetails = (id: number) => {   
  return useQuery<MovieResponse, Error>({
    queryKey: ["movie_posters", id],
    queryFn: async () => {      
      const response = await fetch( `/api?endpoint=discover/movie?with_genres=${id}`);
      return response.json();
    },
  });
};

export const useUpcomingMovies = () => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["upcoming_movies"],
    queryFn: async () => {      
      const response = await fetch( `/api?endpoint=discover/movie?primary_release_date.gte=2025-01-01&primary_release_date.lte=2030-12-31&with_original_language=en&sort_by=release_date.asc`);
      return response.json();
    },
  });
}

export const useUpcomingSeries = () => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["upcoming_series"],
    queryFn: async () => {      
      const response = await fetch(        
        `/api?endpoint=discover/tv?primary_release_date.gte=2025-01-01&primary_release_date.lte=2030-12-31&with_original_language=en&sort_by=first_air_date.desc`,
      );      
      return response.json();
    },    
  });
};

export const useSeriesGenre = () => {
  return useQuery<GenresResponse, Error>({
    queryKey: ["series_genres"],
    queryFn: async () => {      
      const response = await fetch( "/api?endpoint=genre/tv/list");
      return response.json();
    },    
  });
};

export const useSeriesGenreDetails = (id: number) => {
  return useQuery<SeriesResponse, Error>({
    queryKey: ["series_posters", id],
    queryFn: async () => {      
      const response = await fetch( `/api?endpoint=discover/movie?with_genres=${id}`);
      return response.json();
    },    
  });
};

export const useMovieDetails =  (id:number) => {
  return useQuery<DetailedMovieResponse, Error>({
    queryKey: ["movie_details", id],
    queryFn: async () => {      
      const response = await fetch( `/api?endpoint=movie/${id}`);
      return response.json();
    },    
  })
};

export const useMovieCastCrew = (id:number) => {
  return useQuery<CastCrewResponse, Error>({
    queryKey: ["cast_crew", id],
    queryFn: async () => {      
      const response = await fetch( `/api?endpoint=movie/${id}/credits`);
      return response.json();
    },
  });
};

export const useSeriesDetails = async (series: SeriesProps) => {
  return series;
};