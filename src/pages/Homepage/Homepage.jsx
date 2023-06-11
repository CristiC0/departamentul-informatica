import ImageSlider from "./components/ImageSlider/ImageSlider";
import NewsJigsaw from "./components/NewsJigsaw/NewsJigsaw";
import Info_container from "./components/Info_container/Info_container";
import BriefInfoAbout from "./components/BriefInfoAbout/BriefInfoAbout";
import styles from "./Homepage.module.scss";
import Info_boxes from "./components/Info_boxes/Info_boxes";
import Intro from "./components/Intro/Intro";
import NewsSlider from "@components/NewsSlider/NewsSlider";
import About from "./components/About/About";
import Partners from "./components/Partners/Partners";

function Homepage() {
    return (
        <div className={styles["container"]}>
            <div className={styles["container__slider"]}>
                <ImageSlider />
            </div>
            <Info_boxes />
            <Intro />
            {/* <div className={styles['container__announces']}><NewsJigsaw/></div> */}
            <div className={styles["container__information"]}>
                <Info_container />
            </div>
            <div className={styles.container__partners}>
                <About />
            </div>
            <NewsSlider />
            <div className={styles.container__partners}>
                <Partners />
            </div>
        </div>
    );
}

export default Homepage;
