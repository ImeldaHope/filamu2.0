"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PlayIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { usePopularMovies } from "@/hooks";
import { MovieProps } from "@/types";
import { HeroSkeleton } from "./loaders";

export const SliderImage = ({
  media,
  onSelect,
}: {
  media: MovieProps[];
  onSelect: (index: number) => void;
}) => {
  return (
    <div className="hidden md:absolute bottom-6 right-6 md:flex gap-3">
      {media.map((movie, index) => (
        <div
          key={movie.id}
          className="relative h-60 w-40 cursor-pointer"
          onClick={() => onSelect(index)}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={movie?.title}
            layout="fill"
            objectFit="cover"           
            className="rounded-lg border-2 border-transparent transition hover:border-white"
          />
        </div>
      ))}
    </div>
  );
};

export const HeroCard = ({ movie }: {movie: MovieProps}) => {
  return (
    <div className="relative flex h-full w-full flex-col justify-center px-6">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={movie?.title}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 brightness-50"
        objectPosition="center"
        loading="eager"
        priority
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
      />
      <div className="relative z-10 max-w-2xl ">
        <h1 className="text-4xl font-bold">{movie?.title}</h1>
        <p className="mt-4 text-lg line-clamp-3">{movie?.overview}</p>
        <h2 className="mt-2 text-xl font-semibold">
          {" "}
          {Math.floor(movie?.vote_average)}⭐
        </h2>
        <h3 className="text-md">{movie?.release_date}</h3>
        <div className="mt-6 flex gap-4">
          <button className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-white hover:bg-secondary">
            Play <PlayIcon />
          </button>
          <button className="flex items-center gap-2 rounded-md border-2 border-primary px-6 py-3 text-primary hover:border-white hover:bg-secondary hover:text-white">
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
const Hero = () => {
  const { data, isLoading, error } = usePopularMovies();
  const movies = data?.results.slice(0, 5) || [];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [movies.length]);
  
  if (isLoading) return <HeroSkeleton />;
  if (error) return <div>Error loading movies.</div>;
  return (
    <div className="">
      <div className="relative h-[600px] w-full overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={movies[index]?.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center text-white"
          >
            <HeroCard movie={movies[index]} />
          </motion.div>
        </AnimatePresence>
        <SliderImage media={movies} onSelect={setIndex} />
      </div>
    </div>
  );
};

export default Hero;


