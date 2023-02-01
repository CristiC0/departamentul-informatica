import { useTranslation } from "react-i18next";
import "./i18n";

import Navbar from "./components";

function App() {
    const { t } = useTranslation();
    return (
        <>
            <Navbar/>
        </>
    );
}

export default App;
