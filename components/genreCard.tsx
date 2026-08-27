"use client";
import React from "react";
import GenreBtn from "./genreBtn";
import ShelfHeader from "./shelfHeader";
import { useMovieGenre, useSeriesGenre } from "@/hooks";
import style from "../app/custom.module.css";
import { LoadingGenres, ShelfFallback } from "./loaders";

const GenreCard = ({ type }: { type: "movie" | "series" }) => {
  const movieGenre = useMovieGenre();
  const seriesGenre = useSeriesGenre();

  const { data, isLoading, error } =
    type === "movie" ? movieGenre : seriesGenre;

  if (isLoading) return <LoadingGenres />;

  const genres = data?.genres.slice(0, 8) ?? [];

  return (
    <div className="m-8">
      <ShelfHeader channel="CH 01" title="Browse by Aisle" type={type} />
      {error ? (
        <ShelfFallback variant="error" message="Couldn't load the aisles right now." />
      ) : genres.length === 0 ? (
        <ShelfFallback message="No aisles stocked for this section yet." />
      ) : (
        <div className={`flex gap-5 overflow-x-scroll ${style.scrollbar_hide}`}>
          {genres.map((genre) => (
            <GenreBtn genre={genre} key={genre.id} type={type} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreCard;
