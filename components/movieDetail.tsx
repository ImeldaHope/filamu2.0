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
  ThickArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Crew } from "@/types";

export const Rating = ({ rate }: { rate: number }) => {
  const filledStars = Math.floor(rate);
  const halfStar = rate % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }).map((_, index) => {
        if (index < filledStars) {
          return <StarFilledIcon key={index} className="mr-1 text-amber" />;
        }
        if (index === filledStars && halfStar) {
          return <StarIcon key={index} className="mr-1 text-amber" />;
        }
        return <StarIcon key={index} className="mr-1 text-muted" />;
      })}
      <span className="ml-2 font-crt text-lg text-cream">{rate}</span>
    </div>
  );
};

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div className="m-5 rounded-sm border-2 border-crt-600 bg-crt-700 p-6 md:p-10">
    {children}
  </div>
);

const InfoLabel = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 font-crt text-lg uppercase text-phosphor">
    {icon}
    <span>{children}</span>
  </div>
);

const MovieDetail = ({ movieId }: { movieId: number }) => {
  const { data: movie, isLoading: loading, error } = useMovieDetails(movieId);
  const { data: castCrew, isLoading } = useMovieCastCrew(movieId);

  const router = useRouter();

  if (error) {
    return (
      <p className="m-8 font-crt text-xl text-magenta">✗ Movie data not available.</p>
    );
  }

  if (!movie || loading) {
    return (
      <p className="m-8 font-crt text-xl text-phosphor">▶ Cueing up the tape…</p>
    );
  }

  if (isLoading) {
    return (
      <p className="m-8 font-crt text-xl text-phosphor">▶ Loading credits…</p>
    );
  }

  const date = new Date(movie.release_date).getFullYear();

  const reviews = [
    { name: "Junior", location: "KE", feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula tortor nec enim faucibus, non cursus nisl convallis.", rating: 4.5 },
    { name: "Mary", location: "US", feedback: "Vestibulum sit amet ex et velit interdum tincidunt. Sed fringilla orci ut augue efficitur, at suscipit orci fermentum.", rating: 4.8 },
    { name: "Carlos", location: "MX", feedback: "Donec pharetra lorem sit amet lorem volutpat, sed vestibulum turpis posuere. Curabitur sed gravida enim. Integer at tortor at risus cursus.", rating: 3.9 },
    { name: "Sophia", location: "UK", feedback: "Mauris efficitur sem sit amet ipsum mollis, ac varius metus lacinia. Fusce ac mi malesuada, convallis ligula vel, lobortis eros.", rating: 5.0 },
    { name: "David", location: "CA", feedback: "Aliquam erat volutpat. Integer vehicula risus sit amet eros euismod, et pretium ante tristique. Nullam a suscipit justo.", rating: 4.2 },
    { name: "Junior", location: "KE", feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula tortor nec enim faucibus, non cursus nisl convallis.", rating: 4.5 },
    { name: "Mary", location: "US", feedback: "Vestibulum sit amet ex et velit interdum tincidunt. Sed fringilla orci ut augue efficitur, at suscipit orci fermentum.", rating: 4.8 },
    { name: "Carlos", location: "MX", feedback: "Donec pharetra lorem sit amet lorem volutpat, sed vestibulum turpis posuere. Curabitur sed gravida enim. Integer at tortor at risus cursus.", rating: 3.9 },
  ];

  function departments(
    crew: Crew[],
  ): { department: string; crewMembers: Crew[] }[] {
    return crew.reduce(
      (acc, member) => {
        const { department } = member;
        const departmentObj = acc.find((item) => item.department === department);
        if (departmentObj) {
          departmentObj.crewMembers.push(member);
        } else {
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
      <div className="relative p-4 md:p-6">
        <div className="scanlines relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-md border-2 border-crt-600">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover brightness-[0.4] saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-crt via-crt/50 to-transparent" />

          <button
            className="sticker absolute left-4 top-4 z-20 flex items-center gap-2 rounded-sm bg-phosphor px-3 py-2 font-display text-xs uppercase text-crt-800 transition-transform hover:-translate-y-0.5"
            onClick={() => router.push("/")}
          >
            <ThickArrowLeftIcon /> Back
          </button>

          <div className="absolute bottom-0 left-0 z-10 flex w-full flex-col gap-4 px-6 pb-10 md:px-12">
            <span className="font-crt text-lg text-phosphor text-glow">
              ▶ NOW PLAYING · SP · {movie.runtime} MIN
            </span>
            <h1 className="max-w-4xl font-display text-4xl uppercase leading-[0.95] text-cream sm:text-5xl md:text-6xl">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <button className="sticker inline-flex items-center gap-2 rounded-sm bg-phosphor px-6 py-3 font-display text-sm uppercase text-crt-800 transition-transform hover:-translate-y-0.5">
                Play <PlayIcon className="h-5 w-5" />
              </button>
              <button className="sticker inline-flex items-center gap-2 rounded-sm bg-transparent px-5 py-3 font-crt text-lg uppercase text-magenta transition-transform hover:-translate-y-0.5">
                <PlusIcon className="h-5 w-5" /> Watchlist
              </button>
              <span className="inline-flex items-center gap-2 font-crt text-lg text-cream">
                <CountdownTimerIcon className="h-6 w-6 text-phosphor" />
                {movie.runtime} mins
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:gap-6">
        <div className="w-full md:w-2/3">
          <Panel>
            <h3 className="mb-5 font-display text-xl uppercase text-phosphor">
              Synopsis
            </h3>
            <p className="text-cream/85">{movie.overview}</p>
          </Panel>

          <Panel>
            <h3 className="mb-5 font-display text-xl uppercase text-phosphor">
              Cast
            </h3>
            <div className="flex flex-wrap justify-center gap-5">
              {castCrew?.cast.slice(0, 10).map((cast) =>
                cast.profile_path ? (
                  <div key={cast.id} className="flex flex-col items-center">
                    <div className="relative mb-3 h-40 w-40 overflow-hidden rounded-full border-2 border-crt-600">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                        alt={cast.name}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                    <p className="text-center text-sm text-cream">
                      {cast.name}
                      <br />
                      <span className="font-crt text-base text-muted">as</span>
                      <br />
                      <span className="text-phosphor">{cast.character}</span>
                    </p>
                  </div>
                ) : null,
              )}
            </div>
          </Panel>

          <Panel>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl uppercase text-phosphor">
                Rental Reviews
              </h3>
              <button className="sticker inline-flex items-center gap-2 rounded-sm bg-magenta px-4 py-2 font-display text-xs uppercase text-crt-800 transition-transform hover:-translate-y-0.5">
                <PlusIcon className="h-5 w-5" /> Add review
              </button>
            </div>
            <div className="flex flex-wrap gap-5">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="w-full rounded-sm border-2 border-crt-600 bg-crt-800 p-4 sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.94rem)]"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-cream">
                        {review.name}
                      </h2>
                      <p className="font-crt text-base text-muted">
                        {review.location}
                      </p>
                    </div>
                    <Rating rate={review.rating} />
                  </div>
                  <p className="text-sm text-cream/80">{review.feedback}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="m-5 h-fit w-full rounded-sm border-2 border-crt-600 bg-crt-700 p-6 md:w-1/3 md:p-10">
          <div>
            <div className="border-b border-crt-600 py-3">
              <InfoLabel icon={<CalendarIcon className="h-5 w-5" />}>
                Release Year
              </InfoLabel>
              <p className="ml-8 mt-1 font-semibold text-cream">{date}</p>
            </div>
            <div className="border-b border-crt-600 py-3">
              <InfoLabel icon={<PilcrowIcon className="h-5 w-5" />}>
                Languages
              </InfoLabel>
              <div className="ml-8 mt-1 flex flex-wrap gap-2">
                {movie.spoken_languages.map((language, idx) => (
                  <span
                    key={idx}
                    className="font-crt text-base uppercase text-cream"
                  >
                    {language.iso_639_1}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-b border-crt-600 py-3">
              <InfoLabel icon={<StarIcon className="h-5 w-5" />}>Rating</InfoLabel>
              <p className="ml-8 mt-1 font-semibold text-amber">
                {movie.vote_average} ★
              </p>
            </div>
            <div className="py-3">
              <InfoLabel icon={<DashboardIcon className="h-5 w-5" />}>
                Genres
              </InfoLabel>
              <div className="ml-8 mt-2 flex flex-wrap gap-2">
                {movie.genres.map((genre, idx) => (
                  <span
                    key={idx}
                    className="sticker rounded-sm bg-crt-800 px-2 py-1 text-xs text-phosphor"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            {crews.map(({ department, crewMembers }, idx) => (
              <div key={idx} className="my-4">
                <h2 className="mb-2 font-crt text-lg uppercase text-muted">
                  {department}
                </h2>
                <div className="flex flex-col gap-3">
                  {crewMembers.slice(0, 3).map((crew, cidx) => (
                    <div
                      key={cidx}
                      className="flex h-24 w-full items-center gap-4 rounded-sm border border-crt-600 bg-crt-800 p-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm">
                        {crew.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
                            fill
                            sizes="64px"
                            className="object-cover"
                            alt={crew.name}
                          />
                        ) : (
                          <div className="h-full w-full bg-crt-600" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-base font-medium text-cream">
                          {crew.name}
                        </h2>
                        <p className="font-crt text-base text-phosphor">
                          {crew.job}
                        </p>
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
