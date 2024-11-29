import React from "react";
import MovieCategory from "./MovieCategory";
import { useQuery } from "@tanstack/react-query";
import { baseUrl, options } from "../api";

export default function Catygories() {
  const {
    isPending: playingPending,
    error: playingError,
    data: playingData,
  } = useQuery({
    queryKey: ["getPlayingCatygories"],
    queryFn: () =>
      fetch(`${baseUrl}/movie/now_playing`, options).then((res) => res.json()),
  });
  const {
    isPending: popularPending,
    error: popularError,
    data: popularData,
  } = useQuery({
    queryKey: ["getPopularCatygories"],
    queryFn: () =>
      fetch(`${baseUrl}/movie/popular`, options).then((res) => res.json()),
  });
  const {
    isPending: ratedPending,
    error: ratedError,
    data: ratedData,
  } = useQuery({
    queryKey: ["getRatedCatygories"],
    queryFn: () =>
      fetch(`${baseUrl}/movie/top_rated`, options).then((res) => res.json()),
  });
  const {
    isPending: upcomingPending,
    error: upcomingError,
    data: upcomingData,
  } = useQuery({
    queryKey: ["getUpcomingCatygories"],
    queryFn: () =>
      fetch(`${baseUrl}/movie/upcoming`, options).then((res) => res.json()),
  });
  if (upcomingPending || ratedPending || playingPending || popularPending) {
    return <div>Loading</div>;
  }
  if (upcomingError || ratedError || playingError || popularError) {
    return <div>Error</div>;
  }
  console.log(playingData);

  return (
    <div className="genres">
      <div className="genres-movies">
        <h2 className="genres-title">Movies</h2>

        <MovieCategory title="Now Playing" movieList={playingData.results}   />
        <MovieCategory title="Popular" movieList={popularData.results}  />
        <MovieCategory title="Top Rated" movieList={ratedData.results}  />
        <MovieCategory title="Upcoming" movieList={upcomingData.results}  />
      </div>
    </div>
  );
}
