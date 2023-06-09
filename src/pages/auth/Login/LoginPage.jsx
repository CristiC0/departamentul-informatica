import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { loginSchema } from "@/schemas/authSchema";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "@components/Input/Input";
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import styles from "./Login.module.scss";
import { useAuthContext } from "@context/AuthContext";
import { Toast } from "react-bootstrap";

const LoginPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState(null);
    const onSubmit = (values, actions) => {
        (async function () {
            try {
                await login(values);
            } catch (error) {
                setShowToast(true);
                setError(error?.response?.data?.message);
                setTimeout(() => {
                    setShowToast(false);
                    setError(null);
                }, 3000);
                actions.resetForm();
                return;
            }
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
                    type="text"
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
                    <Link to={`/${i18n.language}/auth/register`}>
                        {t("login-register-link")}
                    </Link>
                </i>
            </p>
            <Toast show={showToast} className={styles.toast}>
                <Toast.Header>
                    <strong className="me-auto"> Login Error </strong>
                </Toast.Header>
                <Toast.Body className="text-danger">{error}</Toast.Body>
            </Toast>
        </div>
    );
};

export default LoginPage;
