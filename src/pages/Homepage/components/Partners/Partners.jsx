import styles from "./Partners.module.scss";
import { Link } from "react-router-dom";

import image_1 from "@images/partners_1.png";
import image_2 from "@images/partners_2.png";
import image_3 from "@images/partners_3.png";
import image_4 from "@images/partners_4.png";
import image_5 from "@images/partners_5.png";
import image_6 from "@images/partners_6.png";
import { useTranslation } from "react-i18next";

export default function Partners() {
    const { t } = useTranslation();
    return (
        <div className={styles.partners}>
            <small>{t("homepage__parteners__top")}</small>
            <h2>{t("homepage__parteners__our-partners")}</h2>
            <div className={styles.partners__row}>
                <Link
                    to="http://www.cedacrinternational.md/?lang=ro"
                    target="_blank"
                    className={styles.partners__cols}
                >
                    <img src={image_1} alt="Image" />
                </Link>
                <Link
                    to="https://www.alliedtesting.com/"
                    target="_blank"
                    className={styles.partners__cols}
                >
                    <img src={image_2} alt="Image" />
                </Link>
                <Link
                    to="https://www.endava.com/"
                    target="_blank"
                    className={styles.partners__cols}
                >
                    <img src={image_3} alt="Image" />
                </Link>
                <Link
                    to="https://www.wolfram.com/"
                    target="_blank"
                    className={styles.partners__cols}
                >
                    <img src={image_4} alt="Image" />
                </Link>
                <Link
                    to="http://erasmusplus.md/"
                    target="_blank"
                    className={styles.partners__cols}
                >
                    <img src={image_5} alt="Image" />
                </Link>
                <Link
                    to="https://www.pentalog.com/"
                    target="_blank"
                    className={styles.partners__cols}
                >
                    <img src={image_6} alt="Image" />
                </Link>
            </div>
        </div>
    );
}
