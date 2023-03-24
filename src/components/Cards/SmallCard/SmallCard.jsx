import styles from "./SmallCard.module.scss"
import CardContent from "@components/Cards/CardContent/CardContent.jsx";

const SmallCard = (props) => {
    return (
        <div className={styles["container"]}>
            <div className={styles["container__image"]}>
                <img src={props.image} alt="Image"/>
            </div>
            <CardContent
                speciality={props.speciality}
                title={props.title}
                date={props.date}
            />
        </div>
    );
}

export default SmallCard;