"use client"
import React from "react";
import MovieDetail from "@/components/movieDetail";
import { useParams } from "next/navigation";

const Movie = () => {
    const params = useParams();
    const movieId = params.movieId ? Number(params.movieId) : null;

    console.log(movieId);
  return (
    <div>
      <MovieDetail movieId={movieId as number} />
    </div>
  );
};

export default Movie;
