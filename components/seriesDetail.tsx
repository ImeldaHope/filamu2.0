"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  PlayIcon,
  PlusIcon,
  StarIcon,
  CalendarIcon,
  CountdownTimerIcon,
  DashboardIcon,
  PilcrowIcon,
  LayersIcon,
  ThickArrowLeftIcon,
} from "@radix-ui/react-icons";
import {
  useSeriesCastCrew,
  useSeriesDetails,
  useSeasonDetails,
} from "@/hooks";

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

const NoSignal = ({ message }: { message: string }) => (
  <div className="flex min-h-[60vh] items-center justify-center p-6">
    <div className="scanlines relative w-full max-w-lg overflow-hidden rounded-md border-2 border-crt-600 bg-crt-700 p-10 text-center">
      <p className="rec-dot font-crt text-xl text-magenta">✗ NO SIGNAL</p>
      <h1 className="mt-3 font-display text-3xl uppercase text-cream">
        {message}
      </h1>
      <p className="mt-3 text-cream/70">
        The tape wouldn&apos;t track. Head back to the shelves and try another.
      </p>
    </div>
  </div>
);

const SeriesDetail = ({ seriesId }: { seriesId: number }) => {
  const { data: series, isLoading, error } = useSeriesDetails(seriesId);
  const { data: castCrew } = useSeriesCastCrew(seriesId);
  const router = useRouter();

  // Seasons worth showing (skip "Specials" / season 0 when real seasons exist).
  const seasons =
    series?.seasons?.filter((s) => s.season_number > 0) ??
    series?.seasons ??
    [];

  const [activeSeason, setActiveSeason] = React.useState<number | null>(null);
  const selectedSeason =
    activeSeason ?? (seasons.length > 0 ? seasons[0].season_number : 1);

  const { data: season, isLoading: seasonLoading } = useSeasonDetails(
    seriesId,
    selectedSeason,
  );

  if (error) {
    return <NoSignal message="Tape not cataloged" />;
  }

  if (isLoading || !series) {
    return (
      <p className="m-8 font-crt text-xl text-phosphor">▶ Cueing up the tape…</p>
    );
  }

  const year = series.first_air_date
    ? new Date(series.first_air_date).getFullYear()
    : "—";
  const runtime = series.episode_run_time?.[0];

  return (
    <div>
      <div className="relative p-4 md:p-6">
        <div className="scanlines relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-md border-2 border-crt-600">
          {series.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
              alt={series.name}
              fill
              className="object-cover brightness-[0.4] saturate-[0.85]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-crt via-crt/50 to-transparent" />

          <button
            className="sticker absolute left-4 top-4 z-20 flex items-center gap-2 rounded-sm bg-phosphor px-3 py-2 font-display text-xs uppercase text-crt-800 transition-transform hover:-translate-y-0.5"
            onClick={() => router.back()}
          >
            <ThickArrowLeftIcon /> Back
          </button>

          <div className="absolute bottom-0 left-0 z-10 flex w-full flex-col gap-4 px-6 pb-10 md:px-12">
            <span className="font-crt text-lg text-phosphor text-glow">
              ▶ BOX SET · SP · {series.number_of_seasons} SEASON
              {series.number_of_seasons === 1 ? "" : "S"} ·{" "}
              {series.number_of_episodes} EP
            </span>
            <h1 className="max-w-4xl font-display text-4xl uppercase leading-[0.95] text-cream sm:text-5xl md:text-6xl">
              {series.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <button className="sticker inline-flex items-center gap-2 rounded-sm bg-phosphor px-6 py-3 font-display text-sm uppercase text-crt-800 transition-transform hover:-translate-y-0.5">
                Play <PlayIcon className="h-5 w-5" />
              </button>
              <button className="sticker inline-flex items-center gap-2 rounded-sm bg-transparent px-5 py-3 font-crt text-lg uppercase text-magenta transition-transform hover:-translate-y-0.5">
                <PlusIcon className="h-5 w-5" /> Watchlist
              </button>
              {runtime ? (
                <span className="inline-flex items-center gap-2 font-crt text-lg text-cream">
                  <CountdownTimerIcon className="h-6 w-6 text-phosphor" />~
                  {runtime} mins / ep
                </span>
              ) : null}
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
            <p className="text-cream/85">
              {series.overview || "No synopsis on file for this tape yet."}
            </p>
          </Panel>

          {/* Seasons + episodes */}
          <Panel>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl uppercase text-phosphor">
                Seasons &amp; Episodes
              </h3>
              <div className="flex flex-wrap gap-2">
                {seasons.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSeason(s.season_number)}
                    className={`sticker rounded-sm px-3 py-1.5 font-crt text-base uppercase transition-colors ${
                      s.season_number === selectedSeason
                        ? "bg-phosphor text-crt-800"
                        : "bg-crt-800 text-cream hover:text-phosphor"
                    }`}
                  >
                    S{s.season_number}
                  </button>
                ))}
              </div>
            </div>

            {seasonLoading ? (
              <p className="font-crt text-lg text-phosphor">
                ▶ Rewinding to Season {selectedSeason}…
              </p>
            ) : season?.episodes && season.episodes.length > 0 ? (
              <div className="flex flex-col gap-4">
                {season.episodes.map((ep) => (
                  <div
                    key={ep.id}
                    className="flex flex-col gap-4 rounded-sm border border-crt-600 bg-crt-800 p-3 sm:flex-row"
                  >
                    <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-sm sm:w-48">
                      {ep.still_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${ep.still_path}`}
                          alt={ep.name}
                          fill
                          sizes="192px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-crt-600 font-crt text-sm text-muted">
                          NO PREVIEW
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-crt text-lg uppercase text-cream">
                          E{ep.episode_number} · {ep.name}
                        </h4>
                        {ep.vote_average ? (
                          <span className="shrink-0 font-crt text-base text-amber">
                            {ep.vote_average.toFixed(1)} ★
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-3 font-crt text-sm text-muted">
                        {ep.air_date ? <span>{ep.air_date}</span> : null}
                        {ep.runtime ? <span>{ep.runtime} min</span> : null}
                      </div>
                      <p className="mt-2 line-clamp-3 text-sm text-cream/80">
                        {ep.overview || "No episode summary on file."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-crt text-lg text-muted">
                No episodes catalogued for this season yet.
              </p>
            )}
          </Panel>

          <Panel>
            <h3 className="mb-5 font-display text-xl uppercase text-phosphor">
              Cast
            </h3>
            {castCrew?.cast && castCrew.cast.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-5">
                {castCrew.cast.slice(0, 10).map((cast) =>
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
            ) : (
              <p className="font-crt text-lg text-muted">
                Cast list not on file for this tape.
              </p>
            )}
          </Panel>
        </div>

        <div className="m-5 h-fit w-full rounded-sm border-2 border-crt-600 bg-crt-700 p-6 md:w-1/3 md:p-10">
          <div>
            <div className="border-b border-crt-600 py-3">
              <InfoLabel icon={<CalendarIcon className="h-5 w-5" />}>
                First Aired
              </InfoLabel>
              <p className="ml-8 mt-1 font-semibold text-cream">{year}</p>
            </div>
            <div className="border-b border-crt-600 py-3">
              <InfoLabel icon={<LayersIcon className="h-5 w-5" />}>
                Status
              </InfoLabel>
              <p className="ml-8 mt-1 font-semibold text-cream">
                {series.status}
              </p>
            </div>
            <div className="border-b border-crt-600 py-3">
              <InfoLabel icon={<PilcrowIcon className="h-5 w-5" />}>
                Languages
              </InfoLabel>
              <div className="ml-8 mt-1 flex flex-wrap gap-2">
                {series.spoken_languages.map((language, idx) => (
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
                {series.vote_average?.toFixed(1)} ★
              </p>
            </div>
            <div className="py-3">
              <InfoLabel icon={<DashboardIcon className="h-5 w-5" />}>
                Genres
              </InfoLabel>
              <div className="ml-8 mt-2 flex flex-wrap gap-2">
                {series.genres.map((genre, idx) => (
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

          {series.tagline ? (
            <p className="mt-6 border-t border-crt-600 pt-4 font-crt text-lg italic text-magenta">
              “{series.tagline}”
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetail;
