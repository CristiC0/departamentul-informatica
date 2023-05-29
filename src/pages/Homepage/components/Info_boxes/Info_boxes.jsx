import styles from './Info_boxes.module.scss'
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function Info_boxes(){
    const { t } = useTranslation();
    return(
        <div className={styles['info-boxes']}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <Link to="#" className={`${styles.box} ${styles["box--1"]}`}>
                        <div className={styles.box__content}>
                            <h3 className={styles.box__title}>Titlu</h3>
                            <p className={styles.box_paragraf}>Paragraf</p>
                        </div>
                    </Link>
                    <Link to="#" className={`${styles.box} ${styles["box--2"]}`}>
                        <div className={styles.box__content}>
                            <h3 className={styles.box__title}>Titlu</h3>
                            <p className={styles.box_paragraf}>Paragraf</p>
                        </div>
                    </Link>
                    <Link to="#" className={`${styles.box} ${styles["box--3"]}`}>
                        <div className={styles.box__content}>
                            <h3 className={styles.box__title}>Titlu</h3>
                            <p className={styles.box_paragraf}>Paragraf</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div> 
    )
}