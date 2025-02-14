import GenreCard from "@/components/genreCard";
import Hero from "@/components/hero";
import NewRelease from "@/components/newRelease";
import TopTen from "@/components/topTen";
import Upcoming from "@/components/upcoming";


export default function Home() {
  return (
    <>
      {/* <Hero />       */}
      <GenreCard type="movie" />
      <NewRelease type="movie" />
      <TopTen type="movie" />
      <Upcoming type="movie" />
      <GenreCard type="series" />
      <NewRelease type="series" />
      <TopTen type="series" />
      <Upcoming type="series" />
    </>
  );
}
