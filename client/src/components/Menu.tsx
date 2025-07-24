import {
  Clock,
  Folder,
  UserPlus,
  Users,
  FileStack,
  Settings,
  LogOut,
} from "lucide-react";
import Button from "./Button";
import {NavLink,useNavigate} from "react-router-dom"
import { useAuth } from "../context/useAuth";
import { useState,useEffect} from "react";
import type { MenuProps } from "./Types";

export default function Menu({setShowModals}:MenuProps){

  const [error,setError] =useState<string | undefined>(undefined)
  const [loading,setLoading]=useState(false)



    const navigate=useNavigate()

  const {signOutUser}=useAuth()

   useEffect(() => {
        if (error) {
          const timer = setTimeout(() => setError(undefined), 5000);
          return () => clearTimeout(timer);
        }
      }, [error]);

  async function handleSignOut(){
    try{
      setLoading(true)
      const data =await signOutUser()
      if(!data?.success){
        setError(data.error)
        throw new Error(data.error)
      }
      else{
        navigate("/")
        setLoading(false)
      }
    }catch (err){ 
      console.log(err)
      setLoading(false)
    }
  }

  return(
    <nav className="w-52   py-6  border-r border-r-white/10  flex flex-col justify-between">
  
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded cursor-pointer transition-all duration-200">
                <NavLink to="/dashboard" end className={({isActive})=>`w-full px-6.5 py-2 rounded flex items-center gap-2 ${isActive && "text-blue-500 bg-neutral-800"} `}><Clock size={16} /> Recent</NavLink>
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded  cursor-pointer transition-all duration-200">
                <NavLink to="/dashboard/allrepository" className={({isActive})=>`w-full px-6.5 py-2 rounded flex items-center gap-2 ${isActive && "text-blue-500 bg-neutral-800"} `}><Folder size={16} /> All Repository</NavLink>
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-6.5 py-2  cursor-pointer transition-all duration-200">
                <UserPlus size={16} /> Invite Members
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-6.5 py-2  cursor-pointer transition-all duration-200">
                <Users size={16} /> Share with me
              </li>
              <li onClick={()=>setShowModals(true)} className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-6.5 py-2  cursor-pointer transition-all duration-200">
                <FileStack size={16} /> Templates
              </li>
              
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-6.5 py-2  cursor-pointer transition-all duration-200">
                <Settings size={16} /> Settings
              </li>
            </ul>
          
          <div className="mb-4 w-full">
              <Button className="mx-6.5 w-36 h-8" isTransparent={true} disabled={loading} onClick={handleSignOut} >
              {loading ? (<div className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin'/>) :<><LogOut size={16} /> Sign out</>}</Button>
              {error!=undefined && (
                <p className="pt-2 text-center text-sm text-red-500">Error Occured</p>
                )}
          </div>
          
        </nav>
  )
}