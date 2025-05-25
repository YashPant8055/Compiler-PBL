import CodeMirror from '@uiw/react-codemirror';
;
import { FaKeyboard } from 'react-icons/fa';
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";

const getExtension = (lang: string ) => {
  if (lang === "python") return python();
  if (lang === "java") return java();
  return cpp();
};

const CodeEditor = ({ code, onChange, language } : {code: string, onChange: (value: string) => void, language: string}) => {
  return (
    <div className="bg-surface p-5 rounded-xl border border-muted shadow-lg space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
        <FaKeyboard /> Code Editor
      </h2>
      <CodeMirror
        value={code}
        height="300px"
        theme="dark"
        extensions={[getExtension(language)]}
        onChange={onChange}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
        }}
        className="rounded-md text-base font-mono bg-background"
      />
    </div>
  );
};

export default CodeEditor;
