import React from "react";
import Image from "next/image";

const MovieCard = ({ poster_path }: { poster_path: string }) => {
  return (
    <div className="">
      <Image
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt="some show"
        width={160}
        height={240}
        className="rounded-md cursor-pointer"
      />
    </div>
  );
};

export default MovieCard;
