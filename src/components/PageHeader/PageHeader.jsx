import styles from "./PageHeader.module.scss";

import { Link } from "react-router-dom";

const PageHeader= (props) => {

    return (
        <div className={styles.container}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item "><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{props.title}</li>
                </ol>
            </nav>
            <h1>{props.title}</h1>
            <p>{props.introduction}</p>
        </div>
    );
}

export default PageHeader;