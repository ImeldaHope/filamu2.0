"use client";

import React from "react";
import MovieCard from "./movieCard";
import { useUpcomingSeries } from "@/hooks";

const UpcomingSeries = () => {
  const { data, isLoading, error } = useUpcomingSeries();
  const sortedMovies = data?.results.sort((a, b) => {
    const dateA = new Date(a.first_air_date as string);
    const dateB = new Date(b.first_air_date as string);
    return dateA.getTime() - dateB.getTime();
  });
  const filteredMovies = sortedMovies?.filter((movie) => {
    const movieReleaseDate = new Date(movie.first_air_date as string);
    return movie.poster_path && movieReleaseDate >= new Date();
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
      <h1 className="mb-2 text-xl font-black lg:text-2xl">Coming soon <span className="text-md font-light">in TV Shows</span></h1>
      <div className="flex">
        {filteredMovies?.slice(0, 10).map((show) => (
          <div
            key={show.id}
            className="relative flex flex-col items-center p-2"
          >
            {/* <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-red-800 to-transparent"></div> */}

            <MovieCard poster_path={show.poster_path} />
            <span className="text-md absolute bottom-5 cursor-pointer rounded-md bg-black/50 p-1 font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {date(show.first_air_date)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSeries;
