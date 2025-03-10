const SkeletonLoader = () => {
  return (
    <div className="m-8">
      <div className="mb-2 h-8 w-48 animate-pulse rounded-md bg-gray-400"></div>
      <div className="flex gap-16 overflow-hidden">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="relative m-3 flex items-center p-2">
            <h1 className="absolute -left-16 top-1/2 -translate-y-1/2 text-11xl font-bold text-gray-600">
              {index + 1}
            </h1>
            <div className="h-64 w-44 animate-pulse rounded-md bg-gray-400"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GenreBtnSkeleton = () => {
  return (
    <div className="relative w-40 rounded-lg bg-[#303030] p-5 xl:w-48">
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 rounded-lg bg-gradient-to-t from-black to-transparent"></div>
      <div className="inline-grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[100px] w-[70px] animate-pulse rounded-md bg-gray-500"
          ></div>
        ))}
      </div>
    </div>
  );
};

const LoadingGenres = () => {
  return (
    <div className="m-8">
      <h1 className="mb-2 text-xl font-black lg:text-2xl">
        <span className="inline-block h-6 w-48 animate-pulse rounded-md bg-gray-400 lg:h-8"></span>
        <span className="ml-2 inline-block h-5 w-24 animate-pulse rounded-md bg-gray-400 lg:h-6"></span>
      </h1>
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
      <div className="mb-2 h-8 w-48 animate-pulse rounded-md bg-gray-400"></div>
      <div className="flex gap-16 overflow-hidden">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="relative m-3 flex items-center p-2">
            <div className="h-64 w-44 animate-pulse rounded-md bg-gray-400"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { motion } from "framer-motion";

const HeroSkeleton = () => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex animate-pulse items-center justify-center bg-secondary"
      >
        {/* <div className="h-80 w-60 rounded-lg bg-gray-700 animate-pulse" /> */}
      </motion.div>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 animate-pulse rounded-full bg-accent"
            />
          ))}
      </div>
    </div>
  );
};

export { SkeletonLoader, LoadingGenres, ImageLoader, HeroSkeleton };
