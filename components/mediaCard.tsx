import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MediaCard = ({ poster_path, movie_id, series_id }: { poster_path: string, movie_id?:number, series_id?:number }) => {
   const router = useRouter();
    const media_id = movie_id || series_id; 
    const type = movie_id ? "movies" : "series";

   const handleClick = () => {
     if (media_id) {
      router.push(`/${type}/${media_id}`);
    } 
   };
  
  return (
    <div className="w-20 h-32 lg:h-60 lg:w-40 m-5" onClick={handleClick}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt="some show"
        fill
        className="rounded-md cursor-pointer"
      />
    </div>
  );
};

export default MediaCard;
