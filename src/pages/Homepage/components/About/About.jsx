import styles from './About.module.scss'
import { Link} from "react-router-dom";

import image_1 from "@images/usm_logo.png";
import image_2 from "@images/moodle_logo.png";
import image_3 from "@images/acreditare.png";

export default function About() {


    return (
        <div className={styles.about}>
            <div className={styles.about__row}>
                <Link to="https://usm.md" target="_blank" className={styles.about__cols}>
                    <div className={styles.about__title}>Universitatea de Stat din Moldova</div>
                    <div className={styles.about__image}><img src={image_1} alt="Image"/></div>
                </Link>
                <Link to="https://moodle.usm.md" target="_blank" className={styles.about__cols}>
                    <div className={styles.about__title}>Platforma de studii la distanţă USM</div>
                    <div className={styles["about__image--small"]}><img src={image_2} alt="Image"/></div>
                </Link>
                <Link to="http://fmi.usm.md/sites/default/files/PDF/Acreditare2022.pdf" target="_blank" className={styles.about__cols}>
                    <div className={styles.about__title}>Acreditare</div>
                    <div className={styles.about__image}><img src={image_3} alt="Image"/></div>
                </Link>
            </div>
        </div>
    )
}