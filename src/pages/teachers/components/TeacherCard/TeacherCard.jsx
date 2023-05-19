import styles from "./TeacherCard.module.scss";
import { Link } from "react-router-dom";

const TeacherCard = (props) => {

    return (
        <div className={styles.card}>
            <Link to={`${props.name}`}>
                <div className={styles.card__photo}>
                    <img src={props.photo} />
                </div>
                <div className={styles.card__info}>
                    <h3>{props.name}</h3>
                    <span>{props.function}</span>
                </div>
            </Link>
        </div>
    );
}

export default TeacherCard;

