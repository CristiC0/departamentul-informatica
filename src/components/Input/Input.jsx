import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./Input.module.scss";

export default function Input(props) {
    const { type, icon, error, touched, ...everythingElse } = props;
    const [showPassword, setShowPassword] = useState(false);

    const iconDecoration = icon !== undefined && (
        <i className={styles["icon"]}>
            <div className={styles["icon__content"]}>{icon} </div>
        </i>
    );

    const passwordIcon = type === "password" && (
        <i
            className={` ${styles["icon"]} `}
            onClick={() =>
                setShowPassword((prevShowPassword) => !prevShowPassword)
            }
        >
            {showPassword ? (
                <AiOutlineEyeInvisible className={styles["icon--password"]} />
            ) : (
                <AiOutlineEye className={styles["icon--password"]} />
            )}
        </i>
    );

    const inputStyles = `${styles["input__content"]} ${
        error && touched
            ? styles["input__field--error"]
            : styles["input__field--default"]
    } ${icon !== undefined ? styles["input__field--icon"] : ""}`;

    return (
        <div className={styles["input"]}>
            <div className={styles["input__field"]}>
                {iconDecoration}
                <input
                    {...everythingElse}
                    className={inputStyles}
                    type={showPassword ? "text" : type}
                />
                {passwordIcon}
            </div>

            {error && touched && (
                <p className={styles["message-error"]}>{error}</p>
            )}
        </div>
    );
}
