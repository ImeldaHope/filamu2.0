import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MovieCard = ({ poster_path, movie_id }: { poster_path: string, movie_id:number }) => {
   const router = useRouter();

   const handleClick = (movie_id: number) => {
     router.push(`/movies/${movie_id}`); 
   };
  
  return (
    <div className="w-20 h-32 lg:h-60 lg:w-40 m-5" onClick={() => handleClick(movie_id)}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt="some show"
        fill
        className="rounded-md cursor-pointer"
      />
    </div>
  );
};

export default MovieCard;
