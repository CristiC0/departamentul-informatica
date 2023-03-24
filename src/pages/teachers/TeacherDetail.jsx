import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { SlSocialVkontakte } from "react-icons/sl";
import styles from "./TeacherDetail.module.scss";
const teacherDetail = {
    name: "John Doe",
    role: "Șef departament Informatică, dr., conf. univ.",
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque doloribus qui eos praesentium delectus hic molestias illo amet id sed, non, et earum autem ut quae voluptatem quasi recusandae impedit! Lorem ipsum dolor sit amet, consectetur adipisicing",
    picture: null,
    socials: {
        email: "johndoe@gmail.com",
        facebook: "www.facebook.com",
        instagram: "www.instagram.com",
        vk: "https://vk.com/",
    },

    courses: [
        {
            image: null,
            name: "Criptografie și Securitatea Informației",
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

const TeacherDetail = () => {
    return (
        <div>
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

            <Header title="Cursuri" />

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

            <Header title="Date Biografice" />

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

            <Header title="Carti" />
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
        </div>
    );
};

const Header = ({ title }) => {
    return <div className={styles.Header}>{title}</div>;
};
export default TeacherDetail;
