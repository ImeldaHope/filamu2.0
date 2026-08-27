import { motion } from "motion/react";

const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-sm bg-crt-700 ${className}`} />
);

const ShelfHeaderSkeleton = () => (
  <div className="mb-4">
    <Bar className="mb-2 h-5 w-40" />
    <Bar className="h-7 w-64" />
  </div>
);

const SkeletonLoader = () => {
  return (
    <div className="m-8">
      <ShelfHeaderSkeleton />
      <div className="flex gap-16 overflow-hidden pl-14">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="relative m-3 flex items-center p-2">
            <span className="channel-number absolute -left-16 top-1/2 -translate-y-1/2 select-none text-11xl leading-none opacity-30">
              {index + 1}
            </span>
            <Bar className="h-64 w-44" />
          </div>
        ))}
      </div>
    </div>
  );
};

const GenreBtnSkeleton = () => {
  return (
    <div className="relative w-40 shrink-0 rounded-sm border-2 border-crt-600 bg-crt-700 p-4 xl:w-48">
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 rounded-sm bg-gradient-to-t from-crt-800 to-transparent" />
      <div className="inline-grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[100px] w-[70px] animate-pulse rounded-sm bg-crt-600"
          />
        ))}
      </div>
    </div>
  );
};

const LoadingGenres = () => {
  return (
    <div className="m-8">
      <ShelfHeaderSkeleton />
      <div className="flex gap-5 overflow-hidden">
        {Array.from({ length: 8 }).map((_, index) => (
          <GenreBtnSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

const ImageLoader = () => {
  return (
    <div className="m-8">
      <ShelfHeaderSkeleton />
      <div className="flex gap-16 overflow-hidden">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="relative m-3 flex items-center p-2">
            <Bar className="h-64 w-44" />
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroSkeleton = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="scanlines relative h-[600px] w-full overflow-hidden rounded-md border-2 border-crt-600 bg-crt-800">
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-crt-700"
        />
        <div className="absolute left-5 top-3 flex items-center gap-2 font-crt text-lg text-magenta">
          <span className="rec-dot h-2.5 w-2.5 rounded-full bg-magenta" />
          REC
        </div>
        <div className="absolute bottom-16 left-6 md:left-12">
          <Bar className="mb-3 h-10 w-72" />
          <Bar className="h-5 w-56" />
        </div>
      </div>
    </div>
  );
};

/* Classic broadcast test-card bars, tinted toward the store's palette. */
const BARS = [
  "#EDE9DE", // cream
  "#FFB020", // amber
  "#2FE6C4", // phosphor
  "#3FB56B", // green
  "#FF4FA3", // magenta
  "#E5484D", // red
  "#4F86FF", // blue
];

/*
 * The "no tape in the deck" screen: color bars + PLEASE STAND BY.
 * variant "empty"  -> shelf has nothing to show (a clean, expected state)
 * variant "error"  -> the fetch failed (something went wrong)
 * tall             -> hero-height version
 */
const ShelfFallback = ({ variant = "empty", message, tall = false }) => {
  const isError = variant === "error";
  return (
    <div
      className={`scanlines grain relative flex w-full flex-col overflow-hidden rounded-md border-2 border-crt-600 bg-crt-800 ${
        tall ? "h-[560px]" : "min-h-56"
      }`}
    >
      <div className="flex h-20 shrink-0 md:h-28">
        {BARS.map((c, i) => (
          <div
            key={i}
            className="h-full flex-1"
            style={{ backgroundColor: c, opacity: 0.82 }}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-8 text-center">
        <span
          className={`flex items-center gap-2 font-crt text-lg ${
            isError ? "text-magenta" : "text-amber"
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isError ? "rec-dot bg-magenta" : "bg-amber"
            }`}
          />
          {isError ? "NO SIGNAL" : "PLEASE STAND BY"}
        </span>
        <h3 className="font-display text-2xl uppercase text-cream">
          {isError ? "Tracking Error" : "Shelf Empty"}
        </h3>
        <p className="max-w-md font-crt text-lg text-muted">
          {message ??
            (isError
              ? "Couldn't reach the tape deck. Give it a moment and rewind."
              : "Nothing on this shelf yet — check back after the next restock.")}
        </p>
      </div>
    </div>
  );
};

export {
  SkeletonLoader,
  LoadingGenres,
  ImageLoader,
  HeroSkeleton,
  ShelfFallback,
};
