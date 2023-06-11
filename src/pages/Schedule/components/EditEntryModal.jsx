import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./EditEntryModal.module.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";

const EditEntryModal = ({
    settings,
    show,
    setShow,
    selectedEntry,
    setSelectedEntry,
    selectedDay,
    setSchedule,
}) => {
    const { t } = useTranslation();
    const week = [
        t("schedule__edit__anything"),
        t("schedule__odd"),
        t("schedule__even"),
    ];

    const [data, setData] = useState(selectedEntry);
    const [options, setOptions] = useState(null);

    useEffect(() => {
        setData(selectedEntry);
    }, [selectedEntry]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/courses`)
            .then(({ data }) =>
                setOptions((oldState) => ({ ...oldState, courses: data }))
            )
            .catch((error) => console.error(error));

        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/teachers`)
            .then(({ data }) =>
                setOptions((oldState) => ({
                    ...oldState,
                    teachers: data,
                }))
            )
            .catch((error) => console.error(error));
    }, []);

    const clickHandler = async () => {
        const body = {
            time: selectedDay.time,
            day: selectedDay.day + 1,
            groupId: settings.group.id,
            courseId: data?.courseId ? data.courseId : options?.courses[0].id,
            teacherId: data?.teacherId
                ? data.teacherId
                : options?.teachers[0].id,
            room: data?.room ? data.room : "",
            week: data?.week ? data.week : 0,
            type: data?.type,
        };
        if (!selectedEntry) {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/schedule`,
                body
            );
        } else {
            await axios.patch(
                `${import.meta.env.VITE_API_BASE_URL}/schedule/${data.id}`,
                body
            );
        }

        setData(null);
        handleClose();

        await axios
            .get(
                `${import.meta.env.VITE_API_BASE_URL}/schedule/group/${
                    settings.group.id
                }`
            )
            .then(({ data }) => {
                setSchedule(data);
            })
            .catch((err) => console.error(err));
    };

    const handleClose = () => {
        setShow(false);
        setSelectedEntry(null);
    };
    const deleteEntry = async () => {
        handleClose();
        await axios
            .delete(`${import.meta.env.VITE_API_BASE_URL}/schedule/${data.id}`)
            .catch((err) => console.error(err));
        await axios
            .get(
                `${import.meta.env.VITE_API_BASE_URL}/schedule/group/${
                    settings.group.id
                }`
            )
            .then(({ data }) => {
                setSchedule(data);
            })
            .catch((err) => console.error(err));
    };

    if (!options) return null;
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                className={styles.modal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("schedule__edit__title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`w-75 m-auto ${styles.body}`}>
                    <div className="row my-2">
                        <label htmlFor="room" className="col-6">
                            Cabinetul:
                        </label>
                        <input
                            className="col-6"
                            type="text"
                            id="room"
                            value={data?.room}
                            onChange={(e) => {
                                setData((oldData) => ({
                                    ...oldData,
                                    room: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div className="row my-2">
                        <label htmlFor="room" className="col-6">
                            {t("schedule__edit__course")}:
                        </label>
                        <div className="col-6 dropdown p-0">
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="w-100"
                                    variant="dark"
                                    id="dropdown-basic"
                                >
                                    {data?.courseId
                                        ? (options?.courses?.find(
                                              (course) =>
                                                  course.id === data.courseId
                                          )).name
                                        : options?.courses?.[0].name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    className={`${styles.menu} w-100 overflow-x-hidden overflow-y-scroll`}
                                >
                                    {options?.courses?.map((course) => (
                                        <Dropdown.Item
                                            key={course.id}
                                            onClick={() => {
                                                setData((oldData) => ({
                                                    ...oldData,
                                                    courseId: course.id,
                                                }));
                                            }}
                                        >
                                            {course.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="row my-2">
                        <label htmlFor="room" className="col-6">
                            {t("schedule__edit__teacher")}:
                        </label>
                        {options.teachers && (
                            <Dropdown className="col-6 dropdown p-0">
                                <Dropdown.Toggle
                                    className="w-100"
                                    variant="dark"
                                    id="dropdown-basic"
                                >
                                    {data?.teacherId
                                        ? `${
                                              (options?.teachers.find(
                                                  (teacher) =>
                                                      teacher.id ===
                                                      data.teacherId
                                              )).firstName
                                          } ${
                                              (options?.teachers.find(
                                                  (teacher) =>
                                                      teacher.id ===
                                                      data.teacherId
                                              )).lastName
                                          } `
                                        : `${options?.teachers[0].firstName} ${options?.teachers[0].lastName} `}
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    className={`${styles.menu} w-100 overflow-x-hidden overflow-y-scroll`}
                                >
                                    {options?.teachers.map((teacher) => (
                                        <Dropdown.Item
                                            key={teacher.id}
                                            onClick={() => {
                                                setData((oldData) => ({
                                                    ...oldData,
                                                    teacherId: teacher.id,
                                                }));
                                            }}
                                        >
                                            {`${teacher.firstName} ${teacher.lastName} `}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </div>
                    <div className="row my-2">
                        <label htmlFor="room" className="col-6">
                            {t("schedule__edit__week")}:
                        </label>
                        {options.teachers && (
                            <div className="col-6 dropdown p-0">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className="w-100"
                                        variant="dark"
                                        id="dropdown-basic"
                                    >
                                        {data?.week ? week[data.week] : week[0]}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        className={`${styles.menu} w-100 overflow-x-hidden overflow-y-scroll`}
                                    >
                                        {week.map((value, index) => (
                                            <Dropdown.Item
                                                key={value}
                                                onClick={() => {
                                                    setData((oldData) => ({
                                                        ...oldData,
                                                        week: index,
                                                    }));
                                                }}
                                            >
                                                {value}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                    <div className="row my-2">
                        <label htmlFor="room" className="col-6">
                            {t("schedule__edit__type")}:
                        </label>
                        {options.teachers && (
                            <div className="col-6 dropdown p-0">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className="w-100"
                                        variant="dark"
                                        id="dropdown-basic"
                                    >
                                        {data?.type ? data.type : "Nici un tip"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        className={`${styles.menu} w-100 overflow-x-hidden overflow-y-scroll`}
                                    >
                                        <Dropdown.Item
                                            onClick={() => {
                                                setData((oldData) => ({
                                                    ...oldData,
                                                    type: "curs",
                                                }));
                                            }}
                                        >
                                            {t("schedule__edit__type_course")}
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setData((oldData) => ({
                                                    ...oldData,
                                                    type: "seminar",
                                                }));
                                            }}
                                        >
                                            {t("schedule__edit__type__seminar")}
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setData((oldData) => ({
                                                    ...oldData,
                                                    type: "lab",
                                                }));
                                            }}
                                        >
                                            {t("schedule__edit__type_lab")}
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setData((oldData) => ({
                                                    ...oldData,
                                                    type: null,
                                                }));
                                            }}
                                        >
                                            {t("schedule__edit__type_none")}
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClose}
                    >
                        {t("schedule__edit__type_cancel")}
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={deleteEntry}
                    >
                        {t("schedule__edit__type_delete")}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-dark"
                        data-bs-dismiss="modal"
                        onClick={clickHandler}
                    >
                        {t("schedule__edit__type_save")}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditEntryModal;
