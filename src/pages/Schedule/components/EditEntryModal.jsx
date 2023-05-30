import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./EditEntryModal.module.scss";
const week = ["Oricare", "Impara", "Para"];
const EditEntryModal = ({
    settings,
    show,
    setShow,
    selectedEntry,
    setSelectedEntry,
    selectedDay,
    setSchedule,
}) => {
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
                `${import.meta.env.VITE_API_BASE_URL}/schedule/${
                    selectedEntry.id
                }`,
                body
            );
        }

        setShow(false);
        setData(null);

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
                    <Modal.Title>Edit entry</Modal.Title>
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
                            Cursul:
                        </label>
                        <div className="col-6 dropdown p-0">
                            <button
                                className="btn btn-dark dropdown-toggle w-100"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {data?.courseId
                                    ? (options?.courses?.find(
                                          (course) =>
                                              course.id === data.courseId
                                      )).name
                                    : options?.courses?.[0].name}
                            </button>
                            <ul className="dropdown-menu w-100 overflow-x-hidden overflow-y-scroll">
                                {options?.courses.map((course) => (
                                    <li
                                        key={course.id}
                                        className="dropdown-item"
                                        onClick={() => {
                                            setData((oldData) => ({
                                                ...oldData,
                                                courseId: course.id,
                                            }));
                                        }}
                                    >
                                        {course.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="row my-2">
                        <label htmlFor="room" className="col-6">
                            Profesorul:
                        </label>
                        {options.teachers && (
                            <div className="col-6 dropdown p-0">
                                <button
                                    className="btn btn-dark dropdown-toggle w-100"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
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
                                    {}
                                </button>
                                <ul className="dropdown-menu w-100 overflow-x-hidden overflow-y-scroll">
                                    {options?.teachers.map((teacher) => (
                                        <li
                                            key={teacher.id}
                                            className="dropdown-item"
                                            onClick={() => {
                                                setData((oldData) => ({
                                                    ...oldData,
                                                    teacherId: teacher.id,
                                                }));
                                            }}
                                        >
                                            {`${teacher.firstName} ${teacher.lastName} `}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="row my-2">
                        <label htmlFor="room" className="col-6">
                            Saptamana:
                        </label>
                        {options.teachers && (
                            <div className="col-6 dropdown p-0">
                                <button
                                    className="btn btn-dark dropdown-toggle w-100 overflow-hidden"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {data?.week ? week[data.week] : week[0]}
                                </button>
                                <ul className="dropdown-menu w-100 overflow-x-hidden overflow-y-scroll ">
                                    {week.map((value, index) => (
                                        <li
                                            key={value}
                                            className="dropdown-item"
                                            onClick={() => {
                                                setData((oldData) => ({
                                                    ...oldData,
                                                    week: index,
                                                }));
                                            }}
                                        >
                                            {value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="row my-2">
                        <label htmlFor="room" className="col-6">
                            Tipul:
                        </label>
                        {options.teachers && (
                            <div className="col-6 dropdown p-0">
                                <button
                                    className="btn btn-dark dropdown-toggle w-100 overflow-hidden"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {data?.type ? data.type : "Nici un tip"}
                                </button>
                                <ul className="dropdown-menu w-100 overflow-x-hidden overflow-y-scroll ">
                                    <li
                                        className="dropdown-item"
                                        onClick={() => {
                                            setData((oldData) => ({
                                                ...oldData,
                                                type: "curs",
                                            }));
                                        }}
                                    >
                                        Curs
                                    </li>
                                    <li
                                        className="dropdown-item"
                                        onClick={() => {
                                            setData((oldData) => ({
                                                ...oldData,
                                                type: "seminar",
                                            }));
                                        }}
                                    >
                                        Seminar
                                    </li>
                                    <li
                                        className="dropdown-item"
                                        onClick={() => {
                                            setData((oldData) => ({
                                                ...oldData,
                                                type: "lab",
                                            }));
                                        }}
                                    >
                                        Laborator
                                    </li>
                                    <li
                                        className="dropdown-item"
                                        onClick={() => {
                                            setData((oldData) => ({
                                                ...oldData,
                                                type: null,
                                            }));
                                        }}
                                    >
                                        Nici un tip
                                    </li>
                                </ul>
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
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-dark"
                        data-bs-dismiss="modal"
                        onClick={clickHandler}
                    >
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditEntryModal;
