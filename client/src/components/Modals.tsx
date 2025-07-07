import Button from "./Button";
import { PlusCircle, X } from "lucide-react";
import {useNavigate} from "react-router-dom"
import { useState,useEffect } from "react";
import { language } from "./languages.ts";

import type { ModalProps,ProjectDetails } from "./Types";


export default function Modals({ setShowModals,create,isCreated }: ModalProps) {

  const navigate=useNavigate()

  const [isError,setIsError]=useState<boolean>(false)
  const [lang,setLang]=useState(language[0])


  useEffect(()=>{
    if(isError){
      const timer=setTimeout(()=>setIsError(false),5000);

      return ()=>clearTimeout(timer)
    }
    
  },[isError])

  function actionFunction(formData: FormData) {
  const rawValue = formData.get("project");
  const projectName = typeof rawValue === "string" ? rawValue : "";

  const projectObject:ProjectDetails={
    projectName: projectName,
    username:"",
    code:"",
  };

  create(projectObject);

  if(isCreated){
    navigate("/editor",{
      state : {
        projectName:projectName,
        language:lang

      }
    })
    setShowModals(false);
  }else{
    setIsError(true);
  }
}

function handleLangChange(e : React.ChangeEvent<HTMLSelectElement>){
  const selectedLabel=e.target.value
  const selectedLang=language.find(l=> l.label===selectedLabel)
  if(selectedLang){
    setLang(selectedLang)
  }
}


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="w-[400px] bg-neutral-900 px-6 py-8 rounded-xl relative border border-white/10 shadow-md">
        <button
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowModals(false)}
        >
          <X size={18} />
        </button>
        <form className="space-y-2" action={actionFunction}>
          <div className="flex flex-col gap-1.5">
            <h2 className="text-2xl font-semibold mb-4 ">
              Create New Project
            </h2>
            <label htmlFor="project" className="block font-medium">
              Enter Project Name
            </label>
            <input
              id="project"
              name="project"
              type="text"
              autoComplete="off"
              placeholder="Project Name"
              className="py-1 px-3 border border-white/10 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
            />
            <label htmlFor="template" className="block font-medium mt-5">
              Select Template
            </label>
            
            <select id="template" className=' px-3 py-1 rounded bg-gray-800 border border-white/10' value={lang.label} onChange={handleLangChange} >
              {language.map(lang=>{
                return(
                    <option key={lang.label} value={lang.label}>{lang.label}</option>
                )
              })}
            </select>
          </div>

          <Button type="submit" className="w-full block mt-8">
            <PlusCircle size={18} /> Create
          </Button>
          {isError && <p className="text-red pt-4">Something went wrong.Please try agin later.</p>}
        </form>
      </div>
    </div>
  );
}

