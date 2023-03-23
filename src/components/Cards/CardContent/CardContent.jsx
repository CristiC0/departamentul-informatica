import styles from "./CardContent.module.scss"

const CardContent = (props) => {
    return (
        <div className={styles["content"]}>
            <div className={styles["content--top"]}>
                <div className={styles["content__speciality"]}>{props.speciality}</div>
                <div className={styles["content__title"]}>{props.title}</div>
            </div>
            <div className={styles["content--bottom"]}>
                <div className={styles["content__date"]}>{props.date}</div>
            </div>
        </div>
    );
}

export default CardContent;