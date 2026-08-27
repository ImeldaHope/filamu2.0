import type { Metadata } from "next";
import GenreCard from "@/components/genreCard";
import NewRelease from "@/components/newRelease";
import TopTen from "@/components/topTen";
import Upcoming from "@/components/upcoming";

export const metadata: Metadata = {
  title: "Movies · Filamu",
  description: "The movie aisle — every tape we stock, sorted by shelf.",
};

export default function MoviesPage() {
  return (
    <>
      <section className="px-8 pb-2 pt-8">
        <p className="font-crt text-lg text-phosphor text-glow">
          ▶ NOW BROWSING · SP · MOVIES
        </p>
        <h1 className="font-display text-4xl uppercase leading-none text-cream md:text-5xl">
          The Movie Aisle
        </h1>
        <p className="mt-3 max-w-xl text-cream/70">
          Every tape we stock, sorted by shelf. Rewind, browse, repeat.
        </p>
      </section>
      <GenreCard type="movie" />
      <NewRelease type="movie" />
      <TopTen type="movie" />
      <Upcoming type="movie" />
    </>
  );
}
