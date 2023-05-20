import { NodeViewWrapper } from "@tiptap/react";
import styles from "./styles.module.scss";
import { RiImageAddFill } from "react-icons/ri";
import axios from "axios";
import { useEditorContext } from "@context/EditorContext";
import { useState } from "react";
const priorities = { High: 1, Normal: 2, Low: 3 };

const MandatoryElements = () => {
    const { setData, data } = useEditorContext();
    const [image, setImage] = useState("Upload Image");
    const titleChangeHandler = (event) => {
        setData((oldData) => ({
            ...oldData,
            title: event.target.value,
        }));
    };

    const imageChangeHandler = (event) => {
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        axios
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/upload/image/news`,
                formData
            )
            .then(({ data }) => {
                setImage(event.target.files[0].name);
                setData((oldData) => ({
                    ...oldData,
                    thumbnail: data.imagePath,
                }));
            })
            .catch((error) => console.error(error));
    };

    const priorityClickHandler = (priority) => {
        setData((oldData) => ({
            ...oldData,
            priority,
        }));
    };

    return (
        <>
            <NodeViewWrapper className={styles["mandatory-elements"]}>
                <input
                    className={styles["mandatory-elements__title"]}
                    as="h1"
                    placeholder="Title"
                    onChange={titleChangeHandler}
                />

                <div className="row mt-4">
                    <div
                        className={`col-6 ${styles["mandatory-elements__thumbnail"]}`}
                    >
                        <label
                            htmlFor="thumbnail"
                            className="m-auto d-flex align-items-center justify-content-center"
                            contentEditable={false}
                        >
                            {image === "Upload Image" && (
                                <RiImageAddFill size={30} />
                            )}
                            <span> {image} </span>
                        </label>
                        <div contentEditable={false}>
                            <input
                                type="file"
                                onChange={imageChangeHandler}
                                id="thumbnail"
                                hidden={true}
                            />
                        </div>
                    </div>
                    <div
                        className={`col-6 ${styles["mandatory-elements__priority"]}`}
                    >
                        <div className={styles.group}>
                            <button
                                className={
                                    data.priority === priorities["High"]
                                        ? styles["but--selected"]
                                        : ""
                                }
                                onClick={() =>
                                    priorityClickHandler(priorities["High"])
                                }
                            >
                                High
                            </button>
                            <button
                                className={
                                    data.priority === priorities["Normal"]
                                        ? styles["but--selected"]
                                        : ""
                                }
                                onClick={() =>
                                    priorityClickHandler(priorities["Normal"])
                                }
                            >
                                Normal
                            </button>
                            <button
                                className={
                                    data.priority === priorities["Low"]
                                        ? styles["but--selected"]
                                        : ""
                                }
                                onClick={() =>
                                    priorityClickHandler(priorities["Low"])
                                }
                            >
                                Low
                            </button>
                        </div>
                    </div>
                </div>
            </NodeViewWrapper>
        </>
    );
};

export default MandatoryElements;
