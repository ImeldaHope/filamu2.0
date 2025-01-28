"use client";
import React from "react";
import GenreBtn from "./sgenreBtn";
import { useSeriesGenre } from "@/hooks";

const GenreCardSeries = () => {
  const { data, isLoading, error } = useSeriesGenre();

  return (
    <>
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        Popular Genres <span className="text-md font-light">in TV Shows</span>
      </h1>
      <div className="flex">
        {data?.genres
          .slice(0, 8)
          .map((genre) => <GenreBtn genre={genre} key={genre.id} />)}
      </div>
    </>
  );
};

export default GenreCardSeries;
