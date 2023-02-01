import { useTranslation } from "react-i18next";
import "./i18n";

import Navbar from "./components";

function App() {
    const { t } = useTranslation();
    return (
        <>
            <Navbar/>
            <h1 className=" text-8xl text-center">{t("greeting")}</h1>
        </>
    );
}

export default App;
