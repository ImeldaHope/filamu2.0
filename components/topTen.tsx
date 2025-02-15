"use client";
import React from "react";
import MediaCard from "./mediaCard";
import { usePopularMovies, usePopularSeries } from "@/hooks";
import style from "../app/custom.module.css";

const TopTen = ({ type }: { type: "movie" | "series" }) => {
  const { data, isLoading, error } =
    type === "movie" ? usePopularMovies() : usePopularSeries();

  return (
    <div className="m-8">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        Top 10{" "}
        <span className="text-md font-light">
          in {type === "movie" ? "Movies" : "TV Shows"}
        </span>{" "}
        this Week
      </h1>
      <div className={`flex gap-16 overflow-x-scroll ${style.scrollbar_hide} overflow-y-hidden`}>
        {data?.results.slice(0, 10).map((media, index) => (
          <div key={media.id} className="relative m-3 flex items-center p-2">
            <div className="z-10">
              {type === "movie" ? (
                <MediaCard
                  poster_path={media.poster_path}
                  movie_id={media.id}
                />
              ) : (
                <MediaCard
                  poster_path={media.poster_path}
                  series_id={media.id}
                />
              )}
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

export default TopTen;
