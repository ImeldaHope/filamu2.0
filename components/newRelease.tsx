"use client";

import React from "react";
import { useNewReleases } from "@/hooks";
import Image from "next/image";
import MovieCard from "./movieCard";
import style from "../app/custom.module.css";
const NewRelease = () => {
  const { data, isLoading, error } = useNewReleases();
  
  if (error) {
    return <div>No poster available</div>;
  }

  return (
    <div className="m-8">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        New Releases <span className="text-md font-light">in Movies</span>
      </h1>
      <div className={`flex gap-5 overflow-x-scroll ${style.scrollbar_hide}`}>
        {data?.results.slice(0, 10).map((movie) => (
          <div key={movie.id} className="relative">
            <MovieCard poster_path={movie.poster_path} movie_id={movie.id} />
            <p className="absolute right-0 top-0 -translate-x-1/4 transform rounded-b-lg bg-accent p-2 text-white lg:p-3">
              {Math.round(movie.vote_average)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
