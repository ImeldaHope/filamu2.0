import GenreCard from "@/components/genreCard";
import GenreCardSeries from "@/components/genreCardSeries";
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
      <GenreCard />
      <NewRelease />
      <TopMovies />      
      <UpcomingMovies />
      <GenreCardSeries />  
      <NewReleaseSeries />
      <TopSeries />
      <UpcomingSeries />
      
      
      </>
    
  );
}
