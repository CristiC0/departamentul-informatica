import styles from "./Courses.module.scss";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import HeaderImage from "@components/HeaderImage/HeaderImage";
import PageHeader from "@components/PageHeader/PageHeader";
import SearchBar from "../../components/SearchBar/SearchBar";

import usePagination from "@hooks/usePagination";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Courses() {

    const [data, setData] = useState(null);
    const { i18n } = useTranslation();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses`)
            .then((response) => {
                setData(response.data);
            });
    }, [])

    const {
        nrOfPages,
        displayedPages,
        itemsOnPage,
        changePageNumber,
        currentPage,
        nextPage,
        previousPage,
    } = usePagination(data, 6);

    if (data === null) return <Spinner animation="border" />

    return (
        <>
            <HeaderImage headerImage="/src/assets/images/courses-banner.jpeg" />
            <PageHeader
                title="Cursuri"
                introduction="Suntem încântați să vă prezentăm o varietate de cursuri captivante și provocatoare, care vizează să vă dezvolte competențele și să vă pregătească pentru o carieră în lumea fascinantă a informaticii.
                Departamentul nostru se remarcă prin programele academice riguroase și actualizate, concepute pentru a vă oferi o bază solidă în principiile fundamentale ale informaticii. Indiferent dacă sunteți nou în domeniu sau aveți deja o experiență în programare, cursurile noastre vă vor oferi cunoștințe și abilități esențiale pentru a deveni profesioniști în informatică."
            />
            <div className={styles.courses}>
                <SearchBar text="Caută curs..." />
                <div className={styles.container}>
                    <div className={styles.content}>
                        <Row xs={1} md={3} className="g-4">
                            {Array.from(itemsOnPage).map((course) => (
                                <Col key={data.id}>

                                    <Card className={styles.card}>
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
                                                to={course.id}
                                                className={`btn btn-primary ${styles.overlay__button}`}
                                            >
                                                Acceseaza
                                            </Link>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <div className={styles.navigation}>
                        <SlArrowLeft
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
                        <SlArrowRight
                            className={styles["navigation__arrow"]}
                            onClick={nextPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
