import styles from "./Intro.module.scss";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function Intro() {
    const { t } = useTranslation();
    return (
        <>
            <div className={styles.container}>
                <div className={styles.container__top}>
                    <small>{t("homepage__intro__top")}</small>
                    <h2>{t("homepage__intro__header")}</h2>
                    <p>{t("homepage__intro__info")}</p>
                    <div className={styles.author}>
                        <strong>{t("homepage__intro__author")}</strong>
                        <small>{t("homepage__intro__function")}</small>
                    </div>
                </div>
            </div>
            <div className={styles.big__container}>
                <div className={styles.container}>
                    <div className={styles.container__bottom}>
                        <div className={styles.video}>
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/8NyEQb_8JhM"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className={styles.content}>
                            <header className={styles.content__header}>
                                <small>
                                    {t("homepage__intro__content__top")}
                                </small>
                            </header>
                            <div className={styles.content__body}>
                                <h4>{t("homepage__intro__content__header")}</h4>
                                <p>{t("homepage__intro__content__info")}</p>
                                <button
                                    type="button"
                                    className="btn btn-prmary"
                                >
                                    <Link
                                        to="https://admitere.usm.md/"
                                        target="_blank"
                                    >
                                        {t("homepage__intro__content__apply")}
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
