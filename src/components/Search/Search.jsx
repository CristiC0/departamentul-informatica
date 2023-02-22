import { useTranslation } from "react-i18next";
import styles from './Search.module.scss'


function Search(props) {
    const { t } = useTranslation();
    return (
        <>
            <form className={styles.form}>
                <input
                    type="text"
                    placeholder={t("search")}
                    className={props.search ? styles['form__input--expanded'] : styles['form__input--bar']}
                />
            </form>
        </>
    );
}

export default Search;