import { useState, useRef, useEffect } from 'react';
import Output from './Output';
import { executeCode } from './Api';
import { editor } from 'monaco-editor';
import Editor from "@monaco-editor/react";
import Button from './Button';
import {Save} from "lucide-react"

type codeAreaProps={
  code:string,
  template:{ label: string; version: string; boilerplate: string }
}

export default function CodeArea({code,template}:codeAreaProps) {
  const [value, setValue] = useState<string>(code || template.boilerplate);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [output, setOutput] = useState("");

  const [consoleText,setConsoleText]=useState<string>("text-white");

  useEffect(()=>{
    if(code) setValue(code)
  },[code])

  useEffect(() => {
    setValue(template.boilerplate);
  }, [template]);

  const result = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;
    try {
      const { label, version } = template;
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

  function handleSaveBtn(){


  }
  



  return (
    <main className='w-full h-full flex items-center justify-between gap-1 px-1'>
      <div className='w-[56rem] flex flex-col p-4 gap-4'>
        
        <Button className='w-fit'>
          <Save onClick={handleSaveBtn} size={18}/>Save
        </Button>

        <div className='flex-1  rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]'>
          <Editor
            theme='vs-dark'
            height='38vw'
            language={template.label.toLowerCase()}
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
