import {
  Clock,
  User,
  Folder,
  UserPlus,
  Users,
  FileStack,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import Button from "./Button";
import {NavLink,useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useState,useEffect } from "react";

export default function Menu(){

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
      const data =await signOutUser!()
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
    <nav className="w-68 px-2  py-6  border-r border-r-white/10  flex flex-col justify-between">
  
            <ul className="space-y-5 text-gray-300">
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded cursor-pointer transition-all duration-200">
                <NavLink to="/dashboard" end className={({isActive})=>`w-full px-8 py-2 rounded flex items-center gap-2 ${isActive && "text-blue-500 bg-neutral-800"} `}><Clock size={18} /> Recent</NavLink>
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-8 py-2  cursor-pointer transition-all duration-200">
                <User size={18} /> My Profile
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded  cursor-pointer transition-all duration-200">
                <NavLink to="/dashboard/allrepository" className={({isActive})=>`w-full px-8 py-2 rounded flex items-center gap-2 ${isActive && "text-blue-500 bg-neutral-800"} `}><Folder size={18} /> All Repository</NavLink>
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-8 py-2  cursor-pointer transition-all duration-200">
                <UserPlus size={18} /> Invite Members
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-8 py-2  cursor-pointer transition-all duration-200">
                <Users size={18} /> Share with me
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-8 py-2  cursor-pointer transition-all duration-200">
                <FileStack size={18} /> Templates
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-8 py-2  cursor-pointer transition-all duration-200">
                <Bell size={18} /> Notifications
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-8 py-2  cursor-pointer transition-all duration-200">
                <Settings size={18} /> Settings
              </li>
            </ul>
          
          <div className="mb-4 w-full">
              <Button className="mx-8 w-36" isTransparent={true} disabled={loading} onClick={handleSignOut} ><LogOut size={18} />
              {loading ? "Signing out" :"Sign out"}</Button>
              {error!=undefined && (
                <p className="pt-2 text-center text-sm text-red-500">Error Occured</p>
                )}
          </div>
          
        </nav>
  )
}