import ImageSlider from "./components/ImageSlider/ImageSlider_1";
import NewsJigsaw from "./components/NewsJigsaw/NewsJigsaw";
import Info_container from "./components/Info_container/Info_container";
import BriefInfoAbout from "./components/BriefInfoAbout/BriefInfoAbout";
import styles from "./Homepage.module.scss";

function Homepage() {
    return (
        <div className={styles["container"]}>
            <div className={styles["container__slider"]}>
                <ImageSlider />
            </div>
            <div className={styles['container__announces']}><NewsJigsaw/></div>
            <div className={styles["container__information"]}>
                <Info_container />
            </div>
            <div className={styles["container__about"]}>
                <BriefInfoAbout />
            </div>
        </div>
    );
}

export default Homepage;
