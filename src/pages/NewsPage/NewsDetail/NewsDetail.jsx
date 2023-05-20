import { useParams } from "react-router-dom";
import useNews from "@hooks/useNews";
const NewsDetail = () => {
    const { id } = useParams();

    const { newsJSX } = useNews(id);
    return <>{newsJSX}</>;
};

export default NewsDetail;
