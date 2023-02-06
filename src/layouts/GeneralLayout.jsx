import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function GeneralLayout() {

    return (
        <>
            <header className="header">
                <Navbar />
            </header>
            <main className="container">
                <Outlet />
            </main>
            <footer className="footer">

            </footer>
        </>
    );
}

export default GeneralLayout;