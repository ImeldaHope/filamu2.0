import GenreCard from "@/components/genreCard";
import Hero from "@/components/hero";
import NewRelease from "@/components/newRelease";
import NewReleaseSeries from "@/components/newReleaseSeries";
import TopTen from "@/components/topTen";
import TopSeries from "@/components/topSeries";
import UpcomingMovies from "@/components/upcomingMovies";
import UpcomingSeries from "@/components/upcomingSeries";

export default function Home() {
  return (
    <>
      {/* <Hero />       */}
      <GenreCard type="movie" />
      <NewRelease type="movie" />
      <TopTen type="movie" />
      <UpcomingMovies />
      <GenreCard type="series" />
      <NewRelease type="series" />
      <TopTen type="series" />
      <UpcomingSeries />
    </>
  );
}
