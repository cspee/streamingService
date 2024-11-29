import React, { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { imgUrl } from "../api";
import PlayBtn from "../assets/PlayBtn";
import PlusIcon from "../assets/PlusIcon";
import LikeIcon from "../assets/LikeIcon";
import SoundIcon from "../assets/SoundIcon";
import ToLeftIcon from "../assets/ToLeftIcon";
import ToRightIcon from "../assets/ToRightIcon";
import { Movie } from "../types";
import ModalTrailer from "./ModalTrailer";
type Props = { data: Movie[] };
export default function MainSwiper({ data }: Props) {
  const [movieId, setMovieId] = useState<number | null>(null);
  return (
    <div className="logoMain">
      <Swiper
        pagination={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        navigation={{
          prevEl: ".logo-toLeftBtn",
          nextEl: ".logo-toRightBtn",
        }}
      >
        {data.map((el) => {
          return (
            <SwiperSlide>
              <div className="logo">
                <img
                  src={`${imgUrl}${el.backdrop_path}`}
                  alt=""
                  className="logo-img"
                />
                <div className="logo-container">
                  <h1 className="logo-textTitle">{el.title}</h1>
                  <p className="logo-text">{el.overview}</p>
                  <div>
                    <div className="logo-actions">
                      <button
                        className="logo-playBtn"
                        onClick={() => setMovieId(el.id)}
                      >
                        <PlayBtn />
                        Play now
                      </button>
                      <div className="logo-plusBtn">
                        <PlusIcon />
                      </div>
                      <div className="logo-likeBtn">
                        <LikeIcon />
                      </div>
                      <div className="logo-soundBtn">
                        <SoundIcon />
                      </div>
                    </div>
                    <div className="logo-changeLogo">
                      <button className=" logo-toLeftBtn ">
                        <ToLeftIcon />
                      </button>
                      <button className=" logo-toRightBtn">
                        <ToRightIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {movieId && <ModalTrailer movieId={movieId} setMovieId={setMovieId} />}
    </div>
  );
}
