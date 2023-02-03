import { AiOutlineSearch } from 'react-icons/ai';
import styles from './Search.module.scss'


function Search(props) {

    return (
        <>
            <form className={styles.form}>
                <i className={props.search ? styles["form__icon--expanded"] : styles["form__icon"]}><AiOutlineSearch /></i>
                <input
                    type="text"
                    placeholder='Cautare..'
                    className={props.search ? styles['form__input--expanded'] : styles['form__input--bar']}
                />
            </form>
        </>
    );
}

export default Search;