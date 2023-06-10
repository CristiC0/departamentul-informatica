import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserSection from "./sections/UserSection";
import NewsSection from "./sections/NewsSection";
import CoursesSection from "./sections/CoursesSections";
import GroupsSection from "./sections/GroupsSections";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const AdminActionsPage = () => {
    const { i18n } = useTranslation();
    const [goToAddNews, setGoToAddNews] = useState(false);
    return (
        <Tabs
            defaultActiveKey="user"
            id="justify-tab-example"
            className="m-3"
            justify
        >
            <Tab eventKey="user" title="Users">
                <UserSection />
            </Tab>
            <Tab eventKey="news" title="News">
                <NewsSection />
            </Tab>
            <Tab eventKey="courses" title="Courses">
                <CoursesSection />
            </Tab>
            <Tab eventKey="groups" title="Groups">
                <GroupsSection />
            </Tab>
        </Tabs>
    );
};

export default AdminActionsPage;
