import { EditorContextProvider } from "@context/EditorContext";
import Editor from "./components/Editor";

const CreateNews = () => {
    return (
        <EditorContextProvider>
            <Editor />
        </EditorContextProvider>
    );
};

export default CreateNews;
