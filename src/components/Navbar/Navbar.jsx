import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import styles from "./Navbar.module.scss";
import Search from "../Search/Search";


function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        const listener = addEventListener("resize", () => {
            if ((isNavExpanded || search) && screen.width > 768) {
                setIsNavExpanded(false);
                setSearch(false);
            }
        });

        return () => {
            removeEventListener("resize", listener);
        }

    })

    useEffect(() => {
        let list = document.getElementById("list");
        let login = document.createElement("li");
        login.innerHTML = "<button>Logare</button>";
        login.childNodes[0].className = styles['navigation__login--expanded'];

        if (isNavExpanded && list?.childNodes.length < 7) {
            list.appendChild(login);
        }

        if (!isNavExpanded && list.childNodes.length === 7) {
            list.childNodes[list.childNodes.length - 1].remove();
        }
    });


    return (
        <>
            <div className={styles.bar}>
                <div className={styles["bar__container"]}>
                    <span className={styles["bar__number"]}>+373 067 239412</span>
                    <div className={styles["bar__languages"]}>
                        <div className={styles["bar__languages--ro"]}></div>
                        <div className={styles["bar__languages--en"]}></div>
                        <div className={styles["bar__languages--ru"]}></div>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <nav className={styles.navigation}>

                    <Link to="/" className={styles["navigation__logo"]}>DI</Link>
                    <button
                        className={styles["navigation__button"] + " " + styles["navigation__button--search"]}
                        onClick={() => {
                            setSearch(!search);
                            setIsNavExpanded(false);
                        }}
                    >
                        <AiOutlineSearch />
                    </button>
                    <button
                        className={styles["navigation__button"] + " " + styles["navigation__button--hamburger"]}
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded);
                            setSearch(false);
                        }}
                    >
                        <div className={isNavExpanded ? styles["open"] : styles["cosed"]}>
                            <div className={styles["navigation__icon"]}></div>
                        </div>
                    </button>

                    <div className={isNavExpanded ? styles["navigation__menu--expanded"] : styles["navigation__menu"]}>

                        <ul id="list">
                            <li>
                                <Link to="/" className={styles["item"]}>Acasă</Link>
                            </li>
                            <li>
                                <Link to="/" className={styles["item"]}>Noutăți</Link>
                            </li>
                            <li>
                                <Link to="/" className={styles["item"]}>Profesori</Link>
                            </li>
                            <li>
                                <Link to="/" className={styles["item"]}>Cursuri</Link>
                            </li>
                            <li>
                                <Link to="/" className={styles["item"]}>Studenți</Link>
                            </li>
                            <li>
                                <Link to="/" className={styles["item"]}>Blog</Link>
                            </li>
                        </ul>
                        <div className={styles["navigation__form"]}>
                            <Search className={styles["navigation__search"]} stateSearch={search} />
                            <button className={styles["navigation__login"]}>Logare</button>
                        </div>
                    </div>

                    <div className={search ? styles["search"] : styles["search--hidden"]}>
                        <Search className={styles["search__input"]} search={search} />
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;