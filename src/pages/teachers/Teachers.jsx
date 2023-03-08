import { useState } from "react";
import Input from "@components/Input/Input.jsx";
import { AiOutlineSearch } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import styles from "./Teachers.module.scss";
import usePagination from "@hooks/usePagination";

const selectMenuOptions = [
    { title: "Profesori", value: "" },
    { title: "Studenti", value: "" },
    { title: "Cursuri", value: "" },
];

const defaultUserImage = <div className={styles["list__card--noPhoto"]}></div>;

const teachers = [
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
    const [selected, setSelected] = useState(0);

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
        <>
            <div className={styles.header}>
                <div className={styles["header__select"]}>
                    {selectMenuOptions.map((option, index) => (
                        <span
                            className={
                                index === selected
                                    ? styles["header__select--active"]
                                    : ""
                            }
                            onClick={() => setSelected(index)}
                            key={option.title}
                        >
                            {option.title}
                        </span>
                    ))}
                </div>
                <div className={styles["header__search"]}>
                    <Input
                        type="text"
                        icon={<AiOutlineSearch />}
                        className={styles["search__input"]}
                    />
                    <VscSettings className={styles["search__filter"]} />
                </div>
            </div>
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
                        <h3>{teacher.name}</h3>
                        <h4>Profile</h4>
                    </div>
                ))}
            </div>
            <div className={styles.navigation}>
                <BsFillArrowLeftCircleFill
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
                <BsFillArrowRightCircleFill
                    className={styles["navigation__arrow"]}
                    onClick={nextPage}
                />
            </div>
        </>
    );
};

export default Teachers;
