
import styles from "./SearchBar.module.scss";

export default function SearchBar(props) {
    return(
        <div className={styles.search_bar}>
            <div className={styles.container}>
                <form action="#">
                    <div className={styles.form}>
                        <input type="search" name="seach" placeholder={props.text}/>
                    </div>
                </form>
            </div>
        </div>
    );
}