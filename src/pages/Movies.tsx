import React from "react";

import { useQuery } from "@tanstack/react-query";
import {  baseUrl,  options } from "../api";

import Catygories from "../components/Catygories";
import MainSwiper from "../components/MainSwiper";

export default function Movies() {
  const { isPending, error, data } = useQuery({
    queryKey: ["getPlayingMovies"],
    queryFn: () =>
      fetch(`${baseUrl}/movie/now_playing`, options).then((res) => res.json()),
  });
  if (isPending) {
    return <div>Loading</div>;
  }

  if (error || !data) {
    return <div>Error</div>;
  }
  const sliceData = data.results.slice(0, 4);
  return (
    <div>
      <MainSwiper data={sliceData}/>
      <Catygories  />
    </div>
  );
}
