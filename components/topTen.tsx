"use client";
import React from "react";
import MediaCard from "./mediaCard";
import ShelfHeader from "./shelfHeader";
import { usePopularMovies, usePopularSeries } from "@/hooks";
import style from "../app/custom.module.css";
import { SkeletonLoader, ShelfFallback } from "./loaders";

const TopTen = ({ type }: { type: "movie" | "series" }) => {
  const popularMovies = usePopularMovies();
  const popularSeries = usePopularSeries();

  const { data, isLoading, error } =
    type === "movie" ? popularMovies : popularSeries;

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const items = data?.results.slice(0, 10) ?? [];

  return (
    <div className="m-8">
      <ShelfHeader channel="CH 03" title="Most Rented · Top 10" type={type} />
      {error ? (
        <ShelfFallback variant="error" message="The rental chart didn't come back. Try again shortly." />
      ) : items.length === 0 ? (
        <ShelfFallback message="No rentals counted this week — the chart is fresh." />
      ) : (
        <div
          className={`flex gap-16 overflow-x-scroll ${style.scrollbar_hide} overflow-y-hidden pl-14`}
        >
          {items.map((media, index) => (
            <div key={media.id} className="relative m-3 flex shrink-0 items-center p-2">
              <div className="z-10">
                {type === "movie" ? (
                  <MediaCard poster_path={media.poster_path} movie_id={media.id} />
                ) : (
                  <MediaCard poster_path={media.poster_path} series_id={media.id} />
                )}
              </div>
              <span className="channel-number absolute -left-16 top-1/2 -translate-y-1/2 select-none text-11xl leading-none">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopTen;
