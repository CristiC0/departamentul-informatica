import { useState, useEffect } from "react";
import GroupSelector from "./components/GroupSelector";
import TableSchedule from "./components/TableSchedule";
import axios from "axios";
const Schedule = () => {
    const [settings, setSettings] = useState({
        cycle: 1,
        year: 3,
        week: 0,
        group: null,
    });
    const [groups, setGroups] = useState({
        allGroups: null,
        currentGroups: null,
    });

    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/schedule`)
            .then(({ data }) => {
                setSchedule(data);
            })
            .catch((err) => console.error(err));
    }, [settings.cycle, settings.year, settings.group]);
    return (
        <>
            <GroupSelector
                settings={settings}
                groups={groups}
                setSettings={setSettings}
                setGroups={setGroups}
            />
            <TableSchedule schedule={schedule} />
        </>
    );
};

export default Schedule;
