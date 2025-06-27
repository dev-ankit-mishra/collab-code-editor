import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { language } from './languages';
import Output from './Output';
import { executeCode } from './Api';
import type { editor } from 'monaco-editor';

export default function CodeArea() {
  const [value, setValue] = useState<string>(language[0].boilerplate);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [languages, setLanguages] = useState(language[0]);
  const [output, setOutput] = useState("");

  const [consoleText,setConsoleText]=useState<string>("text-white");

  useEffect(() => {
    setValue(languages.boilerplate);
  }, [languages]);

  const result = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;
    try {
      const { label, version } = languages;
      const { run: result } = await executeCode({ label, version }, sourceCode);
      console.log(result);
      if(result.stderr){
        setConsoleText('text-red-500')
      }else{
        setConsoleText('text-white')
      }
      setOutput(result.output);
    } catch (err: any) {
      setConsoleText('bg-red-500')
      console.error("Execution error:", err.response?.data || err.message);
      setOutput("❌ Error running code. Check the console.");
    }
  };

  function onMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    editor.focus();
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = e.target.value;
    const selectedLang = language.find(lang => lang.label === selectedLabel);
    if (selectedLang) setLanguages(selectedLang);
  };

  return (
    <main className='w-full h-full flex items-center justify-between gap-1 px-1'>
      <div className='w-[56rem] flex flex-col p-4 gap-4'>
        <select
          className='w-fit px-3 py-2 rounded bg-gray-800 border border-white/10'
          value={languages.label}
          onChange={handleLanguageChange}
        >
          {language.map((lang, idx) => (
            <option key={idx} value={lang.label}>
              {lang.label} {lang.version}
            </option>
          ))}
        </select>

        <div className='flex-1  rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]'>
          <Editor
            theme='vs-dark'
            height='38vw'
            language={languages.label.toLowerCase()}
            value={value}
            onMount={onMount}
            onChange={(val) => setValue(val || "")}
          />
        </div>
      </div>

      <Output onClick={result} bgClass={consoleText}>
        {output}
      </Output>
    </main>
  );
}
