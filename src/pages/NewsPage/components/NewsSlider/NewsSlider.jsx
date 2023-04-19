import styles from "./NewsSlider.module.scss";
import {useRef, useEffect} from 'react';
import {register} from 'swiper/element/bundle';
import {Navigation, Pagination, Autoplay} from "swiper";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';


import CardContent from "@components/Cards/CardContent/CardContent.jsx";

register();


function NewsSlider() {

    const swiperElRef = useRef(null);


    useEffect(() => {
        const swiperParams = {
            modules: {Navigation, Pagination, Autoplay},
            slidesPerView: 4,
            spaceBetween: 20,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                    spaceBetween: 20
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                426: {
                    slidesPerView: 1,
                    spaceBetween: 20
                }
            },
            autoplay: {
                delay: 3000,
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

                <swiper-slide class={styles["swiper-slide"]}>
                    <CardContent
                        speciality="Securitate"
                        title="învățământ superior din Moldova membră a rețelei"
                        date="Ln, 24 Aprilie, 2023"/>
                </swiper-slide>
                <swiper-slide class={styles["swiper-slide"]}>
                    <CardContent
                        speciality="Securitate"
                        title="învățământ superior din Moldova membră a rețelei"
                        date="Ln, 24 Aprilie, 2023"/>
                </swiper-slide>
                <swiper-slide class={styles["swiper-slide"]}>
                    <CardContent
                        speciality="Securitate"
                        title="învățământ superior din Moldova membră a rețelei"
                        date="Ln, 24 Aprilie, 2023"/>
                </swiper-slide>
                <swiper-slide class={styles["swiper-slide"]}>
                    <CardContent
                        speciality="Securitate"
                        title="învățământ superior din Moldova membră a rețelei"
                        date="Ln, 24 Aprilie, 2023"/>
                </swiper-slide>
                <swiper-slide class={styles["swiper-slide"]}>
                    <CardContent
                        speciality="Securitate"
                        title="învățământ superior din Moldova membră a rețelei"
                        date="Ln, 24 Aprilie, 2023"/>
                </swiper-slide>

            </swiper-container>
        </div>
    );
}

export default NewsSlider;