import styles from "./TeacherEdit.module.scss";
import { Link } from "react-router-dom";

import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import HeaderImage from "@components/HeaderImage/HeaderImage"
import CompartmentName from "@components/CompartmentName/CompartmentName"

const TeacherEdit = (props) => {
    return (
        <>
            <HeaderImage headerImage="/src/assets/images/courses-banner.jpeg" />
            <div className={styles.teacher}>
                <div className={styles.container}>

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item "><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item " ><Link to="/teachers">Profesori</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">nume</li>
                        </ol>
                    </nav>

                    <div className={styles.profile}>
                        <div className={styles.profile__content}>
                            <input type="text" name="Name" placeholder="Nume" />
                            <input type="text" name="Name" placeholder="Functie" />
                            <textarea name="Description" rows="6">Descriere</textarea>
                            <div className={styles.contacts}>
                                <div className={styles.contacts__mail}>
                                    <AiOutlineMail />
                                    <input type="email" name="Email" placeholder="Email" />
                                </div>
                                <div className={styles.contacts__phone}>
                                    <BsTelephone />
                                    <input type="tel" name="Phone" placeholder="Phone" />
                                </div>
                            </div>
                            <button className={styles.button}>Salvează</button>
                        </div>
                        <div className={styles.profile__photo}>
                            <img
                                src={"/src/assets/images/default-user.png"}
                                alt="Photo"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherEdit;