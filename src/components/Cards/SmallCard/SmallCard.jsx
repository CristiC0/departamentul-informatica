import styles from "./SmallCard.module.scss"

const SmallCard=(props)=>{
    return(
        <div className={styles["container"]}>
            <div className={styles["container__image"]}>
                <img src={props.image} alt="Image" />
            </div>
            <div className={styles["content"]}>
                <div className={styles["content__speciality"]}>{props.speciality}</div>
                <div className={styles["content__title"]}>{props.title}</div>
                <div className={styles["content__date"]}>{props.date}</div>
            </div>
        </div>
    );
}

export default SmallCard;