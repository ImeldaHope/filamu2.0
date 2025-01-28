export interface GenreProps {
  id: number;
  name: string;
}

export interface GenresResponse{
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