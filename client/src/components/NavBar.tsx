import { CircleUserRound,UserPlus,FolderOpen } from 'lucide-react';
import Button from './Button';
import {Link} from "react-router-dom"
import { useAuth } from "../context/useAuth" ;
import  Logo  from '../assets/default.svg?react';

import type { NavbarProp } from './Types';

export default function NavBar({ authRequired = false,shareRequired=false,projectName=""}:NavbarProp) {

  
  const {session}=useAuth()
  const userId=session?.user?.email?.split("@")[0]
  
  return (
    <nav className="bg-[#0c0f1a] opacity-96 shadow-md h-14 shadow-black/40 border-b border-b-white/5 w-full py-2 flex flex-row justify-between items-center pr-10 ">
      
        <div className="w-52 h-full overflow-hidden flex items-center cursor-pointer pt-1">
          <Link to="/"><Logo className="w-full h-auto" /></Link>
        </div>
     
      



      <div>
        {
          projectName==="" ? null : (
            <span className='flex gap-2 items-center text-lg font-medium tracking-wide'>
              <FolderOpen size={20} />
              {projectName}
            </span>
          )
        }
      </div>


      <div className='flex gap-4 items-center'>
        {
        shareRequired && (
          <Button isTransparent><UserPlus size={20}/> Share  </Button>
        )
      }
        {authRequired && (
          (session===undefined || session===null) ?
          (<div className="flex flex-row gap-6 items-center">
          
          <Link to={"/login"}><Button isTransparent={true}>Log In</Button></Link>
          <Link to="/signup"><Button>Sign Up</Button></Link>
        </div>) : (
          <div className='text-white flex  gap-2 items-center'>
             <CircleUserRound size={24} />
             <span>{userId}</span>
          </div>
        )
        
      )}
      
      
      
      </div>
      
      
    </nav>
  );
}
