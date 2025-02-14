import GenreCard from "@/components/genreCard";
import Hero from "@/components/hero";
import NewRelease from "@/components/newRelease";
import NewReleaseSeries from "@/components/newReleaseSeries";
import TopMovies from "@/components/topMovies";
import TopSeries from "@/components/topSeries";
import UpcomingMovies from "@/components/upcomingMovies";
import UpcomingSeries from "@/components/upcomingSeries";

export default function Home() {
  return (
    <>
      {/* <Hero />       */}
      <GenreCard type="movie" />
      <NewRelease />
      <TopMovies />
      <UpcomingMovies />
      <GenreCard type="series" />
      <NewReleaseSeries />
      <TopSeries />
      <UpcomingSeries />
    </>
  );
}
