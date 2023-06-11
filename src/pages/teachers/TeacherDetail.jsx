import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import CompartmentName from "@components/CompartmentName/CompartmentName";
import { useRef, useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import { register } from "swiper/element/bundle";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "swiper/scss";

import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";

import styles from "./TeacherDetail.module.scss";
import { useTranslation } from "react-i18next";

register();

const TeacherDetail = (props) => {
    const swiperElRef = useRef(null);
    const { i18n, } = useTranslation();
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/teachers/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data);
            });
    }, []);

    // if (data.courses !== null) {
    //     const numberOfCourses = data.courses.length;
    //     let coursesPerView = 0;
    //     if (numberOfCourses <= 1) {
    //         coursesPerView = 1;
    //     } else if (numberOfCourses === 2) {
    //         coursesPerView = 2;
    //     }
    //     else {
    //         coursesPerView = 3
    //     }
    // }

    const swiperParams = {
        modules: { Navigation, Pagination, Autoplay },
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            992: {
                slidesPerView: 2,
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
    useEffect(() => {
        if (swiperElRef?.current) {
            Object.assign(swiperElRef.current, swiperParams);
            swiperElRef.current.initialize();
        }
    }, [swiperElRef.current, swiperParams]);


    if (data === null) return <>Loading...</>;

    return (
        <>
            <div className={styles.teacher}>
                <div className={styles.container}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item ">
                                <Link to="/">{t("breadcrumb_home")}</Link>
                            </li>
                            <li className="breadcrumb-item ">
                                <Link to={`/${i18n.language}/teachers`}>
                                    {t("teachers__title")}
                                </Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >{`${data.lastName} ${data.firstName}`}</li>
                        </ol>
                    </nav>
                    <div className={styles.profile}>
                        <div className={styles.profile__content}>
                            <div className={styles.content}>
                                <div className={styles.content__header}>
                                    <h1
                                        className={styles.content__name}
                                    >{`${data.lastName} ${data.firstName}`}</h1>
                                    <Link
                                        to="edit"
                                        className={styles.content__edit}
                                    >
                                        <AiOutlineEdit
                                            className={styles.content__edit}
                                        />
                                    </Link>
                                </div>
                                <p className={styles.content__role}>
                                    {data.title.map((role,i) => {
                                        return <span key={i}>{role}.</span>;
                                    })}
                                </p>
                                <p className={styles.content__description}>
                                    {data.description}
                                </p>
                                <p className={styles.content__biography}>
                                    {data.biografy}
                                </p>
                            </div>
                            <div className={styles.contacts}>
                                <div className={styles.contacts__mail}>
                                    <AiOutlineMail />
                                    <a href={`mailto: ${data.email}`}>
                                        {data.email}
                                    </a>
                                </div>
                                <div className={styles.contacts__phone}>
                                    <BsTelephone />
                                    {data.phone}
                                </div>
                            </div>
                        </div>
                        <div className={styles.profile__photo}>
                            <img
                                src={
                                    data.photo
                                        ? data.photo
                                        : "/src/assets/images/default-user.png"
                                }
                                alt={`${data.lastName} photo`}
                            />
                        </div>
                    </div>

                    <CompartmentName
                        name={`${t("teacher__detail__courses")}`}
                    ></CompartmentName>

                    <div className={styles.container__card}>
                        {Array.from(data.courses).map((course) => (
                            <Card className={styles.card} key={data.id}>
                                <Card.Img className={styles.card__photo} src={course.photo} />
                                <Card.Body className={styles.card__body}>
                                    <Card.Title className={styles.card__title}>{course.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{course.acronym}</Card.Subtitle>
                                    <Card.Text className={styles.card__text}>{course.speciality}</Card.Text>
                                </Card.Body>
                                <div className={styles.overlay}>
                                    <h5 className={styles.overlay__name}>
                                        {course.name}
                                    </h5>
                                    <div className={styles.overlay__text}>
                                        <p className={styles.overlay__description}>
                                            {course.description}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/${i18n.language}/courses/${course.id}`}
                                        className={`btn btn-primary ${styles.overlay__button}`}
                                    >
                                        Acceseaza
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherDetail;
