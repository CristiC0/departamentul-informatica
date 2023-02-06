import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { loginSchema } from "@/schemas/authSchema";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import Input from "@components/Input/Input";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

const onSubmit = (values, actions) => {
    actions.resetForm();
    // TODO: send to backend & redirect to login
};

const LoginPage = () => {
    const { t, i18n } = useTranslation();
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
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit,
    });

    return (
        <div className={styles.container}>
            <div className={styles["container__header"]}>
                <h1>{t("login-welcome")}</h1>
                <p>{t("login-message")}</p>
            </div>
            <form onSubmit={handleSubmit} className={styles["form"]}>
                <Input
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder={t("input-email")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
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
                    <Link to={`/${i18n.language}/register`}>
                        {t("login-register-link")}
                    </Link>
                </i>
            </p>
        </div>
    );
};

export default LoginPage;
