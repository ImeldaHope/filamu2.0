import type { Metadata } from "next";
import GenreCard from "@/components/genreCard";
import NewRelease from "@/components/newRelease";
import TopTen from "@/components/topTen";
import Upcoming from "@/components/upcoming";

export const metadata: Metadata = {
  title: "Series · Filamu",
  description: "The series aisle — box sets and serials, sorted by shelf.",
};

export default function SeriesPage() {
  return (
    <>
      <section className="px-8 pb-2 pt-8">
        <p className="font-crt text-lg text-phosphor text-glow">
          ▶ NOW BROWSING · SP · SERIES
        </p>
        <h1 className="font-display text-4xl uppercase leading-none text-cream md:text-5xl">
          The Series Aisle
        </h1>
        <p className="mt-3 max-w-xl text-cream/70">
          Box sets and serials, dubbed and shelved. One more episode won&apos;t hurt.
        </p>
      </section>
      <GenreCard type="series" />
      <NewRelease type="series" />
      <TopTen type="series" />
      <Upcoming type="series" />
    </>
  );
}
