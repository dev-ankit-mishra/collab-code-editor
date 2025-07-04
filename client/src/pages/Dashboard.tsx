import NavBar from "../components/NavBar";
import Button from "../components/Button";
import {useState} from "react"
import RecentCard from "../components/RecentCard";

import {
 
  PlusCircle,
  X,
} from "lucide-react";
import Menu from "../components/Menu";

export default function Dashboard() {

  const [showModals,setShowModals]=useState(false);

  return (
    <section className="h-screen w-full flex flex-col bg-gradient-to-br from-[#0a0a0a] to-[#000000]
 text-white ">
      <NavBar authRequired={false} userRequired={true}/>

      <main className=" flex flex-1 ">
        <Menu/>
        
        <div className="w-full flex flex-col">
          <div className=" flex justify-between p-6">
            <h1 className="text-2xl font-semibold tracking-wide">Recent</h1>
            <Button
              onClick={()=>setShowModals(true)}
             >
              <PlusCircle size={18}/> New Projects
            </Button>
          </div>
          <div className="flex items-center flex-wrap gap-8 p-6">
            
            <RecentCard/>
            
          </div>
        </div>
      </main>
      {
        showModals && (
         <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="w-100 bg-neutral-900 p-10 rounded-xl relative border border-white/10 shadow-md">
              <button className="absolute top-5 right-5 cursor-pointer" onClick={()=>setShowModals(false)}>
                <X size={18}/>
              </button>
              <form className="space-y-4">
                <div className="flex flex-col gap-6 pb-2">
                  <label className="block text-xl font-medium tracking-wide">
                  Create New Project
                </label>
                <input type="text" placeholder="Project Name" className="py-2 px-3 border border-white/10 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200"/>
                </div>
                
                <Button>
                  <PlusCircle size={18}/> Create 
                </Button>
              </form>
          </div>
        </div>
        )
      }
    </section>
  );
}
