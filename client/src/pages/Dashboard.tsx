import NavBar from "../components/NavBar";
import {useState,useEffect} from "react"
import Modals from "../components/Modals";
import type { ProjectDetails } from "../components/Types";
import axios from "axios"


import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";


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
        
        <Outlet context={{ project, setShowModals }} />

      </main>
      {
        showModals && (
         <Modals setShowModals={setShowModals} create={handleCreate} isCreated={isCreated}/>
        )
      }
    </section>
  );
}
