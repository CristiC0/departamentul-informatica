import styles from "./styles.module.scss";

const MenuItem = ({ icon, title, action, isActive = null }) => {
    return (
        <button
            className={`${styles["menu-item"]} ${
                isActive && isActive() ? styles["is-active"] : ""
            }`}
            onClick={action}
            title={title}
        >
            {icon}
        </button>
    );
};

export default MenuItem;
