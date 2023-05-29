import { useState, useEffect } from "react";
import GroupSelector from "./components/GroupSelector";
import TableSchedule from "./components/TableSchedule";
import axios from "axios";
import { useAuthContext } from "@context/AuthContext.jsx";
const Schedule = () => {
    const [settings, setSettings] = useState({
        cycle: 1,
        year: 3,
        week: 1,
        group: null,
    });
    const [groups, setGroups] = useState({
        allGroups: null,
        currentGroups: null,
    });

    const [schedule, setSchedule] = useState(null);

    const { user } = useAuthContext();
    const edit = user.role === "ADMIN";

    useEffect(() => {
        if (
            groups?.allGroups &&
            groups.allGroups.length !== 0 &&
            settings.group
        )
            axios
                .get(
                    `${import.meta.env.VITE_API_BASE_URL}/schedule/group/${
                        groups.allGroups.find(
                            (group) => group.name === settings.group.name
                        ).id
                    }`
                )
                .then(({ data }) => {
                    setSchedule(data);
                })
                .catch((err) => console.error(err));
    }, [settings.cycle, settings.year, settings.group, groups.allGroups]);
    return (
        <>
            <GroupSelector
                settings={settings}
                groups={groups}
                setSettings={setSettings}
                setGroups={setGroups}
            />
            <TableSchedule
                schedule={schedule}
                edit={edit}
                settings={settings}
                setSchedule={setSchedule}
            />
        </>
    );
};

export default Schedule;
