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
import { newsSchema } from "@schemas/newsSchema";
const NewsSection = () => {
    const [news, sortNews] = useSort();
    const [asc, setAsc] = useState(false);
    const [selectedNews, setSelectedNews] = useState();

    const [showDelete, setShowDelete] = useState(false);
    const [users, setUsers] = useState();
    const [author, setAuthor] = useState();
    const [showEditEntry, setShowEditEntry] = useState(false);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((err) => console.error(err));
        update();
    }, []);

    const update = () => {
        setSelectedNews(null);
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/news`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                sortNews("title", true, data);
            })
            .catch((err) => console.error(err));
    };

    const updatePriority = async (priority, news) => {
        await axios
            .patch(
                `${import.meta.env.VITE_API_BASE_URL}/news/${news.id}`,
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
                `${import.meta.env.VITE_API_BASE_URL}/news/${selectedNews.id}`,
                {
                    withCredentials: true,
                }
            )
            .catch((err) => console.error(err));
        update();
    };

    const deleteHandler = (news) => {
        setSelectedNews(news);
        setShowDelete(true);
    };

    const editHandler = (news) => {
        setSelectedNews(news);
        setAuthor(users.find((user) => user.id === news.authorId));
        setShowEditEntry(true);
    };

    const sortHandler = (property) => {
        sortNews(property, asc);
        setAsc(!asc);
    };

    const onSubmit = (values, actions) => {
        if (values.password === "") delete values.password;
        (async () => {
            await axios
                .patch(
                    `${import.meta.env.VITE_API_BASE_URL}/news/${
                        selectedNews.id
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
            title: selectedNews?.title || "",
            thumbnail: selectedNews?.thumbnail || "",
            author: selectedNews?.author || "",
        },
        validationSchema: newsSchema,
        onSubmit,
        enableReinitialize: true,
    });

    if (!news)
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
                            onClick={() => sortHandler("title")}
                            className={styles.clickable}
                        >
                            Title
                        </th>
                        <th className={styles.clickable}>Thumbnail</th>
                        <th
                            onClick={() => sortHandler("author")}
                            className={styles.clickable}
                        >
                            Author
                        </th>
                        <th
                            onClick={() => sortHandler("priority")}
                            className={styles.clickable}
                        >
                            Priority
                        </th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((news, index) => (
                        <tr key={news.id}>
                            <td>{index + 1}</td>
                            <td>
                                <MdOutlineEdit
                                    className={`center ${styles.clickable}`}
                                    onClick={() => editHandler(news)}
                                />
                            </td>
                            <td>{news?.title}</td>
                            <td>
                                <img
                                    className={`${styles["img--10"]}`}
                                    src={news?.thumbnail}
                                />
                            </td>
                            <td>{news?.author}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className="w-100"
                                        variant="dark"
                                        id="dropdown-basic"
                                    >
                                        {news?.priority}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className={`w-100 `}>
                                        {[1, 2, 3].map((priority) => (
                                            <Dropdown.Item
                                                key={priority}
                                                onClick={() => {
                                                    updatePriority(
                                                        priority,
                                                        news
                                                    );
                                                }}
                                            >
                                                {priority}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteHandler(news)}
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
                title="Delete News"
                deleteFunction={deleteFunction}
            >
                <span>You sure you want to delete the news ?</span>
            </DeleteModal>
            {selectedNews && (
                <EditEntryModal
                    show={showEditEntry}
                    setShow={setShowEditEntry}
                    onSubmit={handleSubmit}
                    title="Edit News"
                >
                    <Form.Group className="mb-2">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.title}
                            touched={touched.title}
                        />
                        {errors.title && (
                            <Form.Text className="text-danger">
                                {errors.title}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Thumbnail</Form.Label>
                        <Form.Control
                            type="text"
                            name="thumbnail"
                            value={values.thumbnail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.thumbnail}
                            touched={touched.thumbnail}
                        />
                        {errors.thumbnail && (
                            <Form.Text className="text-danger">
                                {errors.thumbnail}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Author</Form.Label>
                        {users && (
                            <div className="col-6 dropdown p-0">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className="w-100"
                                        variant="dark"
                                        id="dropdown-basic"
                                    >
                                        {author?.firstName +
                                            " " +
                                            author?.lastName}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        className={`${styles["dropdown-menu"]} w-100 overflow-x-hidden overflow-y-scroll`}
                                    >
                                        {users.map((user, index) => (
                                            <Dropdown.Item
                                                key={user.id}
                                                onClick={() => {
                                                    setAuthor(user);
                                                }}
                                            >
                                                {user.firstName +
                                                    " " +
                                                    user.lastName}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                    </Form.Group>
                </EditEntryModal>
            )}
        </>
    );
};

export default NewsSection;
