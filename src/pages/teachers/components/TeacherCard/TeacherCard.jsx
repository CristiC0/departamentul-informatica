import styles from "./TeacherCard.module.scss";
import { Link } from "react-router-dom";

const TeacherCard = (props) => {

    return (
        <div className={styles.card}>
            <Link to={`${props.id}`}>
                <div className={styles.card__photo}>
                    <img src={props.photo} />
                </div>
                <div className={styles.card__info}>
                    <h3>{props.name}</h3>
                    {props.function.map((title)=>{
                        return(
                            <span>{title}</span>
                        )
                    })}
                </div>
            </Link>
        </div>
    );
}

export default TeacherCard;

