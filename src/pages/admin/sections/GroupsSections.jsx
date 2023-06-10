import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import { MdOutlineEdit } from "react-icons/md";
import DeleteModal from "../components/DeleteModal";
import EditEntryModal from "../components/EditEntryModal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import useSort from "@hooks/useSort";
import styles from "../styles.module.scss";
import { groupsSchema } from "@schemas/groupsSchema";
const GroupsSection = () => {
    const [groups, setGroups] = useSort();
    const [asc, setAsc] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState();

    const [showDelete, setShowDelete] = useState(false);
    const [showEditEntry, setShowEditEntry] = useState(false);

    useEffect(() => {
        update();
    }, []);

    const update = () => {
        setSelectedGroup(null);
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/groups`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                setGroups("name", true, data);
            })
            .catch((err) => console.error(err));
    };

    const deleteFunction = async () => {
        await axios
            .delete(
                `${import.meta.env.VITE_API_BASE_URL}/groups/${
                    selectedGroup.id
                }`,
                {
                    withCredentials: true,
                }
            )
            .catch((err) => console.error(err));
        update();
    };

    const deleteHandler = (groups) => {
        setSelectedGroup(groups);
        setShowDelete(true);
    };

    const editHandler = (groups) => {
        setSelectedGroup(groups);
        setShowEditEntry(true);
    };

    const sortHandler = (property) => {
        setGroups(property, asc);
        setAsc(!asc);
    };

    const onSubmit = (values, actions) => {
        if (values.password === "") delete values.password;
        (async () => {
            await axios
                .patch(
                    `${import.meta.env.VITE_API_BASE_URL}/groups/${
                        selectedGroup.id
                    }`,
                    { ...values },
                    {
                        withCredentials: true,
                    }
                )
                .catch((err) => console.error(err));
            actions.resetForm();
            update();
        })();
    };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            name: selectedGroup?.name || "",
            year: selectedGroup?.year || "",
            cycle: selectedGroup?.cycle || "",
        },
        validationSchema: groupsSchema,
        onSubmit,
        enableReinitialize: true,
    });

    if (!groups)
        return (
            <div className="w-100 d-flex justify-content-center align-content-center">
                <Spinner animation="border" variant="dark" />
            </div>
        );

    return (
        <>
            <Table striped responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Edit</th>
                        <th
                            onClick={() => sortHandler("name")}
                            className={styles.clickable}
                        >
                            Name
                        </th>
                        <th
                            className={styles.clickable}
                            onClick={() => sortHandler("year")}
                        >
                            Year
                        </th>
                        <th
                            onClick={() => sortHandler("cycle")}
                            className={styles.clickable}
                        >
                            Cycle
                        </th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group, index) => (
                        <tr key={group.id}>
                            <td>{index + 1}</td>
                            <td>
                                <MdOutlineEdit
                                    className={`center ${styles.clickable}`}
                                    onClick={() => editHandler(group)}
                                />
                            </td>
                            <td>{group?.name}</td>
                            <td>{group?.cycle}</td>
                            <td>{group?.year}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteHandler(groups)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DeleteModal
                show={showDelete}
                setShow={setShowDelete}
                update={update}
                title="Delete Group"
                deleteFunction={deleteFunction}
            >
                <span>You sure you want to delete the groups ?</span>
            </DeleteModal>
            {selectedGroup && (
                <EditEntryModal
                    show={showEditEntry}
                    setShow={setShowEditEntry}
                    onSubmit={handleSubmit}
                    title="Edit Group"
                >
                    <Form.Group className="mb-2">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name}
                            touched={touched.name}
                        />
                        {errors.name && (
                            <Form.Text className="text-danger">
                                {errors.name}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Cycle</Form.Label>
                        <Form.Control
                            type="number"
                            name="cycle"
                            value={values.cycle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.cycle}
                            touched={touched.cycle}
                        />
                        {errors.cycle && (
                            <Form.Text className="text-danger">
                                {errors.cycle}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={values.year}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.year}
                            touched={touched.year}
                        />
                        {errors.year && (
                            <Form.Text className="text-danger">
                                {errors.year}
                            </Form.Text>
                        )}
                    </Form.Group>
                </EditEntryModal>
            )}
        </>
    );
};

export default GroupsSection;
