import {
  Clock,
  User,
  FolderGit2,
  UserPlus,
  Users,
  FileStack,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import Button from "./Button";

export default function Menu(){
  return(
    <nav className="w-68 px-2  py-6  border-r border-r-white/10  flex flex-col justify-between">
          <ul className=" space-y-8">
            <ul className="space-y-5 text-gray-300">
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-8 py-2  cursor-pointer transition-all duration-200">
                <Clock size={18} /> Recent
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-8 py-2  cursor-pointer transition-all duration-200">
                <User size={18} /> My Profile
              </li>
              <li className="flex items-center gap-2 hover:bg-neutral-800 hover:text-white rounded px-8 py-2  cursor-pointer transition-all duration-200">
                <FolderGit2 size={18} /> All Repository
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
          </ul>
          
          <Button className="mx-8" isTransparent={true}><LogOut size={18} />
              Sign out</Button>
        </nav>
  )
}