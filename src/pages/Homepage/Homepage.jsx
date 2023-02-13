import Info_container from "../../components/Info_container/Info_container";
import styles from "./Homepage.module.scss"

function Homepage() {
    return (
        <div className={styles['container']}>
            <div className={styles['container__slider']}></div>
            <div className={styles['container__announces']}></div>
            <div className={styles['container__information']}><Info_container/></div>
            <div className={styles['container__about']}></div>
        </div>
    );
}

export default Homepage;