import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import Modals from "../components/Modals";
import type { ProjectDetails } from "../components/Types";
import axios from "axios";
import { useAuth } from "../context/useAuth"
import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [showModals, setShowModals] = useState(false);
  const [project, setProject] = useState<ProjectDetails[]>([]);
  const { session } = useAuth();
  const id = session?.user?.id;

  useEffect(() => {
    if (!id) return;

    const fetchProjects = async () => {
      try {
        const res = await fetch(`https://codevspace-aqhw.onrender.com/api/projects/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Fetch failed:", err);
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

  return (
    <section className="h-screen w-full flex flex-col bg-gradient-to-br from-[#0a0a0a] to-[#000000] text-white">
      <NavBar authRequired={true} />

      <main className="flex flex-1">
        <Menu />
        <Outlet context={{ project, setShowModals }} />
      </main>

      {showModals && (
        <Modals setShowModals={setShowModals} create={handleCreate} />
      )}
    </section>
  );
}
