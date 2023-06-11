import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

const DeleteTimeModal = ({
    settings,
    show,
    setShow,
    setTimes,
    deleteTime,
    setDeleteTime,
}) => {
    const { t } = useTranslation();
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
                    <Modal.Title>
                        {t("schedule__delete__time__title")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>
                        {`${t("schedule__delete__time__alert")} 
                       ${deleteTime} ?`}
                    </span>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClose}
                    >
                        {t("schedule__no")}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-dark"
                        data-bs-dismiss="modal"
                        onClick={clickHandler}
                    >
                        {t("schedule__yes")}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteTimeModal;
