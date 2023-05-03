import styles from "./ImageSlider.module.scss";
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { EffectFade, Navigation, Pagination, Autoplay, Scrollbar } from "swiper";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import 'swiper/scss/scrollbar';

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
    const swiperContainer = swiperElRef.current;
    const params = {
      modules: { EffectFade, Navigation, Pagination, Autoplay, Scrollbar },
      navigation: true,
      //pagination: {clickable: true},
      slidesPerView: 1,
      autoplay: { delay: 4000 },
      scrollbar: { hide: false, draggable: true },
      effect: "fade",
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
            color: white;

            @media screen and (max-width: 768px) {
              display: none;
            }
          }
          .swiper-pagination-bullet{
            background-color: white;
          }
      `,
      ],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
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
            <swiper-slide key={images} class={styles["swiper-slide"]} >
              <img src={images} alt="Image" />
            </swiper-slide>
          )
        }
      </swiper-container>
    </div >
  );
}

export default ImageSlider;