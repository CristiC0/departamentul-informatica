import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
const useNews = (id) => {
    const createNews = async ({ title, priority, content, thumbnail }) => {
        const body = {
            title,
            priority,
            thumbnail,
            content: JSON.stringify(content),
        };

        const response = await axios
            .post(`${import.meta.env.VITE_API_BASE_URL}/news`, body, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            .catch((err) => console.error(err));
        return response.data.news;
    };

    const getFirstText = () => {
        if (!json?.content?.[0]?.content?.[0]?.text) return "";
        return json.content[0].content[0].text;
    };

    const [json, setJson] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        if (id)
            (async () => {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/news/${id}`
                );
                const output = generateHTML(JSON.parse(data.content), [
                    StarterKit,
                    Typography,
                    Underline,
                ]);
                setJson(JSON.parse(data.content));
                setData({ ...data, content: parse(output) });
            })();
    }, []);
    return { createNews, data, getFirstText };
};

export default useNews;
