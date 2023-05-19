import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { SlSocialVkontakte } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import CompartmentName from "@components/CompartmentName/CompartmentName"
import HeaderImage from "@components/HeaderImage/HeaderImage"

import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

import styles from "./TeacherDetail.module.scss";
const teacherDetail = {
    name: "John Doe",
    role: "Șef departament Informatică, dr., conf. univ.",
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque doloribus qui eos praesentium delectus hic molestias illo amet id sed, non, et earum autem ut quae voluptatem quasi recusandae impedit! Lorem ipsum dolor sit amet, consectetur adipisicing",
    picture: null,
    socials: {
        email: "johndoe@gmail.com",
        phone: "060123456",
        facebook: "www.facebook.com",
        instagram: "www.instagram.com",
        vk: "https://vk.com/",
    },

    courses: [
        {
            id: 1,
            image: "/src/assets/images/temp1.png",
            name: "Criptografie și Securitatea Informației",
            cicle: "Licenta I",
            description: "Commodo esse consequat ad laboris dolore labore sunt ipsum enim commodo. Elit officia magna do irure esse commodo tempor proident do cillum aliquip ex ut. Proident non ea eu eiusmod ullamco sunt labore adipisicing minim ea ex non id. Anim minim proident tempor nisi esse eu proident incididunt ipsum non. Laborum ut quis cupidatat ullamco.",
            link: null,
        },
        {
            id: 2,
            image: "/src/assets/images/temp1.png",
            name: "Criptografie și Securitatea Informației",
            description: "Commodo esse consequat ad laboris dolore labore sunt ipsum enim commodo. Elit officia magna do irure esse commodo tempor proident do cillum aliquip ex ut. Proident non ea eu eiusmod ullamco sunt labore adipisicing minim ea ex non id. Anim minim proident tempor nisi esse eu proident incididunt ipsum non. Laborum ut quis cupidatat ullamco.",
            cicle: "Licenta I",
            link: null,
        },
        {
            id: 3,
            image: "/src/assets/images/temp1.png",
            name: "Criptografie și Securitatea Informației",
            cicle: "Master II",
            link: null,
        },
        {
            id: 4,
            image: "/src/assets/images/temp1.png",
            name: "Criptografie și Securitatea Informației",
            cicle: "Licenta I",
            link: null,
        },
    ],
    bios: {
        2023: ["Conferențiar universitar, departamentul Informatică"],
        2022: ["Conferențiar universitar, departamentul Matematici Aplicate"],
        2021: [
            "Șef al departamentului de Informatică, Facultatea de Matematică ",
        ],
        2010: [" Prodecan, al facultății de Matematică și Informatică"],
        2004: ["Atestat, de conferențiar universitar"],
        2002: [
            "Vice-director, al Centrului de Bacalaureat de la Universitatea de Stat din ",
        ],
    },
    books: [
        {
            name: "Book Name",
            image: null,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita accusantium dicta nisi velit recusandae aspernatur natus magnam, aliquid nemo aperiam?Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
        },
    ],
};

const colorBlue = (text) => {
    const parts = text.split(",");
    return (
        <>
            <span className={styles["colorBlue"]}>{parts[0]}</span>,{parts[1]}
        </>
    );
};

register();

const TeacherDetail = (props) => {

    const swiperElRef = useRef(null);

    useEffect(() => {
        const swiperParams = {
            modules: { Navigation, Pagination, Autoplay },
            slidesPerView: coursesPerView,
            spaceBetween: 20,
            breakpoints: {
                992: {
                    slidesPerView: coursesPerView,
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

    const numberOfCourses = teacherDetail.courses.length;
    let coursesPerView = 0;
    if (numberOfCourses <= 1) {
        coursesPerView = 1;
    } else if (numberOfCourses === 2) {
        coursesPerView = 2;
    }
    else {
        coursesPerView = 3
    }


    return (
        <>
            <HeaderImage headerImage="/src/assets/images/courses-banner.jpeg" />
            <div className={styles.teacher}>
                <div className={styles.container}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item "><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item " ><Link to="/teachers">Profesori</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{teacherDetail.name}</li>
                        </ol>
                    </nav>
                    <div className={styles.profile}>

                        <div className={styles.profile__content}>
                            <div className={styles.content}>
                                <div className={styles.content__header}>
                                    <h1 className={styles.content__name}>{teacherDetail.name}</h1>
                                        <Link to="edit" className={styles.content__edit}>
                                            <AiOutlineEdit className={styles.content__edit}/>
                                        </Link>
                                </div>
                                <p className={styles.content__role}>{teacherDetail.role}</p>
                                <p className={styles.content__description}>{teacherDetail.description}</p>
                            </div>
                            <div className={styles.contacts}>
                                <div className={styles.contacts__mail}>
                                    <AiOutlineMail />
                                    <a href={`mailto: ${teacherDetail.socials.email}`}>
                                        {teacherDetail.socials.email}</a>
                                </div>
                                <div className={styles.contacts__phone}>
                                    <BsTelephone />{teacherDetail.socials.phone}
                                </div>
                            </div>
                        </div>
                        <div className={styles.profile__photo}>
                            <img
                                src={teacherDetail.picture ? teacherDetail.picture : "/src/assets/images/default-user.png"}
                                alt={`${teacherDetail.name} photo`}
                            />
                        </div>
                    </div>

                    <CompartmentName name="Cursuri"></CompartmentName>
                    <swiper-container
                        ref={swiperElRef}
                        init="false"
                        className={styles.swiper_container}
                    >
                        {teacherDetail.courses.map((course) => (
                            <swiper-slide key={course.id} class={styles.swiper}>
                                <div className={`card ${styles.card}`}>
                                    <img src={course.image} className="card-img-top" alt="..." />
                                    <div className={`card-body ${styles.card__body}`}>
                                        <h5 className={`card-title ${styles.card__title}`}>{course.name}</h5>
                                        <p className={`card-text ${styles.card__text}`}>{course.cicle}</p>
                                    </div>
                                    <div className={styles.overlay}>
                                        <h5 className={styles.overlay__name}>{course.name}</h5>
                                        <div className={styles.overlay__text}>
                                            <p className={styles.overlay__description}>{course.description}</p>
                                        </div>
                                        <a href="#" className={`btn btn-primary ${styles.overlay__button}`}>Acceseaza cursul</a>
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

const Header = ({ title }) => {
    return <div className={styles.Header}>{title}</div>;
};
export default TeacherDetail;
