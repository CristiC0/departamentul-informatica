import { useRouteLang } from "@hooks/useRouteLang";
import styles from "./Bar.module.scss";
const Bar = () => {
    const changeLanguage = useRouteLang();

    return (
        <div className={styles.bar}>
            <div className={styles["bar__container"]}>
                <span className={styles["bar__number"]}>+373 067 239412</span>
                <div className={styles["bar__languages"]}>
                    <div
                        className={styles["bar__languages--ro"]}
                        onClick={() => changeLanguage("ro")}
                    ></div>
                    <div
                        className={styles["bar__languages--en"]}
                        onClick={() => changeLanguage("en")}
                    ></div>
                    <div
                        className={styles["bar__languages--ru"]}
                        onClick={() => changeLanguage("ru")}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Bar;
