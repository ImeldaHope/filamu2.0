"use client";

import React from "react";
import { useNewReleases, useNewReleasesTv } from "@/hooks";
import MediaCard from "./mediaCard";
import style from "../app/custom.module.css";
const NewRelease = ({ type }: { type: "movie" | "series" }) => {
  const { data, isLoading, error } = type === "movie" ? useNewReleases() : useNewReleasesTv();

  if (error) {
    return <div>No poster available</div>;
  }

  return (
    <div className="m-8">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        New Releases{" "}
        <span className="text-md font-light">
          in {type === "movie" ? "Movies" : "TV Shows"}
        </span>
      </h1>
      <div className={`flex gap-5 overflow-x-scroll ${style.scrollbar_hide}`}>
        {data?.results.slice(0, 10).map((media) => (
          <div key={media.id} className="relative">
            <MediaCard poster_path={media.poster_path} movie_id={media.id} />
            <p className="absolute right-0 top-0 -translate-x-1/4 transform rounded-b-lg bg-accent p-2 text-white lg:p-3">
              {Math.round(media.vote_average)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
