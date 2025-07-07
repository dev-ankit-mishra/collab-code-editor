import NavBar from "../components/NavBar";
import Button from "../components/Button";
import {useState,useEffect} from "react"
import RecentCard from "../components/RecentCard";
import Modals from "../components/Modals";
import type { ProjectDetails } from "../components/Types";
import axios from "axios"
import {
 
  PlusCircle,
} from "lucide-react";
import Menu from "../components/Menu";


export default function Dashboard() {

  const [showModals,setShowModals]=useState<boolean>(false);
  const [project,setProject]=useState<ProjectDetails[]>([])
  const [isCreated,setIsCreated]=useState<boolean>(false);
  

 useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await fetch("https://codevspace-aqhw.onrender.com/api/projects");
      const data = await res.json();
      setProject(data);
      setIsCreated(true);
    } catch (err) {
      console.error("Fetch failed:", err);
      setIsCreated(false);
    }
  };

  fetchProjects();
}, []);






  async function handleCreate(project:ProjectDetails){
    try {
      await axios.post("https://codevspace-aqhw.onrender.com/api/projects", project);
      setProject(prev => [...prev, project]);
    } catch (err) {
      console.error(err);
    }
  }

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
            
            <RecentCard project={project}/>
            
          </div>
        </div>
      </main>
      {
        showModals && (
         <Modals setShowModals={setShowModals} create={handleCreate} isCreated={isCreated}/>
        )
      }
    </section>
  );
}
