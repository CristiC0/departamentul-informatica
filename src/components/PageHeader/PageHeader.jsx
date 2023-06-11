import { useTranslation } from "react-i18next";
import styles from "./PageHeader.module.scss";

import { Link } from "react-router-dom";

const PageHeader = (props) => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item ">
                        <Link to="/">{t("breadcrumb_home")}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {props.title}
                    </li>
                </ol>
            </nav>
            <h1>{props.title}</h1>
            <p>{props.introduction}</p>
        </div>
    );
};

export default PageHeader;
