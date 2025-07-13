import type {RecentCardProps } from "./Types";
import { formatDistanceToNow  } from "date-fns";
import {useNavigate} from "react-router-dom"
import { Code, User, Clock,Ellipsis } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/useAuth";



export default function RecentCard({ project }: RecentCardProps) {
  const navigate=useNavigate()
  const[showOptionId,setShowOptionId]=useState<string | undefined>(undefined)
  const {session}=useAuth()

  async function handleClick(_id:string|undefined){
    if(!_id){
      return
    }
    try{
      const res=await fetch(`https://codevspace-aqhw.onrender.com/api/${session?.user?.id}/${_id}`,{method:"DELETE"})
       const data=await res.json()

      if(!data){
        throw new Error("Could not Delete")
       }
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
      className="text-gray-400 hover:text-white cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setShowOptionId(prev=>prev===p._id? undefined : p._id);
      }}
    >
      <Ellipsis size={16} />
    </button>
    {showOptionId===p._id && (
        <div className="absolute top-full mt-0.5 w-20 bg-neutral-900 rounded shadow">
          <ul className="p-1">
            <li onClick={()=>handleClick(p._id)} className="hover:bg-gray-800 text-sm tracking-wide px-3 py-1 rounded cursor-pointer">Delete</li>
          </ul>
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
