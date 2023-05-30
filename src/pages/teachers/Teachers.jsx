import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import styles from "./Teachers.module.scss";
import usePagination from "@hooks/usePagination";
import HeaderImage from "@components/HeaderImage/HeaderImage";
import PageHeader from "@components/PageHeader/PageHeader";
import TeacherCard from "./components/TeacherCard/TeacherCard";

const teachers = [
    {
        id: 1,
        name: "John Doe",
        function: "conferențiar universitar",
        photo: null,
        teacher: true,
    },
    {
        id: 2,
        name: "John Doe",
        function: "conferențiar universitar",
        photo: null,
        teacher: true,
    },
    {
        id: 3,
        name: "John Doe",
        function: "conferențiar universitar",
        photo: null,
        teacher: true,
    },
    {
        id: 4,
        name: "John Doe",
        function: "conferențiar universitar",
        photo: null,
        teacher: false,
    },
    {
        id: 5,
        name: "John Doe",
        function: "conferențiar universitar",
        photo: null,
        teacher: false,
    },
    {
        id: 6,
        name: "John Doe",
        function: "conferențiar universitar",
        photo: null,
        teacher: false,
    },
    {
        id: 7,
        name: "John Doe",
        function: "conferențiar universitar",
        photo: null,
        teacher: false,
    },
    {
        id: 8,
        name: "John Doe",
        function: "conferențiar universitar",
        photo: null,
        teacher: false,
    },
    { id: 9, name: "John Doe", photo: null },
    { id: 1, name: "John Doe", photo: null },
    { id: 2, name: "John Doe", photo: null },
    { id: 3, name: "John Doe", photo: null },
    { id: 4, name: "John Doe", photo: null },
    { id: 5, name: "John Doe", photo: null },
    { id: 6, name: "John Doe", photo: null },
    { id: 7, name: "John Doe", photo: null },
    { id: 8, name: "John Doe", photo: null },
    { id: 9, name: "John Doe", photo: null },
    { id: 1, name: "John Doe", photo: null },
    { id: 2, name: "John Doe", photo: null },
    { id: 3, name: "John Doe", photo: null },
    { id: 4, name: "John Doe", photo: null },
    { id: 5, name: "John Doe", photo: null },
    { id: 6, name: "John Doe", photo: null },
    { id: 7, name: "John Doe", photo: null },
    { id: 8, name: "John Doe", photo: null },
    { id: 9, name: "John Doe", photo: null },
    { id: 1, name: "John Doe", photo: null },
    { id: 2, name: "John Doe", photo: null },
    { id: 3, name: "John Doe", photo: null },
    { id: 4, name: "John Doe", photo: null },
    { id: 5, name: "John Doe", photo: null },
    { id: 6, name: "John Doe", photo: null },
    { id: 7, name: "John Doe", photo: null },
    { id: 8, name: "John Doe", photo: null },
    { id: 9, name: "John Doe", photo: null },
    { id: 1, name: "John Doe", photo: null },
    { id: 2, name: "John Doe", photo: null },
    { id: 3, name: "John Doe", photo: null },
    { id: 4, name: "John Doe", photo: null },
    { id: 5, name: "John Doe", photo: null },
    { id: 6, name: "John Doe", photo: null },
    { id: 7, name: "John Doe", photo: null },
    { id: 8, name: "John Doe", photo: null },
    { id: 9, name: "John Doe", photo: null },
    { id: 1, name: "John Doe", photo: null },
    { id: 2, name: "John Doe", photo: null },
    { id: 3, name: "John Doe", photo: null },
    { id: 4, name: "John Doe", photo: null },
    { id: 5, name: "John Doe", photo: null },
    { id: 6, name: "John Doe", photo: null },
];

const Teachers = () => {
    const [data, setData] = useState({ management: null, teachers: null });

    useEffect(() => {
        const managementRequest = fetch(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/teachers/filter?management=true`
        );
        const teachersRequest = fetch(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/teachers/filter?management=false`
        );
        Promise.allSettled([managementRequest, teachersRequest])
            .then((responses) =>
                Promise.allSettled([
                    responses[0].value.json(),
                    responses[1].value.json(),
                ])
            )
            .then((data) => {
                setData({ management: data[0].value, teachers: data[1].value });
            });
    }, []);

    const {
        nrOfPages,
        displayedPages,
        itemsOnPage,
        changePageNumber,
        currentPage,
        nextPage,
        previousPage,
    } = usePagination(data.teachers, 8);

    if (itemsOnPage === null) return <>Loading..</>;

    return (
        <div>
            <HeaderImage headerImage="/src/assets/images/courses-banner.jpeg" />
            <PageHeader
                title="Profesori"
                introduction="Voluptate ut do aliquip incididunt nisi aute qui eu aliqua nulla. Fugiat qui sint fugiat irure nulla pariatur ex ad nulla. Proident pariatur veniam elit ut excepteur duis cillum labore enim labore incididunt dolore. Laboris elit duis et pariatur. Velit tempor et voluptate incididunt duis ipsum reprehenderit incididunt sit labore proident aliquip. Adipisicing labore cillum duis ea non id ex pariatur."
            />
            <div className={styles.teacher}>
                <div className={styles["teacher__container"]}>
                    <div className={styles["teacher__row"]}>
                        {itemsOnPage.map((teacher) => {
                            if (teacher?.teacher === true) {
                                return (
                                    <div
                                        key={teacher.id}
                                        className={styles["teacher__cols--1"]}
                                    >
                                        <TeacherCard
                                            photo={
                                                teacher.photo
                                                    ? data.photo
                                                    : "/src/assets/images/default-user.png"
                                            }
                                            name={`${teacher.lastname}" "${teacher.firstName}`}
                                            function={teacher.title}
                                        ></TeacherCard>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>

                <div className={styles["teacher__container"]}>
                    <div className={styles["teacher__row"]}>
                        {itemsOnPage.map((teacher) => {
                            return (
                                <div
                                    key={teacher.id}
                                    className={styles["teacher__cols--2"]}
                                >
                                    <TeacherCard
                                        photo={
                                            teacher.photo
                                                ? teacher.photo
                                                : "/src/assets/images/default-user.png"
                                        }
                                        name={`${teacher.lastname}" "${teacher.firstName}`}
                                        function={teacher.title}
                                    ></TeacherCard>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.navigation}>
                    <SlArrowLeft
                        className={styles["navigation__arrow"]}
                        onClick={previousPage}
                    />
                    {displayedPages.map((page) => (
                        <div
                            className={`${styles["navigation__page"]} ${
                                currentPage === page
                                    ? styles["navigation__page--current"]
                                    : ""
                            }`}
                            key={page}
                            onClick={() => changePageNumber(page)}
                        >
                            {page}
                        </div>
                    ))}
                    <SlArrowRight
                        className={styles["navigation__arrow"]}
                        onClick={nextPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Teachers;
