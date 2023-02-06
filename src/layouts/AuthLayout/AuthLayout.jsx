import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.scss";
import { useTranslation } from "react-i18next";

export default function AuthLayout() {
    const { t } = useTranslation();
    return (
        <main className={styles["container"]}>
            <div className={styles["container__header"]}>
                <div className={styles["container__cover"]}></div>
                <h1 className={styles["container__title"]}>
                    {/* DEPARTAMENTUL <br /> INFORMATICA */}
                    {t("auth-title")}
                </h1>
            </div>
            <div className={styles["container__form"]}>
                <Outlet />
            </div>
        </main>
    );
}
