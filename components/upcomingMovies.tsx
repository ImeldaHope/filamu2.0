"use client";

import React from "react";
import MovieCard from "./movieCard";
import { useUpcomingMovies } from "@/hooks";

const UpcomingMovies = () => {
  const { data, isLoading, error } = useUpcomingMovies();
  const sortedMovies = data?.results.sort((a, b) => {
    const dateA = new Date(a.release_date as string);
    const dateB = new Date(b.release_date as string);
    return dateA.getTime() - dateB.getTime();
  });
  const filteredMovies = sortedMovies?.filter((movie) => {
    const movieReleaseDate = new Date(movie.release_date as string);
    return (
      movie.poster_path && movie.popularity > 3 && movieReleaseDate >= new Date()
    );
  });

  const date = (release_date: string) => {
    return new Date(release_date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        Coming soon  <span className="text-md font-light">in Movies</span>
      </h1>
      <div className="flex">
        {filteredMovies?.slice(0, 10).map((movie) => (
          <div
            key={movie.id}
            className="relative flex flex-col items-center p-2"
          >
            {/* <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-red-800 to-transparent"></div> */}

            <MovieCard poster_path={movie.poster_path} />
            <span className="text-md absolute bottom-5 cursor-pointer rounded-md bg-black/50 p-1 font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {date(movie.release_date)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
