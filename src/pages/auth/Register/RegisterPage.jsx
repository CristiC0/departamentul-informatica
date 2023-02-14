import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { registerSchema } from "@/schemas/authSchema";
import { Link } from "react-router-dom";
import styles from "./RegisterPage.module.scss";
import Input from "@components/Input/Input";

const onSubmit = (values, actions) => {
    actions.resetForm();
    // TODO: send to backend & redirect to login
};

const RegisterPage = () => {
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
                    <Link to={`/${i18n.language}/login`}>
                        {t("register-login-link")}
                    </Link>
                </i>
            </p>
        </div>
    );
};

export default RegisterPage;
