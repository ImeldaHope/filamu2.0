"use client";
import React from "react";
import { GenreProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useMovieGenreDetails, useSeriesGenreDetails } from "@/hooks";

const GenreBtn = ({
  genre,
  type,
}: {
  genre: GenreProps;
  type: "movie" | "series";
}) => {
  const router = useRouter();
  const movieGenre = useMovieGenreDetails(genre.id);
  const seriesGenre = useSeriesGenreDetails(genre.id);

  const { data, error } = type === "movie" ? movieGenre : seriesGenre;

  const openAisle = () =>
    router.push(
      `/genre/${type}/${genre.id}?name=${encodeURIComponent(genre.name)}`,
    );

  if (error)
    return (
      <div className="w-40 shrink-0 border-2 border-magenta/50 bg-crt-700 p-5 font-crt text-sm text-magenta xl:w-48">
        ✗ error
      </div>
    );

  return (
    <button
      type="button"
      onClick={openAisle}
      aria-label={`Browse ${genre.name} ${type === "movie" ? "movies" : "series"}`}
      className="group relative block w-40 shrink-0 overflow-hidden rounded-sm border-2 border-crt-600 bg-crt-700 p-4 text-left transition hover:border-phosphor focus:border-phosphor focus:outline-none xl:w-48"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-crt-800 via-crt-800/70 to-transparent" />
      <div className="inline-grid grid-cols-2 gap-2">
        {data?.results.slice(0, 4).map((media) => (
          <div key={media.id} className="relative h-[100px] w-[70px]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              fill
              sizes="70px"
              alt={"title" in media ? media.title : media.name}
              className="rounded-sm object-cover"
            />
          </div>
        ))}
      </div>
      <span className="absolute bottom-0 left-0 z-10 flex w-full items-center justify-between px-4 pb-3 font-crt text-lg uppercase text-cream transition-colors group-hover:text-phosphor">
        <span>{genre.name}</span>
        <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
};

export default GenreBtn;
