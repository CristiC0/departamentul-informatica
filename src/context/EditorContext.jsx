import { useContext, createContext, useState, useEffect } from "react";

const EditorContext = createContext();

const defaultData = {
    title: "",
    thumbnail: "",
    priority: 2,
};

export const EditorContextProvider = ({ children }) => {
    const [data, setData] = useState({ ...defaultData });

    const validate = () => {
        return (
            data.title !== "" &&
            data.thumbnail !== "" &&
            data.priority in [1, 2, 3]
        );
    };
    return (
        <EditorContext.Provider value={{ data, setData, validate }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditorContext = () => {
    return useContext(EditorContext);
};
