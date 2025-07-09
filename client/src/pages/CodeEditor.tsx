import NavBar from "../components/NavBar";
import CodeArea from "../components/CodeArea";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import type { ProjectDetails } from "../components/Types";
import { useAuth } from "../context/AuthContext";

export default function CodeEditor() {
  const { id } = useParams();
  const location = useLocation();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const auth=useAuth()
  const session=auth?.session

  useEffect(() => {
    if (!location.state?.projectObject) {
      const fetchByProject = async () => {
        try {
          const res = await fetch(
            `https://codevspace-aqhw.onrender.com/api/projects/${id}`
          );
          if (!res.ok) {
            const errMsg = await res.text();
            throw new Error(`Fetch failed: ${res.status} - ${errMsg}`);
          }
          const data = await res.json();
          setProject(data);
        } catch (err) {
          console.error("❌ Failed to load project code:", err);
        }
      };

      fetchByProject();
    } else {
      setProject(location.state.projectObject);
    }
  }, [id, location.state]);

  return (
    <section className="w-full h-screen flex flex-col bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950 text-white">
      <NavBar
        shareRequired
        user={session?.user?.email}
        projectName={project?.projectName + "  /  " + project?.template?.label}
      />
      <main className="w-full h-full flex-1 flex">
        <SideBar />
        <div className="flex-1">
          {project ? (
            <CodeArea projectObject={project} />
          ) : (
            <div className="text-center p-8 text-white">Loading project...</div>
          )}
        </div>
      </main>
    </section>
  );
}
