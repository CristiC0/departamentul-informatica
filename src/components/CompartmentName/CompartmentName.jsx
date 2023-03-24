import styles from "./CompartmentName.module.scss"

const CompartmentName=(props)=>{
    return(
        <div className={styles["container"]}>
            <div className={styles["container__name"]}>{props.name}</div>
        </div>
    );
}

export default CompartmentName;