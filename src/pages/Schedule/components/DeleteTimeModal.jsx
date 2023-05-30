import axios from "axios";
import Modal from "react-bootstrap/Modal";

const DeleteTimeModal = ({
    settings,
    show,
    setShow,
    setTimes,
    deleteTime,
    setDeleteTime,
}) => {
    const clickHandler = async () => {
        await axios
            .delete(
                `${import.meta.env.VITE_API_BASE_URL}/schedule/${
                    settings.group.id
                }/${deleteTime}`
            )
            .catch((error) => console.error(error));
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/schedule/time`)
            .then(({ data }) => {
                setTimes(data);
            });

        setShow(false);
    };

    const handleClose = () => {
        setShow(false);
        setDeleteTime(null);
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete entries</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>
                        {`You sure you want to delete all entries that happen at 
                       ${deleteTime} ?`}
                    </span>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClose}
                    >
                        No
                    </button>
                    <button
                        type="submit"
                        className="btn btn-dark"
                        data-bs-dismiss="modal"
                        onClick={clickHandler}
                    >
                        Yes
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteTimeModal;
