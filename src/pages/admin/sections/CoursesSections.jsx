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
import { coursesSchema } from "@schemas/coursesSchema";
const CoursesSection = () => {
    const [courses, setCourses] = useSort();
    const [asc, setAsc] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState();

    const [showDelete, setShowDelete] = useState(false);
    const [users, setUsers] = useState();
    const [author, setAuthor] = useState();
    const [showEditEntry, setShowEditEntry] = useState(false);

    useEffect(() => {
        update();
    }, []);

    const update = () => {
        setSelectedCourse(null);
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/courses`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                console.log(data);
                setCourses("title", true, data);
            })
            .catch((err) => console.error(err));
    };

    const updatePriority = async (priority, courses) => {
        await axios
            .patch(
                `${import.meta.env.VITE_API_BASE_URL}/courses/${courses.id}`,
                { priority },
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
                `${import.meta.env.VITE_API_BASE_URL}/courses/${
                    selectedCourse.id
                }`,
                {
                    withCredentials: true,
                }
            )
            .catch((err) => console.error(err));
        update();
    };

    const deleteHandler = (courses) => {
        setSelectedCourse(courses);
        setShowDelete(true);
    };

    const editHandler = (courses) => {
        setSelectedCourse(courses);
        // setAuthor(users.find((user) => user.id === courses.authorId));
        setShowEditEntry(true);
    };

    const sortHandler = (property) => {
        setCourses(property, asc);
        setAsc(!asc);
    };

    const onSubmit = (values, actions) => {
        if (values.password === "") delete values.password;
        (async () => {
            await axios
                .patch(
                    `${import.meta.env.VITE_API_BASE_URL}/courses/${
                        selectedCourse.id
                    }`,
                    { ...values, authorId: author.id },
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
            name: selectedCourse?.name || "",
            acronym: selectedCourse?.acronym || "",
            description: selectedCourse?.description || "",
            content: selectedCourse?.content || "",
        },
        validationSchema: coursesSchema,
        onSubmit,
        enableReinitialize: true,
    });

    if (!courses)
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
                            onClick={() => sortHandler("acronym")}
                        >
                            Acronym
                        </th>
                        <th
                            onClick={() => sortHandler("description")}
                            className={styles.clickable}
                        >
                            Description
                        </th>
                        <th
                            onClick={() => sortHandler("content")}
                            className={styles.clickable}
                        >
                            Content
                        </th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={course.id}>
                            <td>{index + 1}</td>
                            <td>
                                <MdOutlineEdit
                                    className={`center ${styles.clickable}`}
                                    onClick={() => editHandler(course)}
                                />
                            </td>
                            <td>{course?.name}</td>
                            <td>{course?.acronym}</td>
                            <td>{course?.description}</td>
                            <td>{course?.content}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteHandler(courses)}
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
                title="Delete Course"
                deleteFunction={deleteFunction}
            >
                <span>You sure you want to delete the courses ?</span>
            </DeleteModal>
            {selectedCourse && (
                <EditEntryModal
                    show={showEditEntry}
                    setShow={setShowEditEntry}
                    onSubmit={handleSubmit}
                    title="Edit Course"
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
                        <Form.Label>Acronym</Form.Label>
                        <Form.Control
                            type="text"
                            name="acronym"
                            value={values.acronym}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.acronym}
                            touched={touched.acronym}
                        />
                        {errors.acronym && (
                            <Form.Text className="text-danger">
                                {errors.acronym}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.description}
                            touched={touched.description}
                        />
                        {errors.description && (
                            <Form.Text className="text-danger">
                                {errors.description}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            type="text"
                            name="content"
                            value={values.content}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.content}
                            touched={touched.content}
                        />
                        {errors.content && (
                            <Form.Text className="text-danger">
                                {errors.content}
                            </Form.Text>
                        )}
                    </Form.Group>
                </EditEntryModal>
            )}
        </>
    );
};

export default CoursesSection;
