import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
const useNews = (id) => {
    const createNews = ({ title, priority, content }) => {
        const body = {
            title,
            priority,
            content: JSON.stringify(content),
        };

        (async () => {
            const response = await axios
                .post(`${import.meta.env.VITE_API_BASE_URL}/news`, body, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
                .catch((err) => console.error(err));
        })();
    };

    const [newsJSX, setNewsJSX] = useState(null);
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

                setNewsJSX(parse(output));
                // console.log(data);
            })();
    }, []);
    return { createNews, newsJSX };
};

export default useNews;
