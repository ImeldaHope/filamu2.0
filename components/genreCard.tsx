"use client";
import React from "react";
import GenreBtn from "./genreBtn";
import { useMovieGenre } from "@/hooks";

const GenreCard = () => {
  const { data, isLoading, error } = useMovieGenre();

  return (
    <>
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        Popular Genres <span className="text-md font-light">in Movies</span>
      </h1>
      <div className="flex">
        {data?.genres
          .slice(0, 8)
          .map((genre) => <GenreBtn genre={genre} key={genre.id} />)}
      </div>
    </>
  );
};

export default GenreCard;
