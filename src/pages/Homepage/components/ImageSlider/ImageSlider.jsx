import styles from "./ImageSlider.module.scss";
import { useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { register } from 'swiper/element/bundle';
import { EffectFade, Navigation, Pagination, Autoplay, Scrollbar } from "swiper";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import 'swiper/scss/scrollbar';

import image_1 from "@images/Slider_1.jpeg";
import image_2 from "@images/Slider_2.jpeg";
import image_3 from "@images/Slider_4.jpeg";
import image_4 from "@images/img-slider-1.jpeg";
import { Button } from "bootstrap";

register();


function ImageSlider() {

  const swiperElRef = useRef(null);

  const images = [image_4, image_1, image_2, image_3];

  useEffect(() => {
    const swiperContainer = swiperElRef.current;
    const params = {
      modules: { EffectFade, Navigation, Pagination, Autoplay, Scrollbar },
      //navigation: true,
      slidesPerView: 1,
      loop: true,
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
              <div className={styles.content}>
                <div class={styles.content__container}>
                  <h1 className={styles.content__title}>Bine ați venit la Departamentul de Informatică</h1>
                  <p>
                  Un loc unde excelența în educație se întâlnește cu popularitatea în industria IT. Suntem mândri să vă prezentăm un departament dinamic și vibrant, care oferă studenților oportunități senzaționale de a-și dezvolta cunoștințele și abilitățile în domeniul informaticii. Cu un program de studii cuprinzător și o echipă excepțională de profesori, suntem dedicați pregătirii specialiștilor în informatică care să fie pregătiți să abordeze provocările actuale și viitoare ale unei lumi digitale în continuă schimbare. 
                  </p>
                  <div className={styles.content__buttons}>
                    <button type="button" className={`btn btn-prmary ${styles["content__buttons--fill"]}`}>
                      <Link to="https://admitere.usm.md/" target="_blank">Aplică</Link>
                    </button>
                    <button type="button" className={`btn btn-outline ${styles["content__buttons--empty"]}`}>
                      <Link to="#">Citește mai mult</Link>
                    </button>
                  </div>
                </div>
              </div>
            </swiper-slide>
          )
        }
      </swiper-container>
    </div >
  );
}

export default ImageSlider;