import styles from "./ImageSlider.module.scss";
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import 'swiper/scss';

import image_1 from "../../assets/images/slider_1.jpeg";

register();


function ImageSlider() {
  const swiperElRef = useRef(null);
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
        slides-per-view="1"
        navigation="true"
        pagination="true"
        className={styles["swiper-container"]}
        >
        <swiper-slide className={styles["swiper-slide"]}><img src={image_1} alt="Image 1" /></swiper-slide>
        <swiper-slide className={styles["swiper-slide"]}>Slide 2</swiper-slide>
        <swiper-slide className={styles["swiper-slide"]}>Slide 3</swiper-slide>
      </swiper-container>
    </div>
  );
}

export default ImageSlider;