import styles from "./ImageSlider.module.scss";
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { EffectFade, Navigation } from "swiper";
import 'swiper/scss';
import 'swiper/scss/navigation';

import image_1 from "@images/Slider_1.jpeg";
import image_2 from "@images/Slider_2.jpeg";
import image_3 from "@images/Slider_3.jpeg";

register();




function ImageSlider() {

  const swiperElRef = useRef(null);
  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);

  const images = [image_1, image_2, image_3];

  useEffect(() => {
    swiperElRef.current.addEventListener('progress', (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener('slidechange', (e) => {
    });
  }, []);



  return (
    <div className={styles.container}>
      <swiper-container
        ref={swiperElRef}
        modules={[Navigation]}
        slides-per-view="1"
        pagination="true"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}

        // navigation={{
        //   nextEl: swiperNavPrevRef.current,
        //   prevEl: swiperNavNextRef.current,
        // }}

        // onSwiper={(swiper) => {
        //   setTimeout(() => {
        //     swiper.params.navigation.prevEl = swiperNavPrevRef.current;
        //     swiper.params.navigation.nextEl = swiperNavNextRef.current;

        //     swiper.navigation.destroy();
        //     swiper.navigation.init();
        //     swiper.navigation.update();
        //   })
        // }}

        class={styles["swiper-container"]}
      >
        {
          images.map((images) =>
            <swiper-slide class={styles["swiper-slide"]}>
              <img src={images} alt="Image" />
            </swiper-slide>
          )
        }
        {/* <div ref={swiperNavPrevRef}></div>
        <div ref={swiperNavNextRef}></div> */}
      </swiper-container>
    </div >
  );
}

export default ImageSlider;