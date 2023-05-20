import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import MandatoryElements from "./MandatoryElements.jsx";

export default Node.create({
    name: "mandatoryComponents",

    group: "block",

    content: "inline*",

    parseHTML() {
        return [
            {
                tag: "mandatory-components",
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["mandatory-components", mergeAttributes(HTMLAttributes), 0];
    },

    addNodeView() {
        return ReactNodeViewRenderer(MandatoryElements);
    },
});
