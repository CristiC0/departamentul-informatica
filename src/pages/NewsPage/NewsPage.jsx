import CompartmentName from "@components/CompartmentName/CompartmentName";
import NewsSection from "./components/NewsSection/NewsSection";
import CurrentDate from "@components/CurrentDate/CurrentDate";
import styles from "./NewsPage.module.scss";
import Weather from "@components/Weather/Weather";
import NewsSlider from "./components/NewsSlider/NewsSlider.jsx";
function NewsPage() {

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <div className={styles["header__data"]}><CurrentDate /></div>
                <div className={styles["header__title"]}>DI & NEWS</div>
                <div className={styles["header__weather"]}>Chișinău <Weather/></div>
            </div>
            <div className={styles['header__menu']}></div>
            <div className={styles['news']}>
                <CompartmentName name="Principalele știri" />
                <NewsSection/>
            </div>
            <div className={styles['popular']}>
                <CompartmentName name="Popular pentru săptămână" />
                <NewsSlider></NewsSlider>
            </div>
        </div>
    );
}

export default NewsPage;