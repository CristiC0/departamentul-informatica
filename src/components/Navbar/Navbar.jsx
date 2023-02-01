import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import styles from "./Navbar.module.scss";


function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    addEventListener("resize", () => {
        if (isNavExpanded && screen.width > 768) {
            setIsNavExpanded(false);
        }
    });

    return (
        <>
            <div className={styles.container}>
                <nav className={styles.navigation}>
                    <a href="/" className={styles["navigation__logo"]}>DI</a>
                    <button
                        className={styles["navigation__button"] + " " + styles["navigation__button--hamburger"]}
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded);
                        }}
                    >
                        <div className={styles["navigation__icon"]}><AiOutlineMenu /></div>
                    </button>
                    <div className={isNavExpanded ? styles["navigation__menu--expanded"] : styles["navigation__menu"]}>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/">Noutati</Link>
                            </li>
                            <li>
                                <Link to="/">Profesori</Link>
                            </li>
                            <li>
                                <Link to="/">Cursuri</Link>
                            </li>
                            <li>
                                <Link to="/">Studenti</Link>
                            </li>
                            <li>
                                <Link to="/">Blog</Link>
                            </li>
                        </ul>
                    </div>
                    {/* <div className={styles["navigation__search"]}>
                        <form>
                            <input type="text" placeholder="Search.." />
                            <button type="submit" className={styles["navigation__button navigation__button--search"]}>
                                <div className={styles["navigation__icon"]}>
                                    <BsSearch />
                                </div>
                            </button>
                        </form>
                    </div> */}
                </nav>
            </div>
        </>
    );
}

export default Navbar;