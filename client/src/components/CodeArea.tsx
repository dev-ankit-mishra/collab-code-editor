import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Output from './Output';
import { executeCode } from './Api';
import { editor } from 'monaco-editor';
import Editor from "@monaco-editor/react";
import type { codeAreaProps } from './Types';
import { formatDistanceToNow } from 'date-fns';
import debounce from "lodash/debounce";
import { useAuth } from '../context/useAuth';
import socket from './Socket';
import { useDebounce } from './useDebounce';
import { FaCloudUploadAlt } from "react-icons/fa";

export default function CodeArea({ projectObject }: codeAreaProps) {
  const [value, setValue] = useState<string>(
    projectObject?.code?.trim() === ""
      ? projectObject?.template?.boilerplate || ""
      : projectObject?.code || ""
  );
  const debouncedCode=useDebounce<string>(value,2000)
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [output, setOutput] = useState("Press the 'Run' button to execute your code.");
  const [consoleText, setConsoleText] = useState<string>("text-white");
  const [loading,setLoading]=useState(false)
  const { session } = useAuth();
  const [lastUpdate,setLastUpdate]=useState<Date | undefined>();
  const userId = session?.user?.id;
  let isRemoteUpdate=false;

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
    const current = editorRef.current?.getValue();
    if (incomingCode !== current) {
      isRemoteUpdate = true;
      setValue(incomingCode);
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

  useEffect(()=>{
    const saveCode=async ()=>{
      try {
      await axios.put(
        `https://codevspace-aqhw.onrender.com/api/projects/${userId}/${projectObject._id}`,
        { code: debouncedCode }
      );
      setLastUpdate(new Date());
    } catch (err) {
      console.error("Error Occurred:", err);
    }
    }
    saveCode();
  },[debouncedCode])




const emitChange = debounce((val: string) => {
  socket.emit("code-change", {
    roomId: projectObject._id,
    code: val,
  });
}, 300); // 300ms delay

function handleChange(val: string) {
  if (isRemoteUpdate) {
    isRemoteUpdate = false;
    return;
  }
  setValue(val || "");
  emitChange(val); // use debounced version
}


  return (
    <main className="w-full h-full flex items-center justify-between gap-1">
      <div className="w-[56rem] flex flex-col px-4  gap-4 max-h-screen">
  {/* Save Button Row */}
  <div className="flex items-center gap-4 mt-4">
    <p className="text-gray-300 text-sm flex gap-2">
      <FaCloudUploadAlt size={18}/> Last Updated:{" "}
      <span>
        {lastUpdate
          ? formatDistanceToNow(new Date(lastUpdate), {
              addSuffix: true,
            })
          : "Not updated yet"}
      </span>
    </p>
  </div>

  {/* Editor Container (Fix Height) */}
  <div className="h-[38rem] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
    <Editor
      theme="vs-dark"
      height="100%"
      width={"100%"}
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
