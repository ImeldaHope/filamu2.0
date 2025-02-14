"use client";
import React from "react";
import MediaCard from "./mediaCard";
import { usePopularSeries } from "@/hooks";
import style from "../app/custom.module.css";

const TopSeries = () => {
  const { data, isLoading, error } = usePopularSeries();
  return (
    <div className="m-8">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        Top 10 <span className="text-md font-light">in TV Shows</span> this Week
      </h1>
      <div className={`flex gap-16 overflow-x-scroll ${style.scrollbar_hide}`}>
        {data?.results.slice(0, 10).map((series, index) => (
          <div key={series.id} className="relative m-3 flex items-center p-2">
            <div className="z-10">
              <MediaCard
                poster_path={series.poster_path}
                series_id={series.id}
              />
            </div>
            <h1 className="absolute -left-16 top-1/2 -translate-y-1/2 text-11xl">
              {index + 1}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSeries;
