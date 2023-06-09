import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "@/schemas/authSchema";
import { Link } from "react-router-dom";
import Input from "@components/Input/Input";
import { useAuthContext } from "@/context/AuthContext";
import styles from "./RegisterPage.module.scss";
import { useState } from "react";
import { Toast } from "react-bootstrap";

const RegisterPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { register } = useAuthContext();
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = (values, actions) => {
        (async function () {
            try {
                await register(values);
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
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
        },
        validationSchema: registerSchema,
        onSubmit,
    });

    return (
        <div className={styles.container}>
            <h1 className={styles["container__header"]}>
                {t("register-header")}
            </h1>
            <form onSubmit={handleSubmit} className={styles["form"]}>
                <div className={styles["form__name"]}>
                    <Input
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        placeholder={t("input-firstname")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.firstName}
                        touched={touched.firstName}
                    />
                    <Input
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        placeholder={t("input-lastname")}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.lastName}
                        touched={touched.lastName}
                    />
                </div>

                <Input
                    type="text"
                    name="username"
                    value={values.username}
                    placeholder={t("input-username")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.username}
                    touched={touched.username}
                />

                <Input
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder={t("input-email")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
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
                />
                <button
                    className={styles["form__button"]}
                    disabled={isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? "Submitting..." : t("register-button")}
                </button>
            </form>
            <p className={styles["login-link"]}>
                {t("register-login-question")}
                <i className={styles["login-link__link"]}>
                    <Link to={`/${i18n.language}/auth/login`}>
                        {t("register-login-link")}
                    </Link>
                </i>
            </p>
            <Toast show={showToast} className={styles.toast}>
                <Toast.Header>
                    <strong className="me-auto"> Register Error </strong>
                </Toast.Header>
                <Toast.Body className="text-danger">{error}</Toast.Body>
            </Toast>
        </div>
    );
};

export default RegisterPage;
