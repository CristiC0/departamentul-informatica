import styles from './Info.module.scss'

export default function Info(props){
    return(
            <div className={styles['container']}>
                <span className={styles['container__title']}>{props.name}</span>
                <span className={styles['container__value']}>{props.value}</span>
            </div>
    )
}