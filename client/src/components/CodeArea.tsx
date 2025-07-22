import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Output from './Output';
import { executeCode } from './Api';
import { editor } from 'monaco-editor';
import Editor from "@monaco-editor/react";
import Button from './Button';
import { Save } from "lucide-react";
import type { codeAreaProps } from './Types';
import { toast } from "react-hot-toast";
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/useAuth';
import socket from './Socket';

export default function CodeArea({ projectObject }: codeAreaProps) {
  const [value, setValue] = useState<string>(
    projectObject?.code?.trim() === ""
      ? projectObject?.template?.boilerplate || ""
      : projectObject?.code || ""
  );
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [output, setOutput] = useState("Waiting for output...");
  const [consoleText, setConsoleText] = useState<string>("text-white");
  const [saving, setSaving] = useState(false);
  const [loading,setLoading]=useState(false)
  const { session } = useAuth();
  const userId = session?.user?.id;

  useEffect(() => {
  if (!projectObject) return;

  const isNewlyCreated =
    projectObject.code.trim() === "" &&
    projectObject.createdAt === projectObject.updatedAt;

  const initialCode = isNewlyCreated
    ? projectObject.template?.boilerplate || ""
    : projectObject.code;

  setValue(initialCode);
}, [projectObject]);

useEffect(()=>{
  if(!projectObject._id){
    return
  }

  socket.emit("join-room",projectObject._id)

  socket.on("code-change",(incomingCode:string)=>{
    if(incomingCode!==editorRef.current?.getValue()){
      editorRef.current?.setValue(incomingCode); 
    }
  })

  return ()=>{
    socket.emit("leave-room",projectObject._id)
    socket.off("code-change")
  }


},[projectObject._id])


  const result = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;
    setLoading(true)
    try {
      const { label, version } = projectObject.template;
      const { run: result } = await executeCode({ label, version }, sourceCode);

      if (result.stderr) {
        setConsoleText('text-red-500');
      } else {
        setConsoleText('text-white');
      }
      setOutput(result.output);
    } catch (err: any) {
      setConsoleText('bg-red-500');
      console.error("Execution error:", err.response?.data || err.message);
      setOutput("Error running code. Check the console.");
    } finally{
      setLoading(false)
    }
  };

  function onMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    editor.focus();
  }

  async function handleSaveBtn() {
    const sourceCode = editorRef.current?.getValue();
    setSaving(true);
    try {
      await axios.put(
        `https://codevspace-aqhw.onrender.com/api/projects/${userId}/${projectObject._id}`,
        { code: sourceCode }
      );
      toast.success("Code saved successfully!");
    } catch (err) {
      console.error("Error Occurred:", err);
      toast.error("Failed to save code.");
    } finally {
      setSaving(false);
    }
  }

  function handleChange(val:string){
    setValue(val || "")
    socket.emit("code-change",{
      roomId:projectObject._id,
      code:val
    })
  }

  return (
    <main className="w-full h-full flex items-center justify-between gap-1 px-1">
      <div className="w-[56rem] flex flex-col p-4 gap-4">
        <div className="flex items-center gap-4">
          <Button className="w-20 h-8" onClick={handleSaveBtn} disabled={saving}>
            {saving ? (<div className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin'/>) : (<><Save size={18} /> Save</>)}

          </Button>
          <p className="text-gray-300 text-base">
            Last Updated:{" "}
            <span>
              {projectObject.updatedAt
                ? formatDistanceToNow(new Date(projectObject.updatedAt), {
                    addSuffix: true,
                  })
                : "Not updated yet"}
            </span>
          </p>
        </div>

        <div className="flex-1 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <Editor
            theme="vs-dark"
            height="38vw"
            language={
              projectObject?.template?.label?.toLowerCase() || "javascript"
            }
            value={value}
            onMount={onMount}
            onChange={(val) => handleChange(val || "")}
          />
        </div>
      </div>

      <Output onClick={result} bgClass={consoleText} isLoading={loading}>
        {output}
      </Output>
    </main>
  );
}
