import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { imgUrl } from "../api";
import { Link } from "react-router-dom";
import { Movie } from "../types";
type Props = { title: string; movieList: Movie[] };

export default function MovieCategory({ title, movieList }: Props) {
  console.log("MOVIE LIST");
  console.log(movieList);

  return (
    <>
      <p className="genres-specialTitle">{title}</p>
      <div className="genres-our">
        <Swiper
          navigation={true}
          pagination={true}
          slidesPerView={5}
          slidesPerGroup={5}
          spaceBetween={20}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {movieList.map((el) => {
            return (
              <SwiperSlide>
                <div className="genres-movieList">
                  <Link to={`/oneMovie/${el.id}`}>
                    <img
                      src={`${imgUrl}${el.poster_path}`}
                      alt="img"
                      className="genres-img"
                    />
                  </Link>

                  <p className="genres-releaseText">
                    Release date : {el.release_date}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* <div className="genres-ourActions">
        <div></div>
        <ToLeftIcon />
        <ToRightIcon />
      </div> */}
      </div>
    </>
  );
}
