"use client";

import React from "react";
import { useNewReleasesTv } from "@/hooks";
import Image from "next/image";
import style from "../app/custom.module.css";
import SeriesCard from "./seriesCard";

const NewReleaseSeries = () => {
  const { data, isLoading, error } = useNewReleasesTv();
  
  if (error) {
    return <div>No poster available</div>;
  }

  return (
    <div className="m-8">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        New Releases <span className="text-md font-light">in TV Shows</span>
      </h1>
      <div className={`flex gap-5 overflow-x-scroll ${style.scrollbar_hide}`}>
        {data?.results.slice(0, 10).map((show) => (
          <div key={show.id} className="relative">
            <SeriesCard poster_path={show.poster_path} series_id={show.id} />
            <p className="absolute right-0 top-0 -translate-x-1/4 transform rounded-b-lg bg-accent p-2 text-white lg:p-3">
              {Math.round(show.vote_average)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewReleaseSeries;
