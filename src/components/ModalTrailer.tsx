import { useQuery } from "@tanstack/react-query";
import React from "react";
import ReactPlayer from "react-player";
import { baseUrl, options } from "../api";
type Props = {
  movieId: number | null;
  setMovieId: (id: number | null) => void;
};
export default function ModalTrailer({ movieId, setMovieId }: Props) {
  const { isPending, error, data } = useQuery({
    queryKey: ["getOneVideos", movieId],
    enabled: !!movieId,
    queryFn: () =>
      fetch(`${baseUrl}/movie/${movieId}/videos`, options).then((res) =>
        res.json()
      ),
  });
  console.log(data);
  if (isPending) {
    return <div>Is pending</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  const videoData = data.results.find((el) => el.type == "Trailer");
  return (
    <div className="modal">
      <div className="modal-container">
        <button className="modal-close" onClick={() => setMovieId(null)}>
          Close
        </button>
        <div className="modal-trailer">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoData.key}`}
            playing={false}
            controls={true}
            width={`100%`}
            height={"100%"}
          />
        </div>
      </div>
    </div>
  );
}
