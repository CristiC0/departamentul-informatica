import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import Document from "@tiptap/extension-document";
import styles from "./styles.module.scss";
import TextAlign from "@tiptap/extension-text-align";
import FloatingMenu from "./FloatingMenu";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";
import useNews from "@hooks/useNews";
import MandatoryElements from "./Extension.jsx";
import "./placeholder.scss";
import "./editor.scss";
import { useEditorContext } from "@context/EditorContext";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const CustomDocument = Document.extend({
    content: "mandatoryComponents block*",
});

const Editor = () => {
    const { i18n } = useTranslation();
    const { data, validate } = useEditorContext();

    const editor = useEditor({
        extensions: [
            CustomDocument,
            StarterKit.configure({ document: false }),
            Typography,
            Underline,
            Blockquote.configure({
                HTMLAttributes: {
                    class: styles.blockquote,
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            MandatoryElements,
        ],
        content: ` <mandatory-components></mandatory-components>`,
        autofocus: true,
    });

    const { createNews } = useNews();
    const navigate = useNavigate();
    const clickHandler = async () => {
        const documentJSON = editor.getJSON();
        documentJSON.content.shift();
        const createdNews = await createNews({
            title: data.title,
            thumbnail: data.thumbnail,
            priority: data.priority,
            content: documentJSON,
        });

        navigate(`/${i18n.language}/news/${createdNews.id}`);
    };
    return (
        <>
            <div className={styles.editor}>
                <FloatingMenu editor={editor} />
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
            </div>

            <div>
                <button
                    className={styles.create}
                    onClick={clickHandler}
                    disabled={!validate()}
                >
                    Create
                </button>
            </div>
        </>
    );
};

export default Editor;
