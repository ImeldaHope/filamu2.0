"use client";
import React from "react";
import Image from "next/image";
import { useMovieCastCrew, useMovieDetails } from "@/hooks";
import { useRouter } from "next/navigation";
import {
  PlayIcon,
  PlusIcon,
  StarIcon,
  StarFilledIcon,
  CalendarIcon,
  CountdownTimerIcon,
  DashboardIcon,
  PilcrowIcon,
  ArrowLeftIcon,
  ThickArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Crew } from "@/types";

export const Rating = ({ rate }: { rate: any }) => {
  let rating = parseFloat(rate);
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }).map((_, index) => {
        if (index < filledStars) {
          return (
            <StarFilledIcon key={index} className="mr-1 text-yellow-400" />
          );
        }
        if (index === filledStars && halfStar) {
          return <StarIcon key={index} className="mr-1 text-yellow-400" />;
        }
        return <StarIcon key={index} className="mr-1 text-gray-400" />;
      })}
      <span className="ml-2">{rating}</span>
    </div>
  );
};



const MovieDetail = ({ movieId }: { movieId: number }) => {
  const { data: movie, isLoading: loading, error } = useMovieDetails(movieId);
  const { data: castCrew, isLoading } = useMovieCastCrew(movieId);

  const router = useRouter();

  if (!movie) {
    return <>Loading movie</>
  }

  if (error) {
    return <p>Movie data not available.</p>;
  }

  if (isLoading) {
    return <p>Crew loading available</p>;
  }
  const date = new Date(movie.release_date).getFullYear();

  let reviews = [
    {
      name: "Junior",
      location: "Ke",
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula tortor nec enim faucibus, non cursus nisl convallis.",
      rating: 4.5,
    },
    {
      name: "Mary",
      location: "US",
      feedback:
        "Vestibulum sit amet ex et velit interdum tincidunt. Sed fringilla orci ut augue efficitur, at suscipit orci fermentum.",
      rating: 4.8,
    },
    {
      name: "Carlos",
      location: "MX",
      feedback:
        "Donec pharetra lorem sit amet lorem volutpat, sed vestibulum turpis posuere. Curabitur sed gravida enim. Integer at tortor at risus cursus.",
      rating: 3.9,
    },
    {
      name: "Sophia",
      location: "UK",
      feedback:
        "Mauris efficitur sem sit amet ipsum mollis, ac varius metus lacinia. Fusce ac mi malesuada, convallis ligula vel, lobortis eros.",
      rating: 5.0,
    },
    {
      name: "David",
      location: "CA",
      feedback:
        "Aliquam erat volutpat. Integer vehicula risus sit amet eros euismod, et pretium ante tristique. Nullam a suscipit justo.",
      rating: 4.2,
    },
    {
      name: "Junior",
      location: "Ke",
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula tortor nec enim faucibus, non cursus nisl convallis.",
      rating: 4.5,
    },
    {
      name: "Mary",
      location: "US",
      feedback:
        "Vestibulum sit amet ex et velit interdum tincidunt. Sed fringilla orci ut augue efficitur, at suscipit orci fermentum.",
      rating: 4.8,
    },
    {
      name: "Carlos",
      location: "MX",
      feedback:
        "Donec pharetra lorem sit amet lorem volutpat, sed vestibulum turpis posuere. Curabitur sed gravida enim. Integer at tortor at risus cursus.",
      rating: 3.9,
    },
  ];

  function departments(
    crew: Crew[],
  ): { department: string; crewMembers: Crew[] }[] {
    return crew.reduce(
      (acc, member) => {
        const { department } = member;

        // Find if a department object already exists
        const departmentObj = acc.find(
          (item) => item.department === department,
        );

        if (departmentObj) {
          // If the department object exists, push the crew member into it
          departmentObj.crewMembers.push(member);
        } else {
          // Otherwise, create a new department object with the current member
          acc.push({ department, crewMembers: [member] });
        }

        return acc;
      },
      [] as { department: string; crewMembers: Crew[] }[],
    );
  }

  const crews: { department: string; crewMembers: Crew[] }[] = departments(
    castCrew?.crew ?? [],
  );

  return (
    <div>
      <div className="relative">
        <div className="relative h-[60vh] min-h-[400px] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-white via-transparent to-black opacity-60" />
        </div>
        <button
          className="absolute left-0 top-0 z-10 m-4 flex items-center justify-center gap-2 rounded-md bg-primary p-3 font-bold text-white transition duration-200 ease-in-out hover:bg-secondary active:bg-secondary"
          onClick={() => {
            router.push("/");
          }}
        >
          <ThickArrowLeftIcon /> Back
        </button>
        <div className="absolute left-1/2 top-3/4 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-4 px-4 sm:px-6 md:px-8">
          <h1 className="text-center text-4xl font-extrabold tracking-wide text-white shadow-lg sm:text-5xl md:text-6xl">
            {movie.title}
          </h1>
          <p className="text-sm sm:text-base lg:text-center">
            {movie.overview}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="flex items-center justify-center gap-2 rounded-md bg-primary p-3 font-bold text-white transition duration-200 ease-in-out hover:bg-secondary active:bg-secondary">
              Play
              <PlayIcon className="h-5 w-5" />
            </button>
            <button className="flex items-center justify-center rounded-md border-2 border-primary bg-transparent p-3 text-primary transition duration-200 ease-in-out hover:border-white hover:bg-secondary hover:text-white active:bg-secondary">
              <PlusIcon className="h-5 w-5" />
            </button>
            <span className="flex items-center justify-center gap-2 rounded-md p-3 font-bold">
              <CountdownTimerIcon className="h-7 w-7" />
              {movie.runtime} mins
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 md:flex-row md:gap-10">
        <div className="w-full md:w-2/3">
          <div className="m-5 rounded-lg bg-[#111111] p-10">
            <h3 className="mb-5 font-semibold">Description</h3>
            <p>{movie.overview}</p>
          </div>
          <div className="m-5 rounded-lg bg-[#111111] p-10">
            <h3 className="mb-5 font-semibold">Cast</h3>
            <div className="flex flex-wrap justify-center gap-5">
              {castCrew?.cast.slice(0, 10).map((cast) =>
                cast.profile_path ? (
                  <div key={cast.id} className="flex flex-col items-center">
                    <div className="relative mb-3 h-40 w-40">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                        alt={cast.name}
                        layout="fill"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <p className="text-center">
                      {cast.name} <br /> as <br /> {cast.character}
                    </p>
                  </div>
                ) : null,
              )}
            </div>
          </div>
          <div className="m-5 rounded-lg bg-[#111111] p-10">
            <div className="mb-5 flex justify-between">
              <h3 className="mb-5 text-xl font-semibold">Reviews</h3>
              <button className="flex items-center justify-center gap-2 rounded-md bg-primary p-3 font-bold text-white transition duration-200 ease-in-out hover:bg-secondary active:bg-secondary">
                <PlusIcon className="h-7 w-7" /> Add your review
              </button>
            </div>
            <div className="flex flex-wrap gap-5">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="w-full rounded-lg border border-black bg-[#333] p-3 sm:w-1/2 lg:w-1/4"
                >
                  <div className="mb-3 flex justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{review.name}</h2>
                      <p>{review.location}</p>
                    </div>
                    <Rating rate={review.rating} />
                  </div>
                  <p>{review.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="m-5 w-full rounded-lg bg-[#111111] p-10 md:w-1/3">
          <div>
            <div className="py-3">
              <div className="flex items-center gap-3 text-[#333]">
                <CalendarIcon className="h-5 w-5" />
                <h2 className="text-md font-medium">Released Year</h2>
              </div>
              <p className="ml-7 font-semibold">{date}</p>
            </div>
            <div className="py-3">
              <div className="flex items-center gap-3 text-[#333]">
                <PilcrowIcon className="h-5 w-5" />
                <h2 className="text-md font-medium">Available languages</h2>
              </div>
              <div className="ml-7">
                {movie.spoken_languages.map((language, idx) => (
                  <span className="font-semibold" key={idx}>
                    {language.iso_639_1}{" "}
                  </span>
                ))}
              </div>
            </div>
            <div className="py-3">
              <div className="flex items-center gap-3 text-[#333]">
                <StarIcon className="h-5 w-5" />
                <h2 className="text-md font-medium">Ratings</h2>
              </div>
              <p className="ml-7 font-semibold">{movie.vote_average}</p>
            </div>
            <div className="py-3">
              <div className="flex items-center gap-3 text-[#333]">
                <DashboardIcon className="h-5 w-5" />
                <h2 className="text-md font-medium">Genres</h2>
              </div>
              <div className="ml-7 flex flex-wrap gap-3">
                {movie.genres.map((genre, idx) => (
                  <span
                    className="rounded-lg border-black bg-[#333] p-2 font-medium"
                    key={idx}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            {crews.map(({ department, crewMembers }, idx) => (
              <div key={idx} className="my-3">
                <h2 className="text-md font-bold text-[#333]">{department}</h2>
                <div className="flex gap-3 overflow-hidden">
                  {crewMembers.map((crew, idx) => (
                    <div
                      key={idx}
                      className="flex h-40 w-full items-center gap-5 rounded-lg border border-black bg-[#333] p-3"
                    >
                      <div className="relative h-36 w-36">
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
                          layout="fill"
                          className="rounded-lg"
                          alt={crew.name}
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-medium">{crew.name}</h2>
                        <p>{crew.job}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
