export interface GenreProps {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: GenreProps[];
}

export interface MovieProps {
  id: number;
  title: string;
  backdrop_path: string;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;  
}

export interface MovieResponse {
  results: MovieProps[];
}

export interface SeriesProps {
  id: number;
  name: string;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

export interface SeriesResponse {
  results: SeriesProps[];
}

export interface Cast {
  id: number;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string | null;
  character: string;
}

export interface Crew {
  id: number;
  gender: number;  
  known_for_department: string;
  name: string;
  original_name: string;  
  profile_path: string | null; 
  department: string;
  job: string;
}

export interface CastCrewResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface DetailedMovieResponse {
  adult: boolean;
  backdrop_path: string | null;  
  budget: number;
  genres: GenreProps[];
  homepage: string;
  id: number; 
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
}