import React from "react";
import { GenreProps } from "@/types";
import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useMovieGenreDetails, useSeriesGenreDetails } from "@/hooks";

const GenreBtn = ({
  genre,
  type,
}: {
  genre: GenreProps;
  type: "movie" | "series";
}) => {
  const { data, isLoading, error } =
    type === "movie"
      ? useMovieGenreDetails(genre.id)
      : useSeriesGenreDetails(genre.id);

  return (
    <div className="relative w-40 rounded-lg bg-[#303030] p-5 xl:w-48">
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 rounded-lg bg-gradient-to-t from-black to-transparent"></div>
      <div className="inline-grid grid-cols-2 gap-2">
        {data?.results.slice(0, 4).map((media) => (
          <div key={media.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              height={100}
              width={70}
              alt=""
              className="rounded-md"
              key={media.id}
            />
          </div>
        ))}
      </div>
      <button className="absolute bottom-0 left-0 z-10 flex w-full items-center justify-between px-5 pb-2">
        <h2>{genre.name}</h2>
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default GenreBtn;
