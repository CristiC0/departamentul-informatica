import styles from "./TeacherEdit.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import HeaderImage from "@components/HeaderImage/HeaderImage";

const TeacherEdit = (props) => {

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        photo: '',
        title: '',
        description: '',
        biografy: '',
        email: '',
        phone: '',
    });

    const [image, setImage] = useState("Upload image");

    const teacherId = window.location.href.split('/')[5];

    useEffect(() => {
        // fetch(`${import.meta.env.VITE_API_BASE_URL}/teachers/${teacherId}`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setData(data)
        //     });

        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/teachers/${teacherId}`)
            .then((response) => {
                const {
                    firstName,
                    lastName,
                    photo,
                    title,
                    description,
                    biografy,
                    email,
                    phone } = response.data;

                setData({
                    firstName,
                    lastName,
                    photo,
                    title,
                    description,
                    biografy,
                    email,
                    phone
                });
            })

    }, [])

    const handleInput = (event) => {
        setData((oldData) => ({ ...oldData, [event.target.name]: event.target.value }))
    }

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
        console.log(formData)
    };

    const onValueChange = (event) => {
        setData((oldData) => ({ ...oldData, title: [event.target.value] }))
        console.log(data)
        console.log(event.target.checked)
    }


    function handleSubmit(event) {
        event.preventDefault();
        axios.patch(`${import.meta.env.VITE_API_BASE_URL}/teachers/${teacherId}`, { ...data }, { withCredentials: true }).then(({ statusText }) => {
            if (statusText === "OK")
                axios
                    .get(`${import.meta.env.VITE_API_BASE_URL}/teachers/${teacherId}`)
                    .then((response) => {
                        setData(response.data);
                    })
        })
            .catch(error => console.log(error));

    }

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

                            <div className={styles.name}>
                                <div className={styles.lastname}>
                                    <label htmlFor="lastName">Nume:</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder={data.lastName}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className={styles.firstname}>
                                    <label htmlFor="firstName">Prenume:</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder={data.firstName}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>

                            <div className={styles.function}>
                                <label className={styles.function__label}>Funcție:</label>
                                <div className={styles["function--primary"]}>
                                    <input
                                        type="checkbox"
                                        id="doctor"
                                        name="title"
                                        value="Doctor"
                                        checked={data.title.includes("Doctor")}
                                        onChange={onValueChange}
                                    />
                                    <label htmlFor="doctor">Doctor</label><br></br>
                                </div>

                                <div className={styles["function--secondary"]}>
                                    <input
                                        type="radio"
                                        id="prof"
                                        name="title"
                                        value="Profesor universitar"
                                        checked={data.title.includes("Profesor universitar")}
                                        onChange={onValueChange}
                                    />
                                    <label htmlFor="prof">Profesor universitar</label><br></br>

                                    <input
                                        type="radio"
                                        id="lect"
                                        name="title"
                                        value="Lector universitar"
                                        checked={data.title.includes("Lector universitar")}
                                        onChange={onValueChange}
                                    />
                                    <label htmlFor="lect">Lector universitar</label><br></br>

                                    <input
                                        type="radio"
                                        id="conf"
                                        name="title"
                                        value="Conferențiar universitar"
                                        checked={data.title.includes("Conferențiar universitar")}
                                        onChange={onValueChange}
                                    />
                                    <label htmlFor="conf">Conferențiar universitar</label><br></br>
                                </div>
                            </div>

                            <div className={styles.description}>
                                <label htmlFor="description">Descriere:</label>
                                <textarea
                                    name="description"
                                    rows="6"
                                    placeholder={data.description}
                                    onChange={handleInput}>
                                </textarea>
                            </div>

                            <div className={styles.contacts}>

                                <div className={styles["contacts__container"]}>
                                    <div className={styles["contacts--col1"]} >
                                        <AiOutlineMail />
                                        <label htmlFor="email">Email:</label>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={data.email}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div className={styles["contacts__container"]}>
                                    <div className={styles["contacts--col1"]} >
                                        <BsTelephone />
                                        <label htmlFor="phone">Telefon:</label>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder={data.phone}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>


                            <button className={styles.button} onClick={handleSubmit}>Salvează</button>
                        </div>


                        <div className={styles.profile__photo}>

                            <img
                                src={data.photo ? data.photo : "/src/assets/images/default-user.png"}
                                alt="Photo"
                            />
                            <span>Încărcați fotografia</span>
                            <div className={styles.upload}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={imageChangeHandler}
                                />
                            </div>

                        </div>

                    </div>
                </div>
            </div >
        </>
    );
}

export default TeacherEdit;