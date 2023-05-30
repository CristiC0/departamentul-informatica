
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import CompartmentName from "@components/CompartmentName/CompartmentName";
import HeaderImage from "@components/HeaderImage/HeaderImage";
import { useRef, useEffect, useState } from 'react';
import { register } from 'swiper/element/bundle';
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";

import styles from "./TeacherDetail.module.scss";



register();

const TeacherDetail = (props) => {
    const swiperElRef = useRef(null);
    const teacherId = useParams("id");
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/teachers/${teacherId}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data.response);
            });
    }, []);

    // useEffect(() => {
    //     const swiperParams = {
    //         modules: { Navigation, Pagination, Autoplay },
    //         slidesPerView: 1,
    //         spaceBetween: 20,
    //         breakpoints: {
    //             992: {
    //                 slidesPerView: 1,
    //                 spaceBetween: 20
    //             },
    //             767: {
    //                 slidesPerView: 1,
    //                 spaceBetween: 20
    //             },
    //         },
    //         autoplay: {
    //             delay: 3000,
    //             disableOnInteraction: false,
    //             pauseOnMouseEnter: true,
    //         },

    //     }
    //     Object.assign(swiperElRef.current, swiperParams);
    //     swiperElRef.current.initialize();
    // }, []);


    const [data, setData] = useState(null);
    const teacherId = window.location.href.split('/')[5];

    useEffect(() => {



        fetch(`${import.meta.env.VITE_API_BASE_URL}/teachers/${teacherId}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            });
    }, [])

    // const numberOfCourses = data.courses.length;
    // let coursesPerView = 0;
    // if (numberOfCourses <= 1) {
    //     coursesPerView = 1;
    // } else if (numberOfCourses === 2) {
    //     coursesPerView = 2;
    // }
    // else {
    //     coursesPerView = 3
    // }

    if (data === null) return (<>Loading...</>)


    return (
        <>
            <HeaderImage headerImage="/src/assets/images/courses-banner.jpeg" />
            <div className={styles.teacher}>
                <div className={styles.container}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">

                            <li className="breadcrumb-item "><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item " ><Link to="/teachers">Profesori</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{`${data.lastName} ${data.firstName}`}</li>

                        </ol>
                    </nav>
                    <div className={styles.profile}>
                        <div className={styles.profile__content}>
                            <div className={styles.content}>
                                <div className={styles.content__header}>

                                    <h1 className={styles.content__name}>{`${data.lastName} ${data.firstName}`}</h1>
                                    <Link to="edit" className={styles.content__edit}>
                                        <AiOutlineEdit className={styles.content__edit} />
                                    </Link>
                                </div>
                                <p className={styles.content__role}>{data.title.map((role) => {
                                    return (
                                        <span>{role}.</span>
                                    )
                                })}
                                </p>
                                <p className={styles.content__description}>{data.description}</p>

                            </div>
                            <div className={styles.contacts}>
                                <div className={styles.contacts__mail}>
                                    <AiOutlineMail />

                                    <a href={`mailto: ${data.email}`}>
                                        {data.email}</a>
                                </div>
                                <div className={styles.contacts__phone}>
                                    <BsTelephone />{data.phone}

                                </div>
                            </div>
                        </div>
                        <div className={styles.profile__photo}>
                            <img

                                src={data.photo ? data.photo : "/src/assets/images/default-user.png"}
                                alt={`${data.lastName} photo`}

                            />
                        </div>
                    </div>

                    <CompartmentName name="Cursuri"></CompartmentName>
                    <swiper-container
                        ref={swiperElRef}
                        init="false"
                        className={styles.swiper_container}
                    >
                        {data.courses.map((course) => (
                            <swiper-slide key={course.id} class={styles.swiper}>
                                <div className={`card ${styles.card}`}>
                                    <img
                                        src={course.image}
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    <div
                                        className={`card-body ${styles.card__body}`}
                                    >
                                        <h5
                                            className={`card-title ${styles.card__title}`}
                                        >
                                            {course.name}
                                        </h5>
                                        <p
                                            className={`card-text ${styles.card__text}`}
                                        >
                                            {course.cicle}
                                        </p>
                                    </div>
                                    <div className={styles.overlay}>
                                        <h5 className={styles.overlay__name}>
                                            {course.name}
                                        </h5>
                                        <div className={styles.overlay__text}>
                                            <p
                                                className={
                                                    styles.overlay__description
                                                }
                                            >
                                                {course.description}
                                            </p>
                                        </div>
                                        <a
                                            href="#"
                                            className={`btn btn-primary ${styles.overlay__button}`}
                                        >
                                            Acceseaza cursul
                                        </a>
                                    </div>
                                </div>
                            </swiper-slide>
                        ))}
                    </swiper-container>
                    <CompartmentName name="Biografie"></CompartmentName>
                </div>
            </div>

            {/* <div className={styles.container} >
                <header className={styles.header}>
                    {teacherDetail.picture ? (
                        <div>
                            <img
                                src={teacherDetail.picture}
                                alt={`${teacherDetail.name} photo`}
                            />
                        </div>
                    ) : (
                        <div className={styles["header__NoImage"]}></div>
                    )}

                    <div className={styles["header__info"]}>
                        <h1>{teacherDetail.name}</h1>
                        <p>{teacherDetail.role}</p>
                        <p className={styles["header__description"]}>
                            {teacherDetail.description}
                        </p>
                    </div>
                </header>
                <div className={styles["contacts__line"]}> </div>
                <div className={styles["contacts"]}>
                    <div className={styles["contacts__email"]}>
                        {teacherDetail.socials.email}
                    </div>
                    <div className={styles["contacts__socials"]}>
                        <a href="">
                            <BsFacebook className={styles["contacts__item"]} />
                        </a>
                        <a href="">
                            <SlSocialVkontakte
                                className={styles["contacts__item"]}
                            />
                        </a>
                        <a href="">
                            <BsInstagram className={styles["contacts__item"]} />
                        </a>
                    </div>
                </div>

                <CompartmentName name="Cursuri"></CompartmentName>

                <div className={styles["courses"]}>
                    <div className={styles["courses__card"]}>
                        {teacherDetail.courses[0].image ? (
                            <img src="" alt="" />
                        ) : (
                            <div className={styles["courses__NoPhoto"]}></div>
                        )}

                        <h3>{teacherDetail.courses[0].name}</h3>
                        <Link className={styles["courses__link"]}>Read it</Link>
                    </div>
                    <div className={styles["courses__card"]}>
                        {teacherDetail.courses[0].image ? (
                            <img src="" alt="" />
                        ) : (
                            <div className={styles["courses__NoPhoto"]}></div>
                        )}

                        <h3>{teacherDetail.courses[0].name}</h3>
                        <Link className={styles["courses__link"]}>Read it</Link>
                    </div>
                    <div className={styles["courses__card"]}>
                        {teacherDetail.courses[0].image ? (
                            <img src="" alt="" />
                        ) : (
                            <div className={styles["courses__NoPhoto"]}></div>
                        )}

                        <h3>{teacherDetail.courses[0].name}</h3>
                        <Link className={styles["courses__link"]}>Read it</Link>
                    </div>
                </div>

                <CompartmentName name="Date biografice"></CompartmentName>

                <div className={styles["bio"]}>
                    {Object.keys(teacherDetail.bios)
                        .reverse()
                        .map((year) => (
                            <>
                                <p>{year}</p>
                                <ul>
                                    {teacherDetail.bios[year].map((entry) => (
                                        <li key={entry}>{colorBlue(entry)}</li>
                                    ))}
                                </ul>
                            </>
                        ))}
                </div>

                <CompartmentName name="Carți"></CompartmentName>
                <div className={styles.book}>
                    {teacherDetail.books[0].image ? (
                        <img src="" alt="" />
                    ) : (
                        <div className={styles["book--NoPhoto"]}></div>
                    )}
                    <div className={styles["book__info"]}>
                        <h2>{teacherDetail.books[0].name}</h2>
                        <p>{teacherDetail.books[0].description}</p>
                        <a>Read It</a>
                    </div>
                </div>

                <div className={styles.others}>
                    <div className={styles["others__posts"]}>
                        <h2>Ultimile Postari</h2>
                        <div className={styles["others__post"]}>
                            <h3>LOREM IPSUM</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the.Lorem
                                Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the.
                            </p>
                            <p>27.05.2023</p>
                        </div>
                        <div className={styles["others__post"]}>
                            <h3>LOREM IPSUM</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the.Lorem
                                Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the.
                            </p>
                            <p>27.05.2023</p>
                        </div>
                        <div className={styles["others__post"]}>
                            <h3>LOREM IPSUM</h3>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the.Lorem
                                Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the.
                            </p>
                            <p>27.05.2023</p>
                        </div>
                    </div>

                    <div className={styles["others__facebook"]}>
                        <h2>Postari de la {teacherDetail.name} </h2>
                        <iframe
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FeUSMinformatica&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
                            width="500"
                            height="400"
                            style={{ border: "none", overflow: "hidden" }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen="true"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        ></iframe>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default TeacherDetail;