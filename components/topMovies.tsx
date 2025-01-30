"use client";
import React from "react";
import MovieCard from "./movieCard";
import { usePopularMovies } from "@/hooks";
import style from "../app/custom.module.css";

const TopMovies = () => {
  const { data, isLoading, error } = usePopularMovies();

  return (
    <div className="m-8">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        Top 10 <span className="text-md font-light">in Movies</span> this Week
      </h1>
      <div className={`flex gap-16 overflow-x-scroll ${style.scrollbar_hide}`}>
        {data?.results.slice(0, 10).map((movie, index) => (
          <div key={movie.id} className="relative m-3 flex items-center p-2">
            <div className="z-10">
              <MovieCard poster_path={movie.poster_path} movie_id={movie.id} />
            </div>
            <h1 className="absolute -left-16 top-1/2 -translate-y-1/2 text-11xl">
              {index + 1}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovies;
