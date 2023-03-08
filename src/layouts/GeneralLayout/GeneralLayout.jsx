import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer"
import styles from "./GeneralLayout.module.scss"

export default function GeneralLayout() {
    
    return (
        <>
            <header className={styles.header}>
                <Navbar />
            </header>
            <main className={styles.container}>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                <Footer/>
            </footer>
        </>
    );
}
