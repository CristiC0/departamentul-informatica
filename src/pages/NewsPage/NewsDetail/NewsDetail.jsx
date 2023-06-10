import { useParams } from "react-router-dom";
import useNews from "@hooks/useNews";
import styles from "./NewsDetail.module.scss";
const NewsDetail = () => {
    const { id } = useParams();

    const { data } = useNews(id);
    if (!data) return <>Loading...</>;
    return (
        <div className={styles.container}>
            <h1>{data.title}</h1>
            <h6>
                {`${data.author} -
                ${
                    new Date(data.createdAt)
                        .toLocaleString("en-GB")
                        .split(",")[0]
                }`}
            </h6>
            <img src={data.thumbnail} alt="" />

            {data.content}
        </div>
    );
};

export default NewsDetail;
