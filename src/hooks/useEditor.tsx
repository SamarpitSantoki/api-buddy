import { useState } from "react";
import Editor from "@monaco-editor/react";

function useEditor() {
  const [editor, setEditor] = useState(null);

  return {
    editor,
    setEditor,
  };
}
export default useEditor;
