"use client";

import React from "react";
import MediaCard from "./mediaCard";
import { useUpcomingSeries } from "@/hooks";
import style from "../app/custom.module.css";

const UpcomingSeries = () => {
  const { data, isLoading, error } = useUpcomingSeries();
  const sortedSeries = data?.results.sort((a, b) => {
    const dateA = new Date(a.first_air_date as string);
    const dateB = new Date(b.first_air_date as string);
    return dateA.getTime() - dateB.getTime();
  });
  const filteredSeries = sortedSeries?.filter((series) => {
    const seriesReleaseDate = new Date(series.first_air_date as string);
    return series.poster_path && seriesReleaseDate >= new Date();
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
        Coming soon <span className="text-md font-light">in TV Shows</span>
      </h1>
      <div className={`flex gap-5 overflow-x-scroll ${style.scrollbar_hide}`}>
        {filteredSeries?.slice(0, 10).map((show) => (
          <div
            key={show.id}
            className="relative flex flex-col items-center p-2"
          >
            
            <MediaCard poster_path={show.poster_path} series_id={show.id} />
            <span className="text-md absolute bottom-5 cursor-pointer rounded-md bg-black/50 p-1 font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {date(show.first_air_date)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSeries;
