import NavBar from "../components/NavBar";
import {useState,useEffect} from "react"
import Modals from "../components/Modals";
import type { ProjectDetails } from "../components/Types";
import axios from "axios"

import { useAuth } from "../context/AuthContext";
import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";


export default function Dashboard() {

  const [showModals,setShowModals]=useState<boolean>(false);
  const [project,setProject]=useState<ProjectDetails[]>([])
  const auth=useAuth()
  const session=auth?.session
  

 useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await fetch("https://codevspace-aqhw.onrender.com/api/projects");
      const data = await res.json();
      setProject(data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  fetchProjects();
}, []);






  async function handleCreate(project:ProjectDetails){
    try {
      const response =await axios.post("https://codevspace-aqhw.onrender.com/api/projects", project);
      const {_id}=response.data
      setProject(prev => [...prev, project]);
      return _id
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="h-screen w-full flex flex-col bg-gradient-to-br from-[#0a0a0a] to-[#000000]
 text-white ">
      <NavBar authRequired={false} user={session?.user?.email}/>

      <main className=" flex flex-1 ">
        <Menu/>
        
        <Outlet context={{ project, setShowModals }} />

      </main>
      {
        showModals && (
         <Modals setShowModals={setShowModals} create={handleCreate}/>
        )
      }
    </section>
  );
}
