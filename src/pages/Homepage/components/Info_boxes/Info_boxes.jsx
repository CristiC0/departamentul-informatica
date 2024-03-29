import styles from "./Info_boxes.module.scss";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function Info_boxes() {
    const { t } = useTranslation();
    return (
        <div className={styles["info-boxes"]}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <Link
                        to="#"
                        className={`${styles.box} ${styles["box--1"]}`}
                    >
                        <div className={styles.box__content}>
                            <h3 className={styles.box__title}>Informatica</h3>
                            <p className={styles.box_paragraf}>
                                {t("homepage__infobox_informatica")}
                            </p>
                        </div>
                    </Link>
                    <Link
                        to="#"
                        className={`${styles.box} ${styles["box--2"]}`}
                    >
                        <div className={styles.box__content}>
                            <h3 className={styles.box__title}>
                                Informatica aplicată
                            </h3>
                            <p className={styles.box_paragraf}>
                                {t("homepage__infobox_informatica-aplicata")}
                            </p>
                        </div>
                    </Link>
                    <Link
                        to="#"
                        className={`${styles.box} ${styles["box--3"]}`}
                    >
                        <div className={styles.box__content}>
                            <h3 className={styles.box__title}>Game Design</h3>
                            <p className={styles.box_paragraf}>
                                {t("homepage__infobox_game-design")}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
