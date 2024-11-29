import React from "react";
import PlusIcon from "../assets/PlusIcon";
import ToLeftIcon from "../assets/ToLeftIcon";
import ToRightIcon from "../assets/ToRightIcon";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { baseUrl, imgUrl, options } from "../api";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import MainSwiper from "../components/MainSwiper";

export default function OneMovie() {
  const { id } = useParams();
  const {
    isPending: isPendingOneMovie,
    error: errorOneMovie,
    data: oneMovie,
  } = useQuery({
    queryKey: ["getOneMovie", id],
    queryFn: () =>
      fetch(`${baseUrl}/movie/${id}`, options).then((res) => res.json()),
  });
  const {
    isPending: isPendingCast,
    error: errorCast,
    data: dataCast,
  } = useQuery({
    queryKey: ["getOneMovieCredits", id],
    queryFn: () =>
      fetch(`${baseUrl}/movie/${id}/credits`, options).then((res) =>
        res.json()
      ),
  });

  const {
    isPending: isPendingReview,
    error: errorReview,
    data: dataReview,
  } = useQuery({
    queryKey: ["getReview", id],
    queryFn: () =>
      fetch(`${baseUrl}/movie/${id}/reviews`, options).then((res) =>
        res.json()
      ),
  });
  if (isPendingCast || isPendingReview || isPendingOneMovie) {
    return <div>Loading</div>;
  }

  if (errorCast || !dataCast || errorReview || errorOneMovie) {
    return <div>Error</div>;
  }

  console.log("Выводим один фильм");
  console.log(oneMovie);

  if (!oneMovie) {
    return <div>Loading movie details...</div>;
  }
  console.log("ДАта каст");
  console.log(dataReview);

  return (
    <div>
      <MainSwiper data={[oneMovie]} />
      <div className="oneMovie-info">
        <div className="oneMovie-leftContainer">
          <div className="oneMovie-description">
            <h2 className="oneMovie-descriptionTitle">Description</h2>
            <p className="oneMovie-descriptionText">{oneMovie.overview}</p>
          </div>
          <div className="oneMovie-cast">
            <div className="oneMovie-cast-titleContaienr">
              <div className="oneMovie-castHeader">
                <h2 className="oneMovie-castTitle">Cast</h2>
                <div className="oneMovie-castActions">
                  <button className="oneMovie-castActionsLeftBtn">
                    <ToLeftIcon />
                  </button>
                  <button className="oneMovie-castActionsRightBtn">
                    <ToRightIcon />
                  </button>
                </div>
              </div>

              <Swiper
                navigation={{
                  prevEl: ".oneMovie-castActionsLeftBtn",
                  nextEl: ".oneMovie-castActionsRightBtn",
                }}
                pagination={true}
                slidesPerView={5}
                slidesPerGroup={5}
                spaceBetween={20}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                {dataCast.cast.map((el) => {
                  return (
                    <SwiperSlide>
                      <img
                        className="oneMovie-castImg"
                        src={`${imgUrl}${el.profile_path}`}
                        alt=""
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className="oneMovie-reviews">
            <div className="oneMovie-reviews-titleContaienr">
              <h2 className="oneMovie-reviews-title">Reviews</h2>
            </div>
            <div className="oneMovie-peopleReviews">
              <Swiper
                navigation={{
                  prevEl: ".oneMovie-reviewActions-toLeft",
                  nextEl: ".oneMovie-reviewActions-toRight",
                }}
                pagination={true}
                slidesPerView={2}
                slidesPerGroup={2}
                spaceBetween={20}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                {dataReview.results.map((el) => {
                  return (
                    <SwiperSlide>
                      <div className="oneMovie-reviewContainer">
                        <div className="oneMovie-reviewContainer-title">
                          <p className="oneMovie-reviewContainer-author">
                            {el.author}
                          </p>
                        </div>
                        <p className="oneMovie-reviewContainer-content">
                          {el.content}
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="oneMovie-reviewActions">
              <button className="oneMovie-reviewActions-toLeft">
                <ToLeftIcon />
              </button>
              <button className="oneMovie-reviewActions-toRight">
                <ToRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
