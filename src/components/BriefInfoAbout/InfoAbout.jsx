import styles from "./InfoAbout.module.scss";
import { useTranslation } from "react-i18next";

const InfoAbout = (props) => {
    const { t } = useTranslation();

    return (
        <div className={styles["container"]+" "+styles["container--"+props.text_position]} >
            <div className={styles["container__image"]}>
                <img src={props.image} alt="Image" />
            </div>
            <div className={styles["container__info"]}>
                <h1>{props.title}</h1>
                <p>{props.text}</p>
                <button>{t("read-more")}</button>
            </div>
        </div>
    );
}

export default InfoAbout;