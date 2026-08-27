"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PlayIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { usePopularMovies } from "@/hooks";
import { MovieProps } from "@/types";
import { HeroSkeleton, ShelfFallback } from "./loaders";

/* Tape spines for the other titles queued up — click to load the deck. */
export const SliderImage = ({
  media,
  activeIndex,
  onSelect,
}: {
  media: MovieProps[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) => {
  return (
    <div className="absolute bottom-6 right-6 z-20 hidden gap-3 md:flex">
      {media.map((movie, index) => (
        <button
          key={movie.id}
          className={`group relative h-40 w-28 overflow-hidden rounded-sm border-2 transition ${
            index === activeIndex
              ? "border-phosphor shadow-[0_0_16px_rgba(47,230,196,0.5)]"
              : "border-crt-600 hover:border-magenta"
          }`}
          onClick={() => onSelect(index)}
          aria-label={`Play ${movie?.title}`}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt={movie?.title}
            fill
            sizes="112px"
            className="object-cover transition group-hover:animate-tracking"
          />
        </button>
      ))}
    </div>
  );
};

export const HeroCard = ({ movie }: { movie: MovieProps }) => {
  return (
    <div className="relative flex h-full w-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={movie?.title}
        fill
        className="absolute inset-0 z-0 object-cover object-center brightness-[0.35] saturate-[0.85]"
        loading="eager"
        priority
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
      />
      {/* Deep teal wash so the CRT feels lit from within */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-crt via-crt/60 to-transparent" />

      <div className="relative z-10 max-w-2xl">
        <div className="mb-3 flex items-center gap-3 font-crt text-lg text-phosphor text-glow">
          <span>▶ NOW PLAYING</span>
          <span className="text-muted">·</span>
          <span className="text-amber">SP · 4:3</span>
        </div>
        <h1 className="font-display text-4xl leading-[0.95] text-cream md:text-6xl">
          {movie?.title}
        </h1>
        <p className="mt-4 max-w-xl font-crt text-xl leading-tight text-phosphor/90">
          {movie?.release_date?.slice(0, 4)} &nbsp;·&nbsp;{" "}
          {movie?.vote_average ? movie.vote_average.toFixed(1) : "—"} ★ &nbsp;·&nbsp;
          RENTED {movie?.popularity ? Math.round(movie.popularity) : 0}×
        </p>
        <p className="mt-4 line-clamp-3 max-w-xl text-base text-cream/80">
          {movie?.overview}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button className="sticker inline-flex items-center gap-2 rounded-sm bg-phosphor px-6 py-3 font-display text-sm uppercase text-crt-800 transition-transform hover:-translate-y-0.5">
            Play <PlayIcon className="h-4 w-4" />
          </button>
          <button className="sticker inline-flex items-center gap-2 rounded-sm bg-transparent px-5 py-3 font-crt text-lg uppercase text-magenta transition-transform hover:-translate-y-0.5">
            <PlusIcon className="h-4 w-4" /> Watchlist
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
    if (!movies.length) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);

  if (isLoading) return <HeroSkeleton />;
  if (error)
    return (
      <div className="p-4 md:p-6">
        <ShelfFallback
          variant="error"
          tall
          message="Couldn't load the popular tapes. Check the connection and rewind."
        />
      </div>
    );
  if (!movies.length)
    return (
      <div className="p-4 md:p-6">
        <ShelfFallback
          tall
          message="No featured tapes tonight — the marquee is dark. Browse the shelves below."
        />
      </div>
    );

  return (
    <div className="p-4 md:p-6">
      <div className="scanlines grain relative h-[600px] w-full overflow-hidden rounded-md border-2 border-crt-600 bg-crt-800">
        {/* Top OSD strip */}
        <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-3 font-crt text-lg">
          <span className="flex items-center gap-2 text-magenta">
            <span className="rec-dot h-2.5 w-2.5 rounded-full bg-magenta shadow-[0_0_8px_#FF4FA3]" />
            REC
          </span>
          <span className="text-phosphor text-glow">
            CH {String(index + 1).padStart(2, "0")} / {String(movies.length).padStart(2, "0")}
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={movies[index]?.id}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <HeroCard movie={movies[index]} />
          </motion.div>
        </AnimatePresence>

        <SliderImage media={movies} activeIndex={index} onSelect={setIndex} />

        {/* Tape progress / tracking bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-crt-600">
          <div key={index} className="h-full animate-runningTime bg-phosphor shadow-[0_0_10px_#2FE6C4]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
