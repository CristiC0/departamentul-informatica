import styles from './Intro.module.scss'
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function Intro() {
    const { t } = useTranslation();
    return (
        <>
            <div className={styles.container}>
                <div className={styles.container__top}>
                    <small>Text</small>
                    <h2>Misiunea Departamentului de Informatică</h2>
                    <p>Misiunea principală a Departamentului de Informatică este de a pregăti specialiști de înaltă calificare în domeniul de Informatică, cadre didactice competente în acesta, precum și de a promova învățămîntul şi cercetarea în concordanţă cu exigenţele unei societăţi bazate pe cunoaştere şi pe educaţie continuă. Totodată departamentul are rolul de membru activ al mediului social, care are misiunea de a promova în societate cultura  informatică, de a contribui la perfecţionarea sistemului educațional, de a adopta reglementări conforme cu standardele moderne naționale și internaționale.</p>
                    <div className={styles.author}>
                        <strong>Autor</strong>
                        <small>Functia acestuia</small>
                    </div>
                </div>
            </div>
            <div className={styles.big__container}>
                <div className={styles.container}>
                    <div className={styles.container__bottom}>
                        <div className={styles.video}>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/8NyEQb_8JhM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <div className={styles.content}>
                            <header className={styles.content__header}>
                                <small>Descoperă mai multe despre noi</small>
                            </header>
                            <div className={styles.content__body}>
                                <h4>Departamentul de Informatică: Excelență în Educație și Popularitate în Industria IT</h4>
                                <p>Programul de studii oferă o gamă diversificată de specializări, acoperind toate aspectele importante ale informaticii, cum ar fi programarea, bazele de date, inteligența artificială și securitatea informației. Cursurile sunt concepute pentru a combina teoria și practica, oferind studenților abilitățile necesare pentru a aborda provocările complexe din domeniul informaticii.</p>
                                <button type="button" className="btn btn-prmary">
                                    <Link to="https://admitere.usm.md/" target="_blank">Aplică</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}