import CurrentDate from "../../components/CurrentDate/CurrentDate";
import styles from "./NewsPage.module.scss"


function NewsPage() {

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <div className="header__data"><CurrentDate/></div>
                <div className="header__title"></div>
                <div className="header__weather"></div>
            </div>
            <div className={styles['header__menu']}></div>
            <div className={styles['news']}></div>
            <div className={styles['popular']}></div>
        </div>
    );
}

export default NewsPage;