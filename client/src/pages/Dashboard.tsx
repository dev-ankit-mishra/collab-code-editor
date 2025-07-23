import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import Modals from "../components/Modals";
import type { ProjectDetails } from "../components/Types";
import axios from "axios";
import { useAuth } from "../context/useAuth"
import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";


export default function Dashboard() {
  const [showModals, setShowModals] = useState(false);
  const [project, setProject] = useState<ProjectDetails[]>([]);
  const [loading,setLoading] = useState(false);
  const { session } = useAuth();
  const id = session?.user?.id;

  useEffect(() => {
    if (!id) return;

    const fetchProjects = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://codevspace-aqhw.onrender.com/api/projects/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally{
        setLoading(false)
      }
    };

    fetchProjects();
  }, [id]);

  async function handleCreate(project: ProjectDetails) {
    try {
      const response = await axios.post(`https://codevspace-aqhw.onrender.com/api/projects/${id}`, project);
      const newProject = response.data;
      setProject(prev => [...prev, newProject]);
      return newProject._id;
    } catch (err) {
      console.error(err);
    }
  }

  function handleDelete(_id:string){
    setProject(prev=>prev.filter(p=>p._id!=_id))
  }

  return (
    <section className="h-screen w-full flex flex-col bg-gradient-to-br from-[#0a0a0a] to-[#000000] text-white">
      <NavBar authRequired={true} />

      <main className="flex flex-1">
        <Menu setShowModals={setShowModals} />

        {loading? <SplashScreen/>: <Outlet context={{ project, setShowModals ,handleDelete }} />}
      </main>

      {showModals && (
        <Modals setShowModals={setShowModals} create={handleCreate} />
      )}
    </section>
  );
}
