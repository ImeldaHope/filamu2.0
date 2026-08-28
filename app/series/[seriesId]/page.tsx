"use client";
import React from "react";
import SeriesDetail from "@/components/seriesDetail";
import { useParams } from "next/navigation";

const Series = () => {
  const params = useParams();
  const seriesId = params.seriesId ? Number(params.seriesId) : null;

  return (
    <div>
      <SeriesDetail seriesId={seriesId as number} />
    </div>
  );
};

export default Series;
