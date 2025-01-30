"use client";
import React from "react";
import MovieCard from "./movieCard";
import { usePopularMovies } from "@/hooks";

const TopMovies = () => {
  const { data, isLoading, error } = usePopularMovies();

  return (
    <div className="p-5">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        Top 10 <span className="text-md font-light">in Movies</span> this Week
      </h1>
      <div className="flex gap-7">
        {data?.results.slice(0, 10).map((movie, index) => (
          <div key={movie.id} className="relative flex items-center p-2">
            <div className="z-10">
              <MovieCard poster_path={movie.poster_path} movie_id ={movie.id} />
            </div>
            <h1 className="absolute -left-10 top-1/2 -translate-y-1/2 text-11xl">
              {index + 1}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovies;
