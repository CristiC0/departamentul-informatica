import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const EditEntryModal = ({ show, setShow, title, onSubmit, children }) => {
    const handleClose = () => {
        setShow(false);
    };
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Form onSubmit={onSubmit}>
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
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-dark"
                        onClick={handleClose}
                    >
                        Update
                    </button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditEntryModal;
