import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
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
const CustomDocument = Document.extend({
    content: "mandatoryComponents paragraph block*",
});

const data = {
    title: "First News",
    priority: 1,
    content: {
        type: "doc",
        content: [
            {
                type: "heading",
                attrs: { textAlign: "left", level: 1 },
                content: [
                    {
                        type: "text",
                        marks: [{ type: "strike" }],
                        text: "News Title",
                    },
                ],
            },
            {
                type: "paragraph",
                attrs: { textAlign: "left" },
                content: [
                    {
                        type: "text",
                        marks: [{ type: "strike" }],
                        text: "Hello ther",
                    },
                    { type: "text", text: "e'" },
                ],
            },
            { type: "paragraph", attrs: { textAlign: "left" } },
            {
                type: "bulletList",
                content: [
                    {
                        type: "listItem",
                        content: [
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [{ type: "text", text: "Me" }],
                            },
                        ],
                    },
                    {
                        type: "listItem",
                        content: [
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [{ type: "text", text: "You" }],
                            },
                        ],
                    },
                ],
            },
            { type: "paragraph", attrs: { textAlign: "left" } },
        ],
    },
};

const Editor = () => {
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
            // Placeholder.configure({
            //     placeholder: ({ node }) => {
            //         if (node.type.name === "title") {
            //             return "Title";
            //         }
            //     },
            // }),
            MandatoryElements,
        ],
        content: ` <mandatory-components> </mandatory-components>`,
        autofocus: true,
    });

    const { createNews } = useNews();

    return (
        <>
            <div className={styles.editor}>
                <FloatingMenu editor={editor} />
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
            </div>

            <div>
                <button
                    onClick={
                        () => console.log(editor.getJSON())
                        // createNews({
                        //     title: data.title,
                        //     priority: data.priority,
                        //     content: data.content,
                        // })
                    }
                >
                    Create
                </button>
            </div>
        </>
    );
};

export default Editor;
