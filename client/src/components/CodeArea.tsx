import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Output from './Output';
import { executeCode } from './Api';
import { editor } from 'monaco-editor';
import Editor from "@monaco-editor/react";
import Button from './Button';
import {Save} from "lucide-react"
import type { codeAreaProps } from './Types';
import { toast } from "react-hot-toast";
import { formatDistanceToNow } from 'date-fns';


export default function CodeArea({projectObject}:codeAreaProps) {
  const [value, setValue] = useState<string>(projectObject.code.trim()===""? projectObject.template.boilerplate : projectObject.code);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [output, setOutput] = useState("Waiting for output...");

  const [consoleText,setConsoleText]=useState<string>("text-white");

 useEffect(() => {

    setValue(projectObject.code);
  
}, [projectObject]);

  const result = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;
    try {
      const { label, version } = projectObject.template;
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
      setOutput("Error running code. Check the console.");
    }
  };

  function onMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    editor.focus();
  }

  async function handleSaveBtn() {
  const sourceCode = editorRef.current?.getValue();
  try {
    await axios.put(`https://codevspace-aqhw.onrender.com/api/projects/${projectObject._id}`, { code: sourceCode });
    toast.success("Code saved successfully!");
  } catch (err) {
    console.error("Error Occurred:", err);
    toast.error("Failed to save code.");
  }
}
  



  return (
    <main className='w-full h-full flex items-center justify-between gap-1 px-1'>
      <div className='w-[56rem] flex flex-col p-4 gap-4'>
        <div className='flex items-center gap-4'>
          <Button className='w-fit' onClick={handleSaveBtn}>
            <Save size={18} /> Save
          </Button>
          <p className='text-gray-300 text-base'>Last Updated:  <span>{formatDistanceToNow(new Date(projectObject.updatedAt ?? 0),{addSuffix:true})}</span></p>
        </div>
        

        <div className='flex-1  rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]'>
          <Editor
            theme='vs-dark'
            height='38vw'
            language={projectObject?.template?.label.toLowerCase()}
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
