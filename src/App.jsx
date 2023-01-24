import { useTranslation } from "react-i18next";
import "./i18n";
function App() {
    const { t } = useTranslation();
    return (
        <>
            <h1 className=" text-8xl text-center">{t("greeting")}</h1>
            <h1 className=" text-8xl text-center">{t("greeting")}</h1>
        </>
    );
}

export default App;
