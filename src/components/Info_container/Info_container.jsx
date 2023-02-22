import styles from './Info_container.module.scss'
import Info from './Info'
import { useTranslation } from "react-i18next";

export default function Info_container(){
    const { t } = useTranslation();
    return(
        <div className={styles['container']}>
            <Info name={t("info-foundation-year")} value="1950"/>
            <Info name={t("navbar-teachers")} value="32"/>
            <Info name={t("info-students")} value="13512"/>
            <Info name={t("info-prizes")} value="1124"/>
        </div> 
    )
}