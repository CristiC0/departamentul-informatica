import styles from "./Teachers.module.scss";
import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import usePagination from "@hooks/usePagination";
import HeaderImage from "@components/HeaderImage/HeaderImage";
import PageHeader from "@components/PageHeader/PageHeader";
import TeacherCard from "./components/TeacherCard/TeacherCard";
import { useTranslation } from "react-i18next";

const Teachers = () => {
    const [data, setData] = useState({ management: null, teachers: null });

    const { t } = useTranslation();
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
    } = usePagination(data.teachers, 4);

    return (
        <div>
            <HeaderImage headerImage="/src/assets/images/courses-banner.jpeg" />
            <PageHeader
                title={`${t("teachers__title")}`}
                introduction={`${t("teachers__intro")}`}
            />
            <div className={styles.teacher}>
                <div className={styles["teacher__container"]}>
                    <div className={styles["teacher__row"]}>
                        {data.management ? (
                            data.management.map((teacher) => {
                                return (
                                    <div
                                        key={teacher.id}
                                        className={styles["teacher__cols--1"]}
                                    >
                                        <TeacherCard
                                            id={teacher.id}
                                            photo={
                                                teacher.photo
                                                    ? teacher.photo
                                                    : "/src/assets/images/default-user.png"
                                            }
                                            name={`${teacher.lastName} ${teacher.firstName}`}
                                            function={teacher.title}
                                        ></TeacherCard>
                                    </div>
                                );
                            })
                        ) : (
                            <Spinner />
                        )}
                    </div>
                </div>

                <div className={styles["teacher__container"]}>
                    <div className={styles["teacher__row"]}>
                        {itemsOnPage ? (
                            itemsOnPage.map((teacher) => {
                                return (
                                    <div
                                        key={teacher.id}
                                        className={styles["teacher__cols--2"]}
                                    >
                                        <TeacherCard
                                            id={teacher.id}
                                            photo={
                                                teacher.photo
                                                    ? teacher.photo
                                                    : "/src/assets/images/default-user.png"
                                            }
                                            name={`${teacher.lastName} ${teacher.firstName}`}
                                            function={teacher.title}
                                        ></TeacherCard>
                                    </div>
                                );
                            })
                        ) : (
                            <Spinner />
                        )}
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

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border m-5" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};
