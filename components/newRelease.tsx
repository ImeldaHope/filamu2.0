"use client";

import React from "react";
import { useNewReleases } from "@/hooks";
import Image from "next/image";

const NewRelease = () => {
  const { data, isLoading, error } = useNewReleases();
  
  if (error) {
    return <div>No poster available</div>;
  }

  return (
    <>
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        New Releases <span className="text-md font-light">in Movies</span>
      </h1>
      <div className="flex gap-5">
        {data?.results.slice(0, 10).map((movie) => (
          <div key={movie.id} className="relative">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={700}
              className="cursor-pointer rounded-md"
            />
            <p className="absolute right-0 top-0 -translate-x-1/4 transform rounded-b-lg bg-accent p-2 text-white lg:p-3">
              {Math.round(movie.vote_average)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewRelease;
