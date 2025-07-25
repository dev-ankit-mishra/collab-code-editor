import type {RecentCardProps } from "./Types";
import { formatDistanceToNow  } from "date-fns";
import {useNavigate} from "react-router-dom"
import { Code, User, Clock,Ellipsis } from "lucide-react";
import { useState,useRef, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import RenameModals from "./RenameModals";




export default function RecentCard({ project,onDelete }: RecentCardProps) {

  



  const navigate=useNavigate()
  const[showOptionId,setShowOptionId]=useState<string | undefined>(undefined)
  const [open,setOpen]=useState(false)
  const {session}=useAuth()
  const cardDropDownRef=useRef<HTMLButtonElement>(null) 

  useEffect(()=>{
    function handleOutside(e:MouseEvent){
      if(cardDropDownRef.current && !cardDropDownRef.current.contains(e.target as Node)){
        setShowOptionId(undefined)
      }
    }

    function handleEsc(e:KeyboardEvent){
      if(e.key==="Escape"){
        setShowOptionId(undefined)
      }
    }

    document.addEventListener("mousedown",handleOutside)
    document.addEventListener("keydown",handleEsc)

    return ()=>{
      document.removeEventListener("mousedown",handleOutside)
      document.removeEventListener("keydown",handleEsc)
    }

  },[showOptionId])



  async function handleClick(_id:string|undefined){
    if(!_id){
      return
    }
    try{
      const res=await fetch(`https://codevspace-aqhw.onrender.com/api/projects/${session?.user?.id}/${_id}`,{method:"DELETE"})
       const data=await res.json()

      if(!data){
        throw new Error("Could not Delete")
       }
       onDelete(_id)
       console.log("Deleted Successfully")
    }catch (err){
      console.log(err)
    }
    
  }

  return (
    <>
      {project.map((p) => (
        <div
  key={p._id}
  className="w-68 h-40 bg-gray-700/30 border border-white/10 shadow-md hover:scale-[1.02] hover:shadow-xl transition-all cursor-pointer duration-300 p-5 rounded-md flex flex-col justify-between"
  onClick={() => navigate(`/editor/${p._id}`)}
>
  {/* Top Section */}
  <div className="relative flex items-center justify-between">
    <span className="text-lg font-semibold text-white">{p.projectName}</span>
    <div>
        <button
        ref={cardDropDownRef}
      className="text-gray-400 hover:text-white cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setShowOptionId(prev=>prev===p._id? undefined : p._id);
      }}
    >
      <Ellipsis size={16} />
    </button>
    {showOptionId===p._id && (
        <div className="absolute top-full mt-0.5 w-fit bg-neutral-900 rounded shadow">
          <ul className="p-2">
            <li onClick={(e)=>{
              e.stopPropagation()
              setOpen(true)
            }
            } className="hover:bg-gray-800 text-sm tracking-wide px-3 py-1 rounded cursor-pointer">Rename</li>
            <li onClick={(e)=>{
              e.stopPropagation()
              handleClick(p._id)
              }} className="hover:bg-gray-800 text-sm tracking-wide px-3 py-1 rounded cursor-pointer">Delete</li>
          </ul>
          {
            open && <RenameModals setOpen={setOpen}/> 
          }
          
        </div>

    )}
    </div>
    
  </div>

  {/* Metadata */}
  <div className="space-y-1 pt-2 text-sm text-zinc-400">
    <p className="flex items-center gap-2">
      <Code size={14} />
      <span>Template: {p.template.label}</span>
    </p>
    <p className="flex items-center text-sm gap-2">
      <User size={14} />
      Created by you
    </p>
  </div>

  {/* Timestamp */}
  <p className="flex items-center gap-2 text-sm text-zinc-400 mt-3">
    <Clock size={14} />
    {formatDistanceToNow(new Date(p.updatedAt ?? 0), { addSuffix: true })}
  </p>
</div>

      ))}
    </>
  );
}
