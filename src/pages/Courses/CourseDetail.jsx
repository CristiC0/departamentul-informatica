import styles from "./CourseDetail.module.scss";

import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import HeaderImage from "@components/HeaderImage/HeaderImage";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";


export default function CourseDetail() {

    const [data, setData] = useState(null);
    const { i18n } = useTranslation();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses/${id}`)
            .then((response) => {
                setData(response.data);
            });
    }, [])


    if (data === null) return <Spinner animation="border" />

    return (
        <>
            <HeaderImage headerImage="/src/assets/images/courses-banner.jpeg" />
            <div className={styles.courses}>
                <div className={styles.container}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item ">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item ">
                                <Link to={`/${i18n.language}/teachers`}>
                                    Cursuri
                                </Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                {data.name}
                            </li>
                        </ol>
                    </nav>
                    <div className={styles.content}>
                        <div className={styles.content__title}>
                            <h2>{`${data.name} (${data.acronym})`}</h2>
                        </div>
                        <div className={styles.content__body}>
                            <div className={styles.content__image}>
                                <img src={data.photo} />
                            </div>
                            <div className={styles.content__description}>
                                <p>{data.desciption}</p>
                            </div>
                        </div>
                        <div className={styles.content__content}>
                            <p>{data.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
