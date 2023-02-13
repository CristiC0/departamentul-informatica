import styles from './Info_container.module.scss'
import Info from './Info'

export default function Info_container(){
    return(
        <div className={styles['container']}>
            <Info name="Anul fondarii" value="1950"/>
            <Info name="Profesori" value="32"/>
            <Info name="Studenti absolventi" value="13512"/>
            <Info name="Premii castigate" value="1124"/>
        </div> 
    )
}