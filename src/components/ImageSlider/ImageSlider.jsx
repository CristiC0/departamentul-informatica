import styles from "./ImageSlider.module.scss";
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

import image_1 from "@images/Slider_1.jpeg";
import image_2 from "@images/Slider_2.jpeg";
import image_4 from "@images/img-slider-1.jpeg"

register();


function ImageSlider() {

  const swiperElRef = useRef(null);
  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);

  const images = [image_4, image_1, image_2];

  useEffect(() => {
    swiperElRef.current.addEventListener('progress', (e) => {
      const [swiper, progress] = e.detail;
    });

    swiperElRef.current.addEventListener('slidechange', (e) => {
    });
  }, []);

  useEffect(() => {
    const swiperParams = {
      modules: { Navigation, Pagination,Autoplay},
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      slidesPerView: 1,
      autoplay: {
        delay: 5000,
      },

    }
    Object.assign(swiperElRef.current, swiperParams);
    swiperElRef.current.initialize();
  }, []);



  return (
    <div className={styles.container}>
      <swiper-container
        ref={swiperElRef}
        init="false"
        class={styles["swiper-container"]}
      >
        {
          images.map((images) =>

            <swiper-slide class={styles["swiper-slide"]}>
              <img src={images} alt="Image" />
              <div className={`swiper-button-prev ${styles["swiper-button-prev"]}`}></div>
              <div className={`swiper-button-next ${styles["swiper-button-next"]}`}></div>
              <div className={`swiper-pagination ${styles["swiper-pagination"]}`}></div>
            </swiper-slide>

          )
        }

      </swiper-container>
    </div >
  );
}

export default ImageSlider;