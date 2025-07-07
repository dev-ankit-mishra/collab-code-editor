import { CircleUserRound,UserPlus } from 'lucide-react';
import Button from './Button';
import {Link} from "react-router-dom"

import type { NavbarProp } from './Types';

export default function NavBar({ authRequired = false,shareRequired=false,userRequired=false,projectName=""}:NavbarProp) {

  
  return (
    <nav className="bg-[#0c0f1a] opacity-96 shadow-md shadow-black/40 border-b border-b-white/5 w-full py-2 flex flex-row justify-between items-center px-10">
      <h1 className="text-xl font-semibold text-gray-200 hover:text-green-500"><Link to={"/"}>CoDevSpace</Link></h1>

      <div>
        <span>{projectName===""? null : projectName}</span>
      </div>


      <div className='flex gap-4 items-center'>
        {authRequired && (
        <div className="flex flex-row gap-6 items-center">
          
          <Button isTransparent={true}><Link to={"/login"}>Log In</Link></Button>
          <Button><Link to="/signup">Sign Up</Link></Button>
          
        </div>
      )}
      
      {
        shareRequired && (
          <Button isTransparent><UserPlus size={20}/> Share  </Button>
        )
      }
      {
        userRequired && (
          <div className='text-white flex  gap-2 items-center'>
             <CircleUserRound size={24} />
             <span>amishra26445</span>
          </div>
        )
      }
      </div>
      
      
    </nav>
  );
}
