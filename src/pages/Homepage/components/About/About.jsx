import styles from "./About.module.scss";
import { Link } from "react-router-dom";

import image_1 from "@images/usm_logo.png";
import image_2 from "@images/moodle_logo.png";
import image_3 from "@images/acreditare.png";
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();

    return (
        <div className={styles.about}>
            <div className={styles.about__row}>
                <Link
                    to="https://usm.md"
                    target="_blank"
                    className={styles.about__cols}
                >
                    <div className={styles.about__title}>
                        {t("homepage__about__university")}
                    </div>
                    <div className={styles.about__image}>
                        <img src={image_1} alt="Image" />
                    </div>
                </Link>
                <Link
                    to="https://moodle.usm.md"
                    target="_blank"
                    className={styles.about__cols}
                >
                    <div className={styles.about__title}>
                        {t("homepage__about__platform")}
                    </div>
                    <div className={styles["about__image--small"]}>
                        <img src={image_2} alt="Image" />
                    </div>
                </Link>
                <Link
                    to="http://fmi.usm.md/sites/default/files/PDF/Acreditare2022.pdf"
                    target="_blank"
                    className={styles.about__cols}
                >
                    <div className={styles.about__title}>
                        {t("homepage__about__credit")}
                    </div>
                    <div className={styles.about__image}>
                        <img src={image_3} alt="Image" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
