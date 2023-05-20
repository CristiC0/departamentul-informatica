import { Fragment } from "react";
import MenuItem from "./MenuItem";
import {
    RxFontBold,
    RxFontItalic,
    RxTextAlignLeft,
    RxTextAlignCenter,
    RxTextAlignRight,
    RxTextAlignJustify,
    RxStrikethrough,
    RxUnderline,
} from "react-icons/rx";
import {
    RiH1,
    RiH2,
    RiH3,
    RiParagraph,
    RiListOrdered,
    RiListUnordered,
    RiSeparator,
    RiTextWrap,
    RiChatQuoteLine,
} from "react-icons/ri";
import { FaRedo, FaUndo } from "react-icons/fa";
import styles from "./styles.module.scss";

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const buttons = [
        {
            icon: <RxFontBold />,
            title: "Bold",
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: () => editor.isActive("bold"),
        },
        {
            icon: <RxFontItalic />,
            title: "Italic",
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: () => editor.isActive("italic"),
        },
        {
            icon: <RxUnderline />,
            title: "Underline",
            action: () => editor.chain().focus().toggleUnderline().run(),
            isActive: () => editor.isActive("underline"),
        },
        {
            icon: <RxStrikethrough />,
            title: "Strikethrough",
            action: () => editor.chain().focus().toggleStrike().run(),
            isActive: () => editor.isActive("strike"),
        },
        {
            type: "divider",
        },
        {
            icon: <RxTextAlignLeft />,
            title: "Text Align Left",
            action: () => editor.chain().focus().setTextAlign("left").run(),
            isActive: () => editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <RxTextAlignCenter />,
            title: "Text Align Center",
            action: () => editor.chain().focus().setTextAlign("center").run(),
            isActive: () => editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <RxTextAlignRight />,
            title: "Text Align Right",
            action: () => editor.chain().focus().setTextAlign("right").run(),
            isActive: () => editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <RxTextAlignJustify />,
            title: "Text Align Justify",
            action: () => editor.chain().focus().setTextAlign("justify").run(),
            isActive: () => editor.isActive({ textAlign: "justify" }),
        },
        // {
        //     icon: "mark-pen-line",
        //     title: "Highlight",
        //     action: () => editor.chain().focus().toggleHighlight().run(),
        //     isActive: () => editor.isActive("highlight"),
        // },
        {
            type: "divider",
        },
        {
            icon: <RiH1 />,
            title: "Heading 1",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <RiH2 />,
            title: "Heading 2",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <RiH3 />,
            title: "Heading 3",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: () => editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <RiParagraph />,
            title: "Paragraph",
            action: () => editor.chain().focus().setParagraph().run(),
            isActive: () => editor.isActive("paragraph"),
        },
        {
            type: "divider",
        },
        {
            icon: <RiListUnordered />,
            title: "Bullet List",
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: () => editor.isActive("bulletList"),
        },
        {
            icon: <RiListOrdered />,
            title: "Ordered List",
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.isActive("orderedList"),
        },
        {
            type: "divider",
        },
        {
            icon: <RiChatQuoteLine />,
            title: "Blockquote",
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: () => editor.isActive("blockquote"),
        },
        {
            icon: <RiSeparator />,
            title: "Horizontal Rule",
            action: () => editor.chain().focus().setHorizontalRule().run(),
        },
        {
            icon: <RiTextWrap />,
            title: "Hard Break",
            action: () => editor.chain().focus().setHardBreak().run(),
        },
        {
            type: "divider",
        },
        {
            icon: <FaUndo />,
            title: "Undo",
            action: () => editor.chain().focus().undo().run(),
        },
        {
            icon: <FaRedo />,
            title: "Redo",
            action: () => editor.chain().focus().redo().run(),
        },
    ];

    return (
        <div className={styles["editor__header"]}>
            {buttons.map((item, index) => (
                <Fragment key={index}>
                    {item.type === "divider" ? (
                        <div className={styles.divider} />
                    ) : (
                        <MenuItem {...item} />
                    )}
                </Fragment>
            ))}
        </div>
    );
};

export default MenuBar;

