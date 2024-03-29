import styles from "./TeacherEdit.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import HeaderImage from "@components/HeaderImage/HeaderImage";
import { useFormik } from "formik";
import { teacherSchema } from "@/schemas/teacherSchema";
import { useTranslation } from "react-i18next";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { Toast } from "react-bootstrap";

const TeacherEdit = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        photo: "",
        title: "",
        description: "",
        biografy: "",
        email: "",
        courses: [],
        phone: "",
    });

    const { i18n, t } = useTranslation();
    const [courses, setCourses] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState("Upload image");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/teachers/${id}`)
            .then((response) => {
                const {
                    firstName,
                    lastName,
                    photo,
                    title,
                    description,
                    biografy,
                    email,
                    phone,
                    courses,
                } = response.data;

                setData({
                    firstName,
                    lastName,
                    photo,
                    title,
                    description,
                    biografy,
                    email,
                    phone,
                    courses,
                });

                const coursesId = courses.map((course) => course.id);
                setSelectedCourses(coursesId);

                values.firstName = firstName;
                values.lastName = lastName;
                values.email = email;
                values.phone = phone;
            });

        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/courses`)
            .then((response) =>
                setCourses(response.data)
            );
    }, []);

    const handleInput = (event) => {
        setData((oldData) => ({
            ...oldData,
            [event.target.name]: event.target.value,
        }));
    };

    const imageChangeHandler = (event) => {
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        axios
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/upload/image/teachers`,
                formData
            )
            .then(({ data }) => {
                setImage(event.target.files[0].name);
                setData((oldData) => ({
                    ...oldData,
                    photo: data.imagePath,
                }));
            })
            .catch((error) => console.error(error));
    };

    const onValueChange = (event) => {
        setData((oldData) => {
            const title =
                oldData.title?.[0] === "Doctor"
                    ? [oldData.title?.[0], event.target.value]
                    : [event.target.value];
            return { ...oldData, title };
        });
    };

    const onCheckboxChange = (event) => {
        setData((oldData) => {
            const title = event.target.checked
                ? [event.target.value, ...oldData.title]
                : oldData.title.shift();
            return { ...oldData, title };
        });
    };

    const onValueChecked = (event, courseId) => {
        setSelectedCourses((oldData) => {
            const courses = event.target.checked
                ? [event.target.value, ...oldData]
                : [...oldData.filter((course) => course !== courseId)];
            return courses;
        });
    };


    function onSubmit(event) {
        event.preventDefault();
        axios
            .patch(
                `${import.meta.env.VITE_API_BASE_URL}/teachers/${id}`,
                { ...data, courses: selectedCourses },
                { withCredentials: true }
            )
            .then(({ statusText }) => {
                if (statusText === "OK")
                    axios
                        .get(
                            `${import.meta.env.VITE_API_BASE_URL
                            }/teachers/${id}`
                        )
                        .then((response) => {
                            setData(response.data);
                        });
            })
            .catch((error) => {
                setShowToast(true);
                setError(error?.response?.data?.message);
                setTimeout(() => {
                    setShowToast(false);
                    setError(null);
                }, 3000);
                actions.resetForm();
                return;
            });
            actions.resetForm();
        navigate(`/${i18n.language}/teachers/${id}`);
    }

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            lastName: data.lastName,
            firstName: data.firstName,
            email: data.email,
            phone: data.phone,
        },
        validationSchema: teacherSchema,
        onSubmit,
    });

    console.log("selectedCours", selectedCourses);

    if (data === null) return <>Loading...</>;

    return (
        <>
            <HeaderImage headerImage="/src/assets/images/courses-banner.jpeg" />
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
                            >
                                <Link to={`/${i18n.language}/teachers/${id}`}>
                                    {`${data.lastName} ${data.firstName}`}
                                </Link>
                            </li>
                        </ol>
                    </nav>

                    <div className={styles.profile}>
                        <div className={styles.profile__content}>
                            <div className={styles.name}>
                                <div className={styles.lastname}>
                                    <label htmlFor="lastName">
                                        {t("teacher__detail__name")}:
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={values.lastName}
                                        error={errors.lastName}
                                        touched={touched.lastName}
                                        onBlur={handleBlur}
                                        id="lastName"
                                        placeholder={data.lastName}
                                        onChange={(e) => {
                                            handleInput(e), handleChange(e);
                                        }}
                                    />
                                    {error && touched && (
                                        <p className={styles["message-error"]}>{error}</p>
                                    )}
                                </div>
                                <div className={styles.firstname}>
                                    <label htmlFor="firstName">
                                        {t("teacher__detail__lastname")}:
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        error={errors.firstName}
                                        touched={touched.firstName}
                                        onBlur={handleBlur}
                                        id="firstName"
                                        placeholder={data.firstName}
                                        onChange={(e) => {
                                            handleInput(e), handleChange(e);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={styles.function}>
                                <label className={styles.function__label}>
                                    {t("teacher__detail__function")}:
                                </label>
                                <div className={styles["function--primary"]}>
                                    <input
                                        type="checkbox"
                                        id="doctor"
                                        name="title1"
                                        value="Doctor"
                                        checked={data.title.includes("Doctor")}
                                        onChange={onCheckboxChange}
                                    />
                                    <label htmlFor="doctor">Doctor</label>
                                    <br></br>
                                </div>

                                <div className={styles["function--secondary"]}>
                                    <input
                                        type="radio"
                                        id="prof"
                                        name="title"
                                        value="Profesor universitar"
                                        checked={data.title.includes(
                                            "Profesor universitar"
                                        )}
                                        onChange={onValueChange}
                                    />
                                    <label htmlFor="prof">
                                        Profesor universitar
                                    </label>
                                    <br></br>

                                    <input
                                        type="radio"
                                        id="lect"
                                        name="title"
                                        value="Lector universitar"
                                        checked={data.title.includes(
                                            "Lector universitar"
                                        )}
                                        onChange={onValueChange}
                                    />
                                    <label htmlFor="lect">
                                        Lector universitar
                                    </label>
                                    <br></br>

                                    <input
                                        type="radio"
                                        id="conf"
                                        name="title"
                                        value="Conferențiar universitar"
                                        checked={data.title.includes(
                                            "Conferențiar universitar"
                                        )}
                                        onChange={onValueChange}
                                    />
                                    <label htmlFor="conf">
                                        Conferențiar universitar
                                    </label>
                                    <br></br>
                                </div>
                            </div>

                            <div className={styles.description}>
                                <label htmlFor="description">
                                    {t("teacher__detail__description")}:
                                </label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    value={data.description}
                                    onBlur={handleBlur}
                                    onChange={handleInput}
                                ></textarea>
                            </div>
                            <div className={styles.biography}>
                                <label htmlFor="description">Biografie:</label>
                                <textarea
                                    name="biografy"
                                    rows="6"
                                    value={data.biografy}
                                    onBlur={handleBlur}
                                    onChange={handleInput}
                                ></textarea>
                            </div>


                            <div className={styles.contacts}>
                                <div className={styles["contacts__container"]}>
                                    <div className={styles["contacts--col1"]}>
                                        <AiOutlineMail />
                                        <label htmlFor="email">Email:</label>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        error={errors.email}
                                        touched={touched.email}
                                        placeholder={data.email}
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleInput(e), handleChange(e);
                                        }}
                                    />
                                </div>

                                <div className={styles["contacts__container"]}>
                                    <div className={styles["contacts--col1"]}>
                                        <BsTelephone />
                                        <label htmlFor="phone">
                                            {t("teacher__detail__phone")}:
                                        </label>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={values.phone}
                                        error={errors.phone}
                                        touched={touched.phone}
                                        placeholder={data.phone}
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleInput(e), handleChange(e);
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Cursuri</Accordion.Header>
                                        <Accordion.Body>
                                            {courses ?
                                                <Form>
                                                    {courses.map((course) => (
                                                        <div key={course.id} className="mb-3">
                                                            <Form.Check
                                                                type={`checkbox`}
                                                                id={course.id}
                                                                label={course.name}
                                                                value={course.id}
                                                                onChange={(e) => {
                                                                    onValueChecked(e, course.id);
                                                                }}
                                                                checked={selectedCourses.includes(course.id)}
                                                            />
                                                        </div>
                                                    ))}
                                                </Form> : <>Loading...</>}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>


                            <button
                                type="submit"
                                className={styles.button}
                                onClick={onSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : t("teacher__detail__save")}
                            </button>
                        </div>

                        <div className={styles.profile__right}>
                            <div className={styles.profile__photo}>
                                <img
                                    src={
                                        data.photo
                                            ? data.photo
                                            : "/src/assets/images/default-user.png"
                                    }
                                    alt="Photo"
                                />
                                <span>{t("teacher__detail__photo")}</span>
                                <div className={styles.upload}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={imageChangeHandler}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={styles.button}
                                onClick={onSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Salvează"}
                            </button>
                            <Toast show={showToast} className={styles.toast}>
                                <Toast.Header>
                                    <strong className="me-auto"> Login Error </strong>
                                </Toast.Header>
                                <Toast.Body className="text-danger">{error}</Toast.Body>
                            </Toast>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherEdit;
