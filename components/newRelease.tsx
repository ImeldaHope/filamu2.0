"use client";

import React from "react";
import { useNewReleases, useNewReleasesTv } from "@/hooks";
import MediaCard from "./mediaCard";
import ShelfHeader from "./shelfHeader";
import style from "../app/custom.module.css";
import { ImageLoader, ShelfFallback } from "./loaders";

const NewRelease = ({ type }: { type: "movie" | "series" }) => {
  const movieReleases = useNewReleases();
  const showsReleases = useNewReleasesTv();
  const { data, isLoading, error } =
    type === "movie" ? movieReleases : showsReleases;

  if (isLoading) {
    return <ImageLoader />;
  }

  const items = data?.results.slice(0, 10) ?? [];

  return (
    <div className="m-8">
      <ShelfHeader channel="CH 02" title="Just Returned" type={type} accent="amber" />
      {error ? (
        <ShelfFallback variant="error" message="The return bin wouldn't open. Try again shortly." />
      ) : items.length === 0 ? (
        <ShelfFallback message="No returns on the shelf yet — everything's still checked out." />
      ) : (
        <div className={`flex gap-5 overflow-x-scroll ${style.scrollbar_hide}`}>
          {items.map((media) => (
            <div key={media.id} className="relative shrink-0">
              {type === "movie" ? (
                <MediaCard poster_path={media.poster_path} movie_id={media.id} />
              ) : (
                <MediaCard poster_path={media.poster_path} series_id={media.id} />
              )}
              <p className="sticker absolute right-1 top-1 z-10 rounded-sm bg-amber px-1.5 py-1 text-sm text-crt-800">
                {Math.round(media.vote_average)}★
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewRelease;
