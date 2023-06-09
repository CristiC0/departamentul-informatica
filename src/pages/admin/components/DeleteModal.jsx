import axios from "axios";
import Modal from "react-bootstrap/Modal";

const DeleteTimeModal = ({
    show,
    setShow,
    update,
    title,
    deleteFunction,
    children,
}) => {
    const handleClose = () => {
        setShow(false);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
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
                    onClick={deleteFunction}
                >
                    Yes
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteTimeModal;
