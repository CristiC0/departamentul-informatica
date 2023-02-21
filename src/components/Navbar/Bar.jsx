import { useRouteLang } from "@hooks/useRouteLang";
import { BsTelephone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import styles from "./Bar.module.scss";

const Bar = () => {
    const changeLanguage = useRouteLang();

    return (
        <div className={styles.bar}>
            <div className={styles["bar__container"]}>
                <div className={styles["bar__info"]}>
                    <span className={styles["bar__number"]}><BsTelephone />+373 067 239412</span>
                    <span className={styles["bar__email"]}><AiOutlineMail /><a className={styles["bar__link"]} href="mailto:depinformaticausm@gmail.com">depinformaticausm@gmail.com</a></span>
                </div>
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
