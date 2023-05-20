import { useParams } from "react-router-dom";
import useNews from "@hooks/useNews";
const NewsDetail = () => {
    const { id } = useParams();

    const { data } = useNews(id);
    if (!data) return <>Loading...</>;
    return (
        <>
            <h1>{data.title}</h1>
            <h3>{data.author}</h3>
            <p>{new Date(data.createdAt).toLocaleString()}</p>
            <img src={data.thumbnail} alt="" />
            {data.content}
        </>
    );
};

export default NewsDetail;
