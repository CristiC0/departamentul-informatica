import { useEffect } from "react";
import axios from "axios";
const GroupSelector = ({ settings, groups, setGroups, setSettings }) => {
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
            <div className="container d-flex justify-content-around">
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Ciclu de studii {settings.cycle === 1 ? "I" : "II"}
                    </button>
                    <ul className="dropdown-menu">
                        <li
                            className="dropdown-item"
                            onClick={() => onSettingClick({ cycle: 1 })}
                        >
                            Licenta
                        </li>
                        <li
                            className="dropdown-item"
                            onClick={() => onSettingClick({ cycle: 2 })}
                        >
                            Master
                        </li>
                    </ul>
                </div>
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Anul de studii {settings.year}
                    </button>
                    <ul className="dropdown-menu">
                        <li
                            className="dropdown-item"
                            onClick={() => onSettingClick({ year: 1 })}
                        >
                            1
                        </li>
                        <li
                            className="dropdown-item"
                            onClick={() => onSettingClick({ year: 2 })}
                        >
                            2
                        </li>
                        {settings.cycle === 1 && (
                            <li
                                className="dropdown-item"
                                onClick={() => onSettingClick({ year: 3 })}
                            >
                                3
                            </li>
                        )}
                    </ul>
                </div>
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Grupa {settings.group?.name}
                    </button>
                    <ul className="dropdown-menu">
                        {groups.currentGroups &&
                            groups.currentGroups.map((group) => (
                                <li
                                    key={group.name}
                                    className="dropdown-item"
                                    onClick={() => onSettingClick({ group })}
                                >
                                    {group.name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Saptamana {settings.week === 0 ? "Para" : "Impara"}
                    </button>
                    <ul className="dropdown-menu">
                        <li
                            className="dropdown-item"
                            onClick={() => onSettingClick({ week: 0 })}
                        >
                            Para
                        </li>
                        <li
                            className="dropdown-item"
                            onClick={() => onSettingClick({ week: 1 })}
                        >
                            Impara
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default GroupSelector;
