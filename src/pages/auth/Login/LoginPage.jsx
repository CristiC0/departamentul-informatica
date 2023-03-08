import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { loginSchema } from "@/schemas/authSchema";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "@components/Input/Input";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import styles from "./Login.module.scss";
import { useAuthContext } from "../../../context/AuthContext";

const LoginPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const onSubmit = (values, actions) => {
        (async function () {
            await login(values);
            actions.resetForm();
            navigate("/");
        })();
    };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit,
    });

    return (
        <div className={styles.container}>
            <button onClick={() => window.history.go(-1)}>Clikck</button>
            <div className={styles["container__header"]}>
                <h1>{t("login-welcome")}</h1>
                <p>{t("login-message")}</p>
            </div>
            <form onSubmit={handleSubmit} className={styles["form"]}>
                <Input
                    type="text"
                    name="username"
                    value={values.email}
                    placeholder={t("input-username")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.username}
                    touched={touched.username}
                    icon={<AiOutlineUser />}
                />

                <Input
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder={t("input-password")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    touched={touched.password}
                    icon={<RiLockPasswordLine />}
                />
                <button
                    className={styles["form__button"]}
                    disabled={isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? "Submitting..." : t("login-button")}
                </button>
            </form>
            <p className={styles["login-link"]}>
                {t("login-register-question")}
                <i className={styles["login-link__link"]}>
                    <Link to={`/${i18n.language}/auth/register`}>
                        {t("login-register-link")}
                    </Link>
                </i>
            </p>
        </div>
    );
};

export default LoginPage;
