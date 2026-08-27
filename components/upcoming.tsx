"use client";

import React from "react";
import MediaCard from "./mediaCard";
import ShelfHeader from "./shelfHeader";
import { useUpcomingMovies, useUpcomingSeries } from "@/hooks";
import style from "../app/custom.module.css";
import { MovieProps, SeriesProps } from "@/types";
import { ImageLoader, ShelfFallback } from "./loaders";

const Upcoming = ({ type }: { type: "movie" | "series" }) => {
  const upcomingMovies = useUpcomingMovies();
  const upcomingShows = useUpcomingSeries();

  const { data, isLoading, error } =
    type === "movie" ? upcomingMovies : upcomingShows;

  if (isLoading) {
    return <ImageLoader />;
  }

  const sortedMedia = data?.results.sort((a, b) => {
    const dateA = new Date(
      type === "movie"
        ? ((a as MovieProps).release_date as string)
        : ((a as SeriesProps).first_air_date as string),
    );

    const dateB = new Date(
      type === "movie"
        ? ((b as MovieProps).release_date as string)
        : ((b as SeriesProps).first_air_date as string),
    );
    return dateA.getTime() - dateB.getTime();
  });

  const filteredMedia = sortedMedia?.filter((media) => {
    const mediaReleaseDate = new Date(
      type === "movie"
        ? ((media as MovieProps).release_date as string)
        : ((media as SeriesProps).first_air_date as string),
    );

    return (
      media.poster_path &&
      (type === "movie" ? media.popularity > 3 : true) &&
      mediaReleaseDate >= new Date()
    );
  });

  const date = (release_date: string) => {
    return new Date(release_date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const list = filteredMedia?.slice(0, 10) ?? [];

  return (
    <div className="m-8">
      <ShelfHeader channel="CH 04" title="Coming Soon · Reserve" type={type} accent="magenta" />
      {error ? (
        <ShelfFallback variant="error" message="Couldn't pull the release calendar. Try again shortly." />
      ) : list.length === 0 ? (
        <ShelfFallback message="Nothing scheduled yet — the reserve list is clear for now." />
      ) : (
        <div className={`flex gap-5 overflow-x-scroll ${style.scrollbar_hide}`}>
          {list.map((media) => (
            <div key={media.id} className="relative flex shrink-0 flex-col items-center p-2">
              <MediaCard poster_path={media.poster_path} movie_id={media.id} />
              <span className="sticker absolute bottom-4 z-10 rounded-sm bg-crt-800/90 px-2 py-1 text-xs text-magenta">
                {type === "movie"
                  ? date((media as MovieProps).release_date)
                  : date((media as SeriesProps).first_air_date)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Upcoming;
