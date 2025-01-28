import React from "react";
import { GenreProps } from "@/types";
import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useSeriesGenreDetails } from "@/hooks";

const GenreBtn = ({ genre }: { genre: GenreProps }) => {
  const { data, isLoading, error } = useSeriesGenreDetails(genre.id);
 
  return (
    <div className="w-40 xl:w-48 relative p-5 rounded-lg bg-[#303030] m-5 ">
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none rounded-lg"></div>
      <div className="inline-grid grid-cols-2 gap-2">
        {data?.results.slice(0, 4).map((movie) => (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            height={100}
            width={70}
            alt=""
            className="rounded-md"
            key={movie.id}
          />
        ))}
      </div>
      <button className="absolute bottom-0 left-0 w-full z-10 flex justify-between items-center pb-2 px-5">
        <h2>{genre.name}</h2>
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default GenreBtn;
