"use client";

import React from "react";
import MediaCard from "./mediaCard";
import { useUpcomingMovies, useUpcomingSeries } from "@/hooks";
import style from "../app/custom.module.css";
import { MovieProps, SeriesProps } from "@/types";

const Upcoming = ({ type }: { type: "movie" | "series" }) => {
  const { data, isLoading, error } =
    type === "movie" ? useUpcomingMovies() : useUpcomingSeries();

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

  return (
    <div className="m-8">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        Coming soon{" "}
        <span className="text-md font-light">
          in {type === "movie" ? "Movies" : "TV Shows"}
        </span>
      </h1>
      <div className={`flex gap-5 overflow-x-scroll ${style.scrollbar_hide}`}>
        {filteredMedia?.slice(0, 10).map((media) => (
          <div
            key={media.id}
            className="relative flex flex-col items-center p-2"
          >
            {/* <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-red-800 to-transparent"></div> */}
            <MediaCard poster_path={media.poster_path} movie_id={media.id} />
            {type === "movie" ? (
              <span className="text-md absolute bottom-5 cursor-pointer rounded-md bg-black/50 p-1 font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {date((media as MovieProps).release_date)}
              </span>
            ) : (
              <span className="text-md absolute bottom-5 cursor-pointer rounded-md bg-black/50 p-1 font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {date((media as SeriesProps).first_air_date)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
