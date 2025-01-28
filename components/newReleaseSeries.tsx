"use client";

import React from "react";
import { useNewReleasesTv } from "@/hooks";
import Image from "next/image";

const NewReleaseSeries = () => {
  const { data, isLoading, error } = useNewReleasesTv();
  
  if (error) {
    return <div>No poster available</div>;
  }

  return (
    <>
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        New Releases <span className="text-md font-light">in TV Shows</span>
      </h1>
      <div className="flex gap-5">
        {data?.results.slice(0, 10).map((show) => (
          <div key={show.id} className="relative">
            <Image
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              width={500}
              height={700}
              className="cursor-pointer rounded-md"
            />
            <p className="absolute right-0 top-0 -translate-x-1/4 transform rounded-b-lg bg-accent p-2 text-white lg:p-3">
              {Math.round(show.vote_average)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewReleaseSeries;
