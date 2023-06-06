import styles from "./BriefInfoAbout.module.scss";
import InfoAbout from "./InfoAbout";
import { useTranslation } from "react-i18next";

import image_1 from "@images/usm_logo.png";
import image_2 from "@images/moodle_logo.png";
import image_3 from "@images/acreditare.png";

const BriefInfoAbout = ()=>{
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <InfoAbout image={image_1} title={"Universitatea de stat din Moldova"} text={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"} text_position={"right"}/>
            <InfoAbout image={image_2} title={"Platforma de studii la distanţă USM"} text={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"} text_position={"left"}/>
            <InfoAbout image={image_3} title={"Acreditări"} text={"aaa"} text_position={"right"}/>
        </div>
    );
}

export default BriefInfoAbout;

