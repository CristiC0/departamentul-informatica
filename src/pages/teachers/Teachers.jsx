import { Link } from "react-router-dom";
import { HiArrowSmRight } from "react-icons/hi";
import { HiArrowSmLeft } from "react-icons/hi";
import styles from "./Teachers.module.scss";
import usePagination from "@hooks/usePagination";
import CompartmentName from "@components/CompartmentName/CompartmentName"
import HeaderImage from "@components/HeaderImage/HeaderImage"


const defaultUserImage = <div className={styles["list__card--noPhoto"]}></div>;

const teachers = [
    { id: 1, name: "John Doe", function: "conferențiar universitar", photo: null, lead: true },
    { id: 2, name: "John Doe", function: "conferențiar universitar", photo: null, lead: true },
    { id: 3, name: "John Doe", function: "conferențiar universitar", photo: null, lead: true },
    { id: 4, name: "John Doe", function: "conferențiar universitar", photo: null, lead: true },
    { id: 5, name: "John Doe", function: "conferențiar universitar", photo: null, lead: false },
    { id: 6, name: "John Doe", function: "conferențiar universitar", photo: null, lead: false },
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
    const {
        nrOfPages,
        displayedPages,
        itemsOnPage,
        changePageNumber,
        currentPage,
        nextPage,
        previousPage,
    } = usePagination(teachers, 6);

    return (
        <div className={styles.container}>
            <HeaderImage headerImage ="/src/assets/images/courses-banner.jpeg"></HeaderImage>
            <CompartmentName name="Conducere"></CompartmentName>
            <div className={styles.lead}>
                {itemsOnPage.map((teacher) => {
                    if (teacher?.lead === true) {
                        return (
                            <div key={teacher.id} className={styles["lead__card"]}>
                                {teacher.photo ? (
                                    <img
                                        src={teacher.photo}
                                        alt={`${teacher.name} photo`}
                                    />
                                ) : (
                                    defaultUserImage
                                )}
                                <h3><Link to={`${teacher.name}`}>{teacher.name}</Link></h3>
                                <h4>
                                    {teacher.function}
                                </h4>
                            </div>
                        )
                    }
                })}
            </div>

            <CompartmentName name="Cadre didactice"></CompartmentName>
            <div className={styles.list}>
                {itemsOnPage.map((teacher) => (
                    <div key={teacher.id} className={styles["list__card"]}>
                        {teacher.photo ? (
                            <img
                                src={teacher.photo}
                                alt={`${teacher.name} photo`}
                            />
                        ) : (
                            defaultUserImage
                        )}
                        <h3><Link to={`${teacher.name}`}>{teacher.name}</Link></h3>
                        <h4>
                            {teacher.function}
                        </h4>
                    </div>
                ))}
            </div>

            <div className={styles.navigation}>
                <HiArrowSmLeft
                    className={styles["navigation__arrow"]}
                    onClick={previousPage}
                />
                {displayedPages.map((page) => (
                    <div
                        className={`${styles["navigation__page"]} ${currentPage === page
                            ? styles["navigation__page--current"]
                            : ""
                            }`}
                        key={page}
                        onClick={() => changePageNumber(page)}
                    >
                        {page}
                    </div>
                ))}
                <HiArrowSmRight
                    className={styles["navigation__arrow"]}
                    onClick={nextPage}
                />
            </div>
        </div>
    );
};

export default Teachers;
