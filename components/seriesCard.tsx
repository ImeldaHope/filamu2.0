import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SeriesCard = ({ poster_path, series_id }: { poster_path: string, series_id:number }) => {
   const router = useRouter();

   const handleClick = (series_id: number) => {
     router.push(`/series/${series_id}`); 
   };
  
  return (
    <div className="" onClick={() => handleClick(series_id)}>
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

export default SeriesCard;
