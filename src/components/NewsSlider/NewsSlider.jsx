import styles from "./NewsSlider.module.scss";
import { useRef, useState, useEffect } from "react";
import { register } from "swiper/element/bundle";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import axios from "axios";
import useNews from "@hooks/useNews";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

register();
export default function NewsSlider() {
    const swiperElRef = useRef(null);
    const [data, setData] = useState(null);
    const { i18n } = useTranslation();

    const swiperParams = {
        modules: { Navigation, Pagination, Autoplay, EffectFade },
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 20
            },
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        effect: "fade",

    };

    useEffect(() => {
        if (swiperElRef?.current) {
            Object.assign(swiperElRef.current, swiperParams);
            swiperElRef.current.initialize();
        }
    }, [swiperElRef, swiperParams]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/news`)
            .then((response) => {
                setData(response.data);
            });
    }, []);

    if (data === null) return <>Loading...</>;
    const priorityNews = data.filter((data) => data.priority == 1);

    return (
        <div className={styles.container}>
            <small>Vă ținem mereu la curent</small>
            <h2>Ultimele noutăți</h2>
            <swiper-container
                ref={swiperElRef}
                init="true"
                className={styles.swiper_container}
            >
                {priorityNews.map((news) => (
                    <swiper-slide key={news.id} className={styles.swiper}>
                        <div className={`card ${styles.card}`}>
                            <img
                                src={news.thumbnail}
                                className="card-img-top"
                                alt="..."
                            />
                            <div className={`card-body ${styles.card__body}`}>
                                <h5
                                    className={`card-title ${styles.card__title}`}
                                >
                                    {news.title}
                                </h5>
                                <p className={`card-text ${styles.card__data}`}>
                                    {new Date(
                                        news.createdAt
                                    ).toLocaleDateString("en-GB")}
                                </p>
                            </div>
                            <div className={styles.overlay}>
                                <h5 className={styles.overlay__name}>
                                    {news.title}
                                </h5>
                                <div className={styles.overlay__text}>
                                    <p className={styles.overlay__description}>
                                        {news.content?.[0]?.content?.[0]?.text}
                                    </p>
                                </div>
                                <Link
                                    to={`/${i18n.language}/news/${news.id}`}
                                    className={`btn btn-primary ${styles.overlay__button}`}
                                >
                                    Acceseaza
                                </Link>
                            </div>
                        </div>
                    </swiper-slide>
                ))}
            </swiper-container>
        </div>
    );
}
