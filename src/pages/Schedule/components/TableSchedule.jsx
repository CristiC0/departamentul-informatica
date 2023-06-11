import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import styles from "./TableSchedule.module.scss";
import AddTimeModal from "./AddTimeModal";
import DeleteTimeModal from "./DeleteTimeModal";
import EditEntryModal from "./EditEntryModal";
import { useTranslation } from "react-i18next";

const modalId = "addTime";

const TableSchedule = ({ schedule, edit, settings, setSchedule }) => {
    const { t } = useTranslation();
    const days = [
        t("schedule__day-1"),
        t("schedule__day-2"),
        t("schedule__day-3"),
        t("schedule__day-4"),
        t("schedule__day-5"),
        t("schedule__day-6"),
        t("schedule__day-7"),
    ];

    const [times, setTimes] = useState(null);
    const [deleteTime, setDeleteTime] = useState(null);
    const [showDeleteTime, setShowDeleteTime] = useState(false);

    const [selectedDay, setSelectedDay] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [showEditEntry, setShowEditEntry] = useState(false);

    const [teachers, setTeachers] = useState(null);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/schedule/time`)
            .then(({ data }) => setTimes(data));
    }, [schedule]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/teachers`)
            .then(({ data }) => setTeachers(data));
    }, []);

    useEffect(() => {
        if (deleteTime && edit) setShowDeleteTime(true);
    }, [deleteTime]);

    const formatData = (day, time, index) => {
        const entry = day.find((entry) => entry.time === time);
        const teacher = teachers?.find(
            (teacher) => teacher.id === entry?.teacherId
        );
        const render =
            entry &&
            (entry.week === 0 || entry.week === settings.week) &&
            entry?.course?.acronym;
        return (
            <td
                key={`${time}-${days[index]}`}
                onClick={() => cellClickHandler(entry, time, index)}
            >
                {render && (
                    <div>
                        <p className="m-0 fw-bold">
                            {`${entry.course.acronym} ${
                                entry?.type ? "(" + entry.type + ")" : ""
                            }`}
                        </p>
                        <small className="m-0">{`${teacher?.firstName} ${teacher?.lastName}`}</small>{" "}
                        <br />
                        <small className="m-0">{entry.room}</small>
                    </div>
                )}
            </td>
        );
    };

    const cellClickHandler = (entry, time, day) => {
        if (!edit) return;
        setSelectedDay({ time, day });
        setShowEditEntry(true);
        if (entry && (settings.week === entry.week || entry.week === 0))
            setSelectedEntry(entry);
    };

    if ((!schedule || schedule.length === 0) && !edit) return null;

    return (
        <>
            <table
                className={`${styles.table} table table-bordered table-responsive text-center `}
            >
                <thead>
                    <tr>
                        <th scope="row" className="align-middle"></th>
                        {days.map((day) => {
                            return (
                                <th scope="col" key={day}>
                                    {day}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody
                    className={`table-group-divider ${edit ? styles.edit : ""}`}
                >
                    {times?.map((time) => {
                        let existsEntry = false;
                        if (schedule)
                            loop: for (let day of schedule) {
                                for (let entry of day) {
                                    console.log(entry.week, settings.week - 1);
                                    if (
                                        entry.time === time &&
                                        (entry.week === 0 ||
                                            entry.week !== settings.week - 1)
                                    ) {
                                        existsEntry = true;
                                        break loop;
                                    }
                                }
                            }
                        if (!existsEntry) return null;
                        return (
                            <tr key={time}>
                                <th
                                    scope="row"
                                    className="align-middle"
                                    onClick={() => setDeleteTime(time)}
                                >
                                    {time}
                                </th>
                                {schedule?.map((day, index) => {
                                    return formatData(day, time, index);
                                })}
                            </tr>
                        );
                    })}
                    {edit && (
                        <tr>
                            <th
                                scope="row"
                                data-bs-toggle="modal"
                                data-bs-target={`#${modalId}`}
                                className={styles.addTime}
                            >
                                <MdOutlineAdd />
                            </th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <AddTimeModal
                id={modalId}
                settings={settings}
                setTimes={setTimes}
                setSchedule={setSchedule}
            />
            <DeleteTimeModal
                settings={settings}
                show={showDeleteTime}
                setShow={setShowDeleteTime}
                setTimes={setTimes}
                deleteTime={deleteTime}
                setDeleteTime={setDeleteTime}
            />
            <EditEntryModal
                settings={settings}
                show={showEditEntry}
                setShow={setShowEditEntry}
                selectedEntry={selectedEntry}
                setSelectedEntry={setSelectedEntry}
                selectedDay={selectedDay}
                setSchedule={setSchedule}
            />
        </>
    );
};

export default TableSchedule;
