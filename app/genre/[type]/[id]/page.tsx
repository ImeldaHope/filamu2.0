"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ThickArrowLeftIcon } from "@radix-ui/react-icons";
import MediaCard from "@/components/mediaCard";
import ShelfHeader from "@/components/shelfHeader";
import { ImageLoader, ShelfFallback } from "@/components/loaders";
import { useMovieGenreDetails, useSeriesGenreDetails } from "@/hooks";

const GenreAisle = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const type = params.type === "series" ? "series" : "movie";
  const id = params.id ? Number(params.id) : 0;
  const name = searchParams.get("name") ?? "This Aisle";

  const movieGenre = useMovieGenreDetails(id);
  const seriesGenre = useSeriesGenreDetails(id);
  const { data, isLoading, error } =
    type === "movie" ? movieGenre : seriesGenre;

  const items = (data?.results ?? []).filter((m) => m.poster_path);

  return (
    <div className="min-h-[70vh]">
      <section className="px-8 pb-2 pt-8">
        <Link
          href={type === "movie" ? "/movies" : "/series"}
          className="sticker mb-5 inline-flex items-center gap-2 rounded-sm bg-phosphor px-3 py-2 font-display text-xs uppercase text-crt-800 transition-transform hover:-translate-y-0.5"
        >
          <ThickArrowLeftIcon /> Back to aisles
        </Link>
        <p className="font-crt text-lg text-phosphor text-glow">
          ▶ NOW BROWSING · {type === "movie" ? "MOVIES" : "SERIES"} · AISLE
        </p>
        <h1 className="font-display text-4xl uppercase leading-none text-cream md:text-5xl">
          {name}
        </h1>
      </section>

      <div className="m-8">
        <ShelfHeader channel="CH 01" title={`${name} · Full Shelf`} type={type} />
        {isLoading ? (
          <ImageLoader />
        ) : error ? (
          <ShelfFallback
            variant="error"
            message="Couldn't pull this aisle. Try again shortly."
          />
        ) : items.length === 0 ? (
          <ShelfFallback message="Nothing stocked in this aisle yet." />
        ) : (
          <div className="flex flex-wrap gap-2">
            {items.map((media) =>
              type === "movie" ? (
                <MediaCard
                  key={media.id}
                  poster_path={media.poster_path}
                  movie_id={media.id}
                />
              ) : (
                <MediaCard
                  key={media.id}
                  poster_path={media.poster_path}
                  series_id={media.id}
                />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const GenrePage = () => (
  <Suspense
    fallback={
      <p className="m-8 font-crt text-xl text-phosphor">▶ Cueing up the aisle…</p>
    }
  >
    <GenreAisle />
  </Suspense>
);

export default GenrePage;
