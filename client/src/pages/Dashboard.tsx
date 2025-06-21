import NavBar from "../components/NavBar";
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
  PlusCircle
} from "lucide-react";

export default function Dashboard() {
  return (
    <section className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white ">
      <NavBar authRequired={false} userRequired={true}/>

      <main className=" flex flex-1 ">
        <nav className="w-68 bg-blue-500 px-10 py-6  border-r border-r-white/10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex flex-col justify-between">
          <ul className=" space-y-8">
            <ul className="space-y-6 text-white">
              <li className="flex items-center gap-2">
                <Clock size={18} /> Recent
              </li>
              <li className="flex items-center gap-2">
                <User size={18} /> My Profile
              </li>
              <li className="flex items-center gap-2">
                <FolderGit2 size={18} /> All Repository
              </li>
              <li className="flex items-center gap-2">
                <UserPlus size={18} /> Invite Members
              </li>
              <li className="flex items-center gap-2">
                <Users size={18} /> Share with me
              </li>
              <li className="flex items-center gap-2">
                <FileStack size={18} /> Templates
              </li>
              <li className="flex items-center gap-2">
                <Bell size={18} /> Notifications
              </li>
              <li className="flex items-center gap-2">
                <Settings size={18} /> Settings
              </li>
            </ul>
          </ul>
          <button className="bg-transparent border border-green-600 hover:bg-green-600/20 py-2 px-8 text-center flex gap-2 items-center rounded-md hover:scale-102 shadow-md shadow-black/20 cursor-pointer transition-all duration-200">
            <LogOut size={18} />
  Sign out
          </button>
        </nav>
        <div className="w-full flex flex-col">
          <div className=" flex justify-between p-6">
            <h1 className="text-2xl font-semibold tracking-wide">Recent</h1>
            <button className="px-3 py-2 bg-green-700 text-white rounded-md flex gap-2 items-center hover:bg-green-600 hover:scale-102 transition-all duration-200 shadow-md shadow-black/20 cursor-pointer">
              <PlusCircle size={18}/> New Projects
            </button>
          </div>
          <div className="flex items-center gap-20 p-6">
            <div className="border border-blue-500 p-4">
              <h1>Project name</h1>
              <p>Last Updated: Time</p>
              <p>Collaborators: name</p>
              <a>open editor</a>
            </div>
            <div className="border border-blue-500 p-4">
              <h1>Project name</h1>
              <p>Last Updated: Time</p>
              <p>Collaborators: name</p>
              <a>open editor</a>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
