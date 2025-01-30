import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SeriesCard = ({ poster_path, series_id }: { poster_path: string, series_id:number }) => {
   const router = useRouter();

   const handleClick = (series_id: number) => {
     router.push(`/series/${series_id}`); 
   };
  
  return (
    <div
      className="m-5 h-32 w-20 lg:h-60 lg:w-40"
      onClick={() => handleClick(series_id)}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt="some show"
        fill
        className="cursor-pointer rounded-md"
      />
    </div>
  );
};

export default SeriesCard;
