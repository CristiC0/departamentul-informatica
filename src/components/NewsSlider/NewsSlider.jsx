import styles from './NewsSlider.module.scss'
import { useRef, useState, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { Navigation, Pagination, Autoplay } from "swiper";
import axios from 'axios';

export default function NewsSlider() {

    const swiperElRef = useRef(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const swiperParams = {
            modules: { Navigation, Pagination, Autoplay },
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                992: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                767: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },

        }
        Object.assign(swiperElRef.current, swiperParams);
        swiperElRef.current.initialize();

    }, []);
    
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/news`)
            .then((response) => {
                setData(response.data);
            })
    }, []);

    if (data === null) return (<>Loading...</>)
    const priorityNews = data.filter((data) => (data.priority == 1));

    return (
        <div className={styles.container}>

            <swiper-container
                ref={swiperElRef}
                init="false"
                className={styles.swiper_container}
            >
                {priorityNews.map((news) => (
                    <swiper-slide key={news.id} className={styles.swiper}>
                        <div className={`card ${styles.card}`}>
                            <img src={news.thumbnail} className="card-img-top" alt="..." />
                            <div className={`card-body ${styles.card__body}`}>
                                <h5 className={`card-title ${styles.card__title}`}>{news.title}</h5>
                                <p className={`card-text ${styles.card__text}`}>{news.createdAt}</p>
                            </div>
                            <div className={styles.overlay}>
                                <h5 className={styles.overlay__name}>{news.title}</h5>
                                <div className={styles.overlay__text}>
                                    <p className={styles.overlay__description}>{news.content}</p>
                                </div>
                                <a href="#" className={`btn btn-primary ${styles.overlay__button}`}>Acceseaza cursul</a>
                            </div>
                        </div>
                    </swiper-slide>
                ))}
            </swiper-container>
        </div>
    );
}
