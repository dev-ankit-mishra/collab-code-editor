import { CircleUserRound,UserPlus,FolderOpen } from 'lucide-react';
import Button from './Button';
import {Link} from "react-router-dom"
import { useAuth } from "../context/useAuth" ;
import  Logo  from '../assets/default.svg?react';
import {useNavigate,useParams } from 'react-router-dom';
import ShareModal from "./ShareModal";

import type { NavbarProp } from './Types';
import { useState,useEffect,useRef } from 'react';

export default function NavBar({ authRequired = false,shareRequired=false,projectName=""}:NavbarProp) {
  const {id:roomId}=useParams()
  const [isOpen,setIsOpen]=useState(false)
  const {session,signOutUser}=useAuth()
  const [showModals,setShowModals]=useState(false)
  const userId=session?.user?.email?.split("@")[0]
  const navigate=useNavigate()

  const dropDownRef=useRef<HTMLDivElement>(null)

  useEffect(() => {
  function handleOutside(event: MouseEvent) {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  function handleEsc(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  document.addEventListener("mousedown", handleOutside);
  document.addEventListener("keydown", handleEsc);

  return () => {
    document.removeEventListener("mousedown", handleOutside);
    document.removeEventListener("keydown", handleEsc);
  };
}, [isOpen]);


    async function handleSignOut(){
    try{
      const data =await signOutUser()
      if(!data?.success){
        throw new Error(data.error)
      }
      else{
        navigate("/")
      }
    }catch (err){ 
      console.log(err)
    }
  }



  
  return (
    <nav className="bg-[#0c0f1a] opacity-96 shadow-md h-12 shadow-black/40 border-b border-b-white/10 w-full py-2 flex flex-row justify-between items-center pr-10 ">
      
        <div className="w-46 h-full overflow-hidden flex items-center cursor-pointer ">
          <Link to="/"><Logo className="w-full h-auto" /></Link>
        </div>
     
      



      <div>
        {
          projectName==="" ? null : (
            <span className='flex gap-1.5 text-gray-200 items-center'>
              <FolderOpen size={16} />
              {projectName}
            </span>
          )
        }
      </div>


      <div className='flex gap-6 items-center'>
        {
        shareRequired && (
          <div>
            <Button isTransparent onClick={()=>setShowModals(true)}><UserPlus size={16}/> Share  </Button>
            {showModals && <ShareModal roomId={roomId || ""} onClose={() => setShowModals(false)} />}

          </div>
          
          
            
          
        )
      }
        {authRequired && (
          (session===undefined || session===null) ?
          (<div className="flex flex-row gap-6 items-center">
          
          <Link to={"/login"}><Button isTransparent={true}>Log In</Button></Link>
          <Link to="/signup"><Button>Sign Up</Button></Link>
        </div>) : (
          <div className='relative flex flex-col' ref={dropDownRef}>
            <div onClick={()=>setIsOpen(prev=>!prev)} className=' text-white flex  gap-1.5 items-center cursor-pointer'>
             <CircleUserRound size={20} />
             <span>{userId}</span>
            </div>
            {isOpen &&
            (
              <div className='w-fit  absolute top-full mt-2 rounded bg-neutral-900'>
                <ul className='p-2'>
                  <li onClick={()=>{
                    navigate("/dashboard")
                    setIsOpen(false)
                  }} className='px-3 py-1 cursor-pointer hover:bg-gray-800'>Dashboard</li>
                  <li onClick={()=>{
                    navigate("/dashboard/settings")
                    setIsOpen(false)
                  }} className='px-3 py-1 cursor-pointer hover:bg-gray-800'>Settings</li>
                  <li onClick={handleSignOut} className='px-3 py-1 cursor-pointer hover:bg-gray-800'>Sign Out</li>
                </ul>
              </div>
            )}
          </div>  
          
        )
        
      )}
      
      
      
      </div>
      
      
    </nav>
  );
}
