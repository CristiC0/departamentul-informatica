import { BubbleMenu } from "@tiptap/react";
import styles from "./FloatingMenu.module.scss";
const FloatingMenu = ({ editor }) => {
    return (
        <>
            {editor && (
                <BubbleMenu
                    className={styles["bubble-menu"]}
                    tippyOptions={{ duration: 100 }}
                    editor={editor}
                >
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        className={editor.isActive("bold") ? "is-active" : ""}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        className={editor.isActive("italic") ? "is-active" : ""}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                        className={editor.isActive("strike") ? "is-active" : ""}
                    >
                        Strike
                    </button>
                </BubbleMenu>
            )}
        </>
    );
};

export default FloatingMenu;
