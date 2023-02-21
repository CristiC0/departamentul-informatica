import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.scss";
import { useTranslation } from "react-i18next";
import Bar from "@components/Navbar/Bar";

export default function AuthLayout() {
    const { t } = useTranslation();
    return (
        <>
            <Bar />
            <main className={styles["container"]}>
                <div className={styles["container__header"]}>
                    <div className={styles["container__cover"]}></div>
                    <h1 className={styles["container__title"]}>
                        {t("auth-title")}
                    </h1>
                </div>
                <div className={styles["container__form"]}>
                    <Outlet />
                </div>
            </main>
        </>
    );
}
