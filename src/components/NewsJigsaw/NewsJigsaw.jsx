// TODO: Make content dynamic somehow
import styles from "./NewsJigsaw.module.scss";

const NewsJigsaw = () => {
    return (
        <div className={styles.container}>
            <div
                className={`${styles["container__element"]} ${styles["container__element--2h"]}`}
            >
                <img src="/src/assets/images/temp1.png" alt="Image" />
                <div>
                    <h2>Cu drag din inimi</h2>
                    <p className={styles["container__date"]}>
                        15 Ianuarie 2024
                    </p>
                    <p>
                        Din 30 iunie 2022 USM este UNICA instituție de
                        învățământ superior din Moldova membră a rețelei
                        universitare UNICA.
                    </p>
                </div>
            </div>
            <div
                className={`${styles["container__element"]} ${styles["container__element--black"]} ${styles["container__element--imgSmall"]}`}
            >
                <div>
                    <h2>Cu drag din inimi</h2>
                    <p className={styles["container__date"]}>
                        15 Ianuarie 2024
                    </p>
                    <p>
                        Din 30 iunie 2022 USM este UNICA instituție de
                        învățământ superior din Moldova membră a rețelei
                        universitare UNICA.
                    </p>
                </div>
            </div>
            <div
                className={`${styles["container__element"]} ${styles["container__element--2h"]} ${styles["container__element--2v"]}  ${styles["container__element--black"]}  ${styles["container__element--imgLarge"]}  `}
            >
                <div className={`${styles["container__position--left"]}`}>
                    <h2>Cu drag din inimi</h2>
                    <p className={styles["container__date"]}>
                        15 Ianuarie 2024
                    </p>
                    <p>
                        Din 30 iunie 2022 USM este UNICA instituție de
                        învățământ superior din Moldova membră a rețelei
                        universitare UNICA.
                    </p>
                </div>
            </div>
            <div className={`${styles["container__element"]}`}>
                <div>
                    <h2>Cu drag din inimi</h2>
                    <p className={styles["container__date"]}>
                        15 Ianuarie 2024
                    </p>
                    <p>
                        Din 30 iunie 2022 USM este UNICA instituție de
                        învățământ superior din Moldova membră a rețelei
                        universitare UNICA.
                    </p>
                </div>
            </div>
            <div
                className={`${styles["container__element"]} ${styles["container__element--2v"]}`}
            >
                <img src="/src/assets/images/temp4.jpg" alt="Image" />
                <div>
                    <h2>Cu drag din inimi</h2>
                    <p className={styles["container__date"]}>
                        15 Ianuarie 2024
                    </p>
                    <p>
                        Din 30 iunie 2022 USM este UNICA instituție de
                        învățământ superior din Moldova membră a rețelei
                        universitare UNICA.
                    </p>
                </div>
            </div>
            <div
                className={`${styles["container__element"]} ${styles["container__element--2v"]} ${styles["container__quote"]} ${styles["container__element--aqua"]}`}
            >
                <h1>❞</h1>
                <p>
                    Din tot sufletul Vă felicităm cu sfârșitul a încă a unui an
                    plin de realizări frumoase, încercări de tot felul, pe care
                    le-am înfruntat cu precădere.
                </p>
                <div>
                    <hr />
                    <p className={styles["author"]}>John Doe</p>
                </div>
            </div>
            <div className={`${styles["container__element"]}`}>
                <div>
                    <h2>Cu drag din inimi</h2>
                    <p className={styles["container__date"]}>
                        15 Ianuarie 2024
                    </p>
                    <p>
                        Din 30 iunie 2022 USM este UNICA instituție de
                        învățământ superior din Moldova membră a rețelei
                        universitare UNICA.
                    </p>
                </div>
            </div>
            <div
                className={`${styles["container__element"]} ${styles["container__element--2h"]}`}
            >
                <img src="/src/assets/images/temp1.png" alt="Image" />
                <div>
                    <h2>Cu drag din inimi</h2>
                    <p className={styles["container__date"]}>
                        15 Ianuarie 2024
                    </p>
                    <p>
                        Din 30 iunie 2022 USM este UNICA instituție de
                        învățământ superior din Moldova membră a rețelei
                        universitare UNICA.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewsJigsaw;
