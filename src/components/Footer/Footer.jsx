import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { BsTelephone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { BiNavigation } from 'react-icons/bi';
import { BsFacebook } from 'react-icons/bs';
import { BsTelegram } from 'react-icons/bs';
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.footer}>
            <div className={styles["footer__container"]}>
                <div className={styles["footer__rows"]}>
                    <div className={styles["footer__cols"] + " " + styles["footer__cols--about"]}>
                        <div className={styles["footer__logo"]}>DI</div>
                        <div className={styles["footer__content"]}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, delectus necessitatibus nesciunt earum accusamus unde ex voluptatibus sit autem eveniet expedita, voluptate similique, facere rem ullam excepturi vero exercitationem beatae?</p>
                                                        <div className={styles["footer__links"]}>
                                <BsFacebook/>
                                <BsTelegram/>
                            </div>
                        </div>
                    </div>
                    <div className={styles["footer__cols"] + " " + styles["footer__cols--navigation"]}>
                        <div className={styles["footer__title"]}>Meniu</div>
                        <div className={styles["footer__content"]}>
                            <ul>
                                <li>
                                    <Link to="/">{t("navbar-home")}</Link>
                                </li>
                                <li>
                                    <Link to="/">{t("navbar-news")}</Link>
                                </li>
                                <li>
                                    <Link to="/">{t("navbar-teachers")}</Link>
                                </li>
                                <li>
                                    <Link to="/">{t("navbar-courses")}</Link>
                                </li>
                                <li>
                                    <Link to="/">{t("navbar-students")}</Link>
                                </li>
                                <li>
                                    <Link to="/">{t("navbar-blog")}</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles["footer__cols"] + " " + styles["footer__cols--contacts"]}>
                        <div className={styles["footer__title"]}>Contacte</div>
                        <div className={styles["footer__content"]}>
                            <div className={styles["contacts"] + " " + styles["contacts--phone"]}>
                                <BsTelephone className={styles["footer__icon"]}/>
                                <span>+373 22 242720</span>
                            </div>
                            <div className={styles["contacts"] + " " + styles["contacts--email"]}>
                                <AiOutlineMail className={styles["footer__icon"]}/>
                                <a href="mailto:depinformaticausm@gmail.com">depinformaticausm@gmail.com</a>
                            </div>
                            <div className={styles["contacts"] + " " + styles["contacts--url"]}>
                                <span> Web:</span>
                                <span> http://fmi.usm.md</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles["footer__cols"] + " " + styles["footer__cols--address"]}>
                        <div className={styles["footer__title"]}>Adresa</div>
                        <div className={styles["footer__content"]}>
                            <div className={styles["footer__address"]}>
                                <BiNavigation className={styles["footer__icon"]+" "+styles["footer__icon--navigation"]}/>
                                <span>
                                    Universitaitea de Stat din Moldova,
                                    Str. Alexei Mateevici, Nr. 60, bloc 4, MD-2009, Chişinău
                                </span>
                            </div>
                            <div className={styles["footer__map"]}>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3489.232096358385!2d28.82052441707746!3d47.01840108719319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c2ce43a485b%3A0x35829d521a365594!2sAlexei%20Mateevici%20St%2060%2C%20Chi%C8%99in%C4%83u%2C%20Moldova!5e0!3m2!1sen!2s!4v1677412264750!5m2!1sen!2s" loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["footer__copyright"]}>© 2023 Departamentul Informatică</div>
        </div>
    );
}

export default Footer;