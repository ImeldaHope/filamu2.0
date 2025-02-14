"use client";
import React from "react";
import GenreBtn from "./genreBtn";
import { useMovieGenre, useSeriesGenre } from "@/hooks";
import style from "../app/custom.module.css";
const GenreCard = ({ type }: { type: "movie" | "series" }) => {
  const { data, isLoading, error } =
    type === "movie" ? useMovieGenre() : useSeriesGenre();

  return (
    <div className="m-8">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        Popular Genres{" "}
        <span className="text-md font-light">
          in {type === "movie" ? "Movies" : "TV Shows"}
        </span>
      </h1>
      <div className={`flex gap-5 overflow-x-scroll ${style.scrollbar_hide}`}>
        {data?.genres
          .slice(0, 8)
          .map((genre) => (
            <GenreBtn genre={genre} key={genre.id} type={type} />
          ))}
      </div>
    </div>
  );
};

export default GenreCard;
