"use client";
import React from "react";
import GenreBtn from "./genreBtn";
import { useMovieGenre } from "@/hooks";
import style from "../app/custom.module.css";
const GenreCard = () => {
  const { data, isLoading, error } = useMovieGenre();

  return (
    <div className="m-8">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        Popular Genres <span className="text-md font-light">in Movies</span>
      </h1>
      <div className={`flex gap-5 overflow-x-scroll ${style.scrollbar_hide}`}>
        {data?.genres
          .slice(0, 8)
          .map((genre) => <GenreBtn genre={genre} key={genre.id} />)}
      </div>
    </div>
  );
};

export default GenreCard;
