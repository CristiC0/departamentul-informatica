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
import { updateUserSchema } from "@schemas/userSchema";
import useSort from "@hooks/useSort";
import styles from "../styles.module.scss";
const UserSection = () => {
    const [users, sortUsers] = useSort();
    const [asc, setAsc] = useState(false);
    const [selectedUser, setSelectedUser] = useState();

    const [showDelete, setShowDelete] = useState(false);
    const [showEditEntry, setShowEditEntry] = useState(false);

    useEffect(() => {
        update();
    }, []);

    const update = () => {
        setSelectedUser(null);
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                sortUsers("firstName", true, data);
            })
            .catch((err) => console.error(err));
    };

    const updateRole = async (role, user) => {
        await axios
            .patch(
                `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}`,
                { role },
                {
                    withCredentials: true,
                }
            )
            .catch((err) => console.error(err));
        update();
    };

    const deleteFunction = async () => {
        await axios
            .delete(
                `${import.meta.env.VITE_API_BASE_URL}/users/${selectedUser.id}`,
                {
                    withCredentials: true,
                }
            )
            .catch((err) => console.error(err));
        update();
    };

    const deleteHandler = (user) => {
        setSelectedUser(user);
        setShowDelete(true);
    };

    const editHandler = (user) => {
        setSelectedUser(user);
        setShowEditEntry(true);
    };

    const sortHandler = (property) => {
        sortUsers(property, asc);
        setAsc(!asc);
    };
    const onSubmit = (values, actions) => {
        if (values.password === "") delete values.password;
        (async () => {
            await axios
                .patch(
                    `${import.meta.env.VITE_API_BASE_URL}/users/${
                        selectedUser.id
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
            firstName: selectedUser?.firstName || "",
            lastName: selectedUser?.lastName || "",
            username: selectedUser?.username || "",
            email: selectedUser?.email || "",
            password: "",
        },
        validationSchema: updateUserSchema,
        onSubmit,
        enableReinitialize: true,
    });

    if (!users)
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
                            onClick={() => sortHandler("lastName")}
                            className={styles.clickable}
                        >
                            Last Name
                        </th>
                        <th
                            onClick={() => sortHandler("firstName")}
                            className={styles.clickable}
                        >
                            First Name
                        </th>
                        <th
                            onClick={() => sortHandler("username")}
                            className={styles.clickable}
                        >
                            Username
                        </th>
                        <th
                            onClick={() => sortHandler("email")}
                            className={styles.clickable}
                        >
                            Email
                        </th>
                        <th
                            onClick={() => sortHandler("role")}
                            className={styles.clickable}
                        >
                            Role
                        </th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>
                                <MdOutlineEdit
                                    className={`center ${styles.clickable}`}
                                    onClick={() => editHandler(user)}
                                />
                            </td>
                            <td>{user?.lastName}</td>
                            <td>{user?.firstName}</td>
                            <td>{user?.username}</td>
                            <td>{user?.email}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className="w-100"
                                        variant="dark"
                                        id="dropdown-basic"
                                    >
                                        {user?.role}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="w-100">
                                        {["ADMIN", "TEACHER", "USER"].map(
                                            (role) => (
                                                <Dropdown.Item
                                                    key={role}
                                                    onClick={() => {
                                                        updateRole(role, user);
                                                    }}
                                                >
                                                    {role}
                                                </Dropdown.Item>
                                            )
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteHandler(user)}
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
                title="Delete User"
                deleteFunction={deleteFunction}
            >
                <span>
                    You sure you want to delete user {selectedUser?.username}?
                </span>
            </DeleteModal>
            {selectedUser && (
                <EditEntryModal
                    show={showEditEntry}
                    setShow={setShowEditEntry}
                    onSubmit={handleSubmit}
                    title="Edit User"
                >
                    <Form.Group className="mb-2">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.firstName}
                            touched={touched.firstName}
                        />
                        {errors.firstName && (
                            <Form.Text className="text-danger">
                                {errors.firstName}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.lastName}
                            touched={touched.lastName}
                        />
                        {errors.lastName && (
                            <Form.Text className="text-danger">
                                {errors.lastName}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.username}
                            touched={touched.username}
                        />
                        {errors.username && (
                            <Form.Text className="text-danger">
                                {errors.username}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email}
                            touched={touched.email}
                        />
                        {errors.email && (
                            <Form.Text className="text-danger">
                                {errors.email}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>New password</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.password}
                            touched={touched.password}
                        />
                        {errors.password && (
                            <Form.Text className="text-danger">
                                {errors.password}
                            </Form.Text>
                        )}
                    </Form.Group>
                </EditEntryModal>
            )}
        </>
    );
};

export default UserSection;
