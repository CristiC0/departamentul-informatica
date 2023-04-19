import styles from "./ImageSlider_1.module.scss";
import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {SlArrowLeft,SlArrowRight } from 'react-icons/Sl';

import 'swiper/scss';


import image_1 from "@images/Slider_1.jpeg";
import image_2 from "@images/Slider_2.jpeg";
import image_4 from "@images/img-slider-1.jpeg"
import { EffectFade, Navigation, Pagination } from "swiper";



function ImageSlider() {

  const images = [image_4, image_1, image_2];
  const swiperNavPrevRef=useRef(null);
  const swiperNavNextRef=useRef(null);

  return (
    <div className={styles.container}>
      <Swiper
        className={styles.swiper}
        modules={[Navigation , Pagination, EffectFade]}
        navigation={{
          prevEl:swiperNavPrevRef.current,
          nextEl:swiperNavNextRef.current,
        }}
        pagination
        effect={'fade'}
        speed={800}
        loop
        spaceBetween={50}
        slidesPerView={1}
        
      >
        {
          images.map((images) =>

            <SwiperSlide key={images} className={styles["swiper-slide"]} >
              <img src={images} alt="Image" />
            </SwiperSlide>

          )
        }
        <SlArrowLeft className={styles.swiperNavPrev} ref={swiperNavPrevRef}/>
        <SlArrowRight className={styles.swiperNavNext} ref={swiperNavNextRef}/>
        {/* <div className={styles.swiperNavPrev} ref={swiperNavPrevRef}></div>
        <div className={styles.swiperNavNext} ref={swiperNavNextRef}></div> */}
      </Swiper>

    </div>
  );
}

export default ImageSlider;