"use client";
import React from "react";
import SeriesCard from "./seriesCard";
import { usePopularSeries } from "@/hooks";

const TopSeries = () => {
  const { data, isLoading, error } = usePopularSeries();
  return (
    <div className="p-5">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        Top 10 <span className="text-md font-light">in TV Shows</span> this Week
      </h1>
      <div className="flex gap-7">
        {data?.results.slice(0, 10).map((series, index) => (
          <div key={series.id} className="relative flex items-center p-2">
            <div className="z-10">
              <SeriesCard
                poster_path={series.poster_path}
                series_id={series.id}
              />
            </div>
            <h1 className="absolute -left-10 top-1/2 -translate-y-1/2 text-11xl">
              {index + 1}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSeries;
