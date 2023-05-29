import { useRef } from "react";
import { TiMinus } from "react-icons/ti";
import axios from "axios";
const AddTimeModal = ({ id, settings, setTimes, setSchedule }) => {
    const from = useRef(null);
    const to = useRef(null);

    const clickHandler = async () => {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/schedule`, {
            time: `${from.current.value}-${to.current.value}`,
            day: 1,
            groupId: settings.group.id,
        });
        from.current.value = "";
        to.current.value = "";
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/schedule/time`)
            .then(({ data }) => {
                setTimes(data);
            });
        axios
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
    return (
        <>
            <div
                className="modal fade"
                id={id}
                tabIndex="-1"
                aria-labelledby="exampleaddTime"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleaddTime"
                            >
                                Add Time
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-evenly  align-content-center">
                                <div className="d-flex flex-column  justify-content-center">
                                    <b>From</b>
                                    <input type="text" ref={from} />
                                </div>
                                <span className=" align-self-end">
                                    <TiMinus />
                                </span>
                                <div className="d-flex flex-column align-content-center">
                                    <b>To</b>
                                    <input type="text" ref={to} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="btn btn-dark"
                                data-bs-dismiss="modal"
                                onClick={clickHandler}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTimeModal;
