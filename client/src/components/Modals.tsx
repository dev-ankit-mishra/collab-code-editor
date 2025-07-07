import Button from "./Button";
import { PlusCircle, X } from "lucide-react";
import {useNavigate} from "react-router-dom"
import { useState,useEffect } from "react";

import type { ModalProps,ProjectDetails } from "./Types";


export default function Modals({ setShowModals,create,isCreated }: ModalProps) {

  const navigate=useNavigate()

  const [isError,setIsError]=useState<boolean>(false)

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
        projectName:projectName
      }
    })
    setShowModals(false);
  }else{
    setIsError(true);
  }
}


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="w-[400px] bg-neutral-900 p-10 rounded-xl relative border border-white/10 shadow-md">
        <button
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowModals(false)}
        >
          <X size={18} />
        </button>
        <form className="space-y-4" action={actionFunction}>
          <div className="flex flex-col gap-6 pb-2">
            <label htmlFor="project" className="block text-xl font-medium tracking-wide">
              Create New Project
            </label>
            <input
              id="project"
              name="project"
              type="text"
              placeholder="Project Name"
              className="py-2 px-3 border border-white/10 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
            />
          </div>

          <Button type="submit">
            <PlusCircle size={18} /> Create
          </Button>
          {isError && <p className="text-red pt-4">Something went wrong.Please try agin later.</p>}
        </form>
      </div>
    </div>
  );
}

