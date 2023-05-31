import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

const GroupSelector = ({ settings, groups, setGroups, setSettings }) => {
    const [weekParity, setWeekParity] = useState(null);
    useEffect(() => {
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), 0, 1);
        const days = Math.floor(
            (currentDate - startDate) / (24 * 60 * 60 * 1000)
        );
        const weekNumber = Math.ceil(days / 7);
        setWeekParity(weekNumber % 2 === 0 ? 2 : 1);
        setSettings((oldState) => ({
            ...oldState,
            week: weekNumber % 2 === 0 ? 2 : 1,
        }));
    }, []);

    useEffect(() => {
        if (localStorage.getItem("scheduleSettings"))
            setSettings(JSON.parse(localStorage.getItem("scheduleSettings")));
    }, []);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/schedule/groups`)
            .then(({ data }) => {
                setGroups((oldState) => ({ ...oldState, allGroups: data }));
                if (!localStorage.getItem("scheduleSettings"))
                    setSettings((oldState) => ({
                        ...oldState,
                        group: data[0],
                    }));
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (groups.allGroups) {
            setGroups((oldState) => ({
                ...oldState,
                currentGroups: groups.allGroups.filter(
                    (group) =>
                        group.year === settings.year &&
                        group.cycle === settings.cycle
                ),
            }));
        }
    }, [settings.cycle, settings.year, settings.group, groups.allGroups]);

    const onSettingClick = (newValues) => {
        if (newValues?.cycle === 2 && settings.year === 3) newValues.year = 2;
        setSettings((oldState) => ({ ...oldState, ...newValues }));
        localStorage.setItem(
            "scheduleSettings",
            JSON.stringify({ ...settings, ...newValues })
        );
    };
    return (
        <>
            <div className="container d-flex justify-content-around my-3 flex-wrap align-content-center">
                <Dropdown>
                    <Dropdown.Toggle
                        className="my-2"
                        variant="dark"
                        id="dropdown-basic"
                    >
                        Ciclu de studii {settings.cycle === 1 ? "I" : "II"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => onSettingClick({ cycle: 1 })}
                        >
                            Licenta
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => onSettingClick({ cycle: 2 })}
                        >
                            Master
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle
                        className="my-2"
                        variant="dark"
                        id="dropdown-basic"
                    >
                        Anul de studii {settings.year}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => onSettingClick({ year: 1 })}
                        >
                            1
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => onSettingClick({ year: 2 })}
                        >
                            2
                        </Dropdown.Item>
                        {settings.cycle === 1 && (
                            <Dropdown.Item
                                onClick={() => onSettingClick({ year: 3 })}
                            >
                                3
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle
                        className="my-2"
                        variant="dark"
                        id="dropdown-basic"
                    >
                        Grupa {settings.group?.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {groups.currentGroups &&
                            groups.currentGroups.map((group) => (
                                <Dropdown.Item
                                    key={group.name}
                                    onClick={() => onSettingClick({ group })}
                                >
                                    {group.name}
                                </Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle
                        className="my-2"
                        variant="dark"
                        id="dropdown-basic"
                    >
                        Saptamana {settings.week === 2 ? "Para" : "Impara"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => onSettingClick({ week: 2 })}
                        >
                            Para
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => onSettingClick({ week: 1 })}
                        >
                            Impara
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <span className="d-table my-2">
                    <i className=" d-table-cell align-middle">
                        Acum este saptamana
                        <b>{weekParity === 1 ? " impara" : " para"}</b>
                    </i>
                </span>
            </div>
        </>
    );
};

export default GroupSelector;
