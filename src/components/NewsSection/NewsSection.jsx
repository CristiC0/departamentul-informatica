import styles from "./NewsSection.module.scss"

import BigCard from "../Cards/BigCard/BigCard";
import MediumCard from "../Cards/MediumCard/MediumCard";
import SmallCard from "../Cards/SmallCard/SmallCard";

const NewsSection = (props) => {
    return (
        <div className={styles["container"]}>
            <div className={styles["container__top"]}>
                <div className={styles["container__left"]}>
                    <BigCard
                        speciality="Securitate"
                        title="învățământ superior din Moldova membră a rețelei"
                        content="Din 30 iunie 2022 USM este UNICA instituție de învățământ superior din Moldova membră a rețelei universitare UNICA."
                        date="Ln, 24 Aprilie, 2023"
                        image="/src/assets/images/temp2.png"
                    />
                </div>
                <div className={styles["container__right"]}>
                    <div className={styles["container__right--1"]}>
                        <SmallCard
                            speciality="Securitate"
                            title="învățământ superior din Moldova membră a rețelei"
                            date="Ln, 24 Aprilie, 2023"
                            image="/src/assets/images/temp1.png"
                        />
                    </div>
                    <div className={styles["container__right--2"]}>
                        <SmallCard
                            speciality="Securitate"
                            title="învățământ superior din Moldova membră a rețelei"
                            date="Ln, 24 Aprilie, 2023"
                            image="/src/assets/images/temp1.png"
                        />
                    </div>
                    <div className={styles["container__right--3"]}>
                        <SmallCard
                            speciality="Securitate"
                            title="învățământ superior din Moldova membră a rețelei"
                            date="Ln, 24 Aprilie, 2023"
                            image="/src/assets/images/temp1.png"
                        />
                    </div>
                </div>
            </div>
            <div className={styles["container__bottom"]}>
                <div className={styles["container__bottom--1"]}>
                    <MediumCard
                        speciality="Securitate"
                        title="învățământ superior din Moldova membră a rețelei"
                        date="Ln, 24 Aprilie, 2023"
                        image="/src/assets/images/temp4.jpg"

                    />
                </div>
                <div className={styles["container__bottom--2"]}>
                    <MediumCard
                        speciality="Securitate"
                        title="învățământ superior din Moldova membră a rețelei"
                        date="Ln, 24 Aprilie, 2023"
                        image="/src/assets/images/temp4.jpg"
                    />
                </div>
                <div className={styles["container__bottom--3"]}>
                    <MediumCard
                        speciality="Securitate"
                        title="învățământ superior din Moldova membră a rețelei"
                        date="Ln, 24 Aprilie, 2023"
                        image="/src/assets/images/temp4.jpg"
                    />
                </div>
                <div className={styles["container__bottom--4"]}>
                    <MediumCard
                        speciality="Securitate"
                        title="învățământ superior din Moldova membră a rețelei"
                        date="Ln, 24 Aprilie, 2023"
                        image="/src/assets/images/temp4.jpg"
                    />
                </div>
            </div>
        </div>
    );
}

export default NewsSection;