import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import Bar from "./Bar";
import styles from "./Navbar.module.scss";
import Search from "../Search/Search";
import { useAuthContext } from "@/context/AuthContext";

function Navbar() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user, logout } = useAuthContext();

    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        const listener = addEventListener("resize", () => {
            if (screen.width > 768) {
                setIsNavExpanded(false);
                //setSearch(false);
            }
        });

        return () => {
            removeEventListener("resize", listener);
        };
    }, []);

    return (
        <>
            <Bar />
            <div className={styles.container}>
                <nav className={styles.navigation}>
                    <Link to="/" className={styles["navigation__logo"]}>
                        DI
                    </Link>
                    <button
                        className={
                            styles["navigation__button"] +
                            " " +
                            styles["navigation__button--search--expanded"]
                        }
                        onClick={() => {
                            setSearch((search) => !search);
                            setIsNavExpanded(false);
                        }}
                    >
                        <AiOutlineSearch />
                    </button>
                    <button
                        className={
                            styles["navigation__button"] +
                            " " +
                            styles["navigation__button--hamburger"]
                        }
                        onClick={() => {
                            setIsNavExpanded((isNavExpanded) => !isNavExpanded);
                            setSearch(false);
                        }}
                    >
                        <div
                            className={
                                isNavExpanded ? styles["open"] : styles[""]
                            }
                        >
                            <div className={styles["navigation__icon"]}></div>
                        </div>
                    </button>

                    <div
                        className={
                            isNavExpanded
                                ? styles["navigation__menu--expanded"]
                                : styles["navigation__menu"]
                        }
                    >
                        <ul id="list">
                            <li>
                                <Link to="/">{t("navbar-home")}</Link>
                            </li>
                            <li>
                                <Link to="/">{t("navbar-news")}</Link>
                            </li>
                            <li>
                                <Link to="/">{t("navbar-teachers")}</Link>
                            </li>
                            <li>
                                <Link to="/">{t("navbar-courses")}</Link>
                            </li>
                            <li>
                                <Link to="/">{t("navbar-students")}</Link>
                            </li>
                            <li>
                                <Link to="/">{t("navbar-blog")}</Link>
                            </li>
                            {isNavExpanded &&
                                (user.auth ? (
                                    <li>
                                        <Link onClick={() => logout()} to="/">
                                            {t("navbar-logout")}
                                        </Link>
                                    </li>
                                ) : (
                                    <li>
                                        <Link to={`/${i18n.language}/login`}>
                                            {t("navbar-login")}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                        <div className={styles["navigation__icons"]}>
                            <button
                                className={
                                    styles["navigation__button"] +
                                    " " +
                                    styles["navigation__button--search"]
                                }
                                onClick={() => {
                                    setSearch((search) => !search);
                                    setIsNavExpanded(false);
                                }}
                            >
                                {search ? <CgClose /> : <AiOutlineSearch />}
                            </button>
                            {user.auth ? (
                                <button
                                    className={
                                        styles["navigation__button"] +
                                        " " +
                                        styles["navigation__button--login"]
                                    }
                                    onClick={() => {
                                        logout();
                                        navigate(`/`, {
                                            replace: true,
                                        });
                                    }}
                                >
                                    <MdLogout />
                                </button>
                            ) : (
                                <button
                                    className={
                                        styles["navigation__button"] +
                                        " " +
                                        styles["navigation__button--login"]
                                    }
                                    onClick={() =>
                                        navigate(`/${i18n.language}/login`, {
                                            replace: true,
                                        })
                                    }
                                >
                                    <HiOutlineUser />
                                </button>
                            )}
                        </div>
                    </div>

                    <div
                        className={
                            search ? styles["search"] : styles["search--hidden"]
                        }
                    >
                        <Search
                            className={styles["search__input"]}
                            search={search}
                        />
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
