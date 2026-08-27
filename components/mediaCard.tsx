import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImageLoader } from "./loaders";

const MediaCard = ({
  poster_path,
  movie_id,
  series_id,
}: {
  poster_path: string;
  movie_id?: number;
  series_id?: number;
}) => {
  const router = useRouter();
  const media_id = movie_id || series_id;
  const type = movie_id ? "movies" : "series";

  const handleClick = () => {
    if (media_id) {
      router.push(`/${type}/${media_id}`);
    }
  };

  if (!poster_path) return <ImageLoader />;

  return (
    <button
      onClick={handleClick}
      aria-label="Open title"
      className="group relative m-3 block h-32 w-20 overflow-hidden rounded-sm border-2 border-crt-600 bg-crt-700 transition duration-200 hover:border-phosphor hover:shadow-[0_0_18px_rgba(47,230,196,0.35)] lg:h-60 lg:w-40"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt="Poster"
        fill
        sizes="(min-width:1024px) 160px, 80px"
        className="cursor-pointer object-cover transition group-hover:animate-tracking"
      />
      {/* Sprocket sheen sweeping past on hover */}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-gradient-to-t from-magenta/25 via-transparent to-transparent" />
    </button>
  );
};

export default MediaCard;
