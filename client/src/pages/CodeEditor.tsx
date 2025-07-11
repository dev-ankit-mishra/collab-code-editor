import NavBar from "../components/NavBar";
import CodeArea from "../components/CodeArea";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import type { ProjectDetails } from "../components/Types";
import { useAuth } from "../context/AuthContext";

interface LocationState {
  projectObject?: ProjectDetails;
}

export default function CodeEditor() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const { session } = useAuth();
  const userId = session?.user?.id;

  useEffect(() => {
    // Only fetch if no state is passed
    const fetchByProject = async () => {
      if (!userId || !id) return;

      try {
        const res = await fetch(
          `https://codevspace-aqhw.onrender.com/api/projects/${userId}/${id}`
        );

        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(`Fetch failed: ${res.status} - ${errMsg}`);
        }

        const data: ProjectDetails = await res.json();
        setProject(data);
      } catch (err) {
        console.error("❌ Failed to load project code:", err);
      }
    };

    if (state?.projectObject) {
      setProject(state.projectObject);
    } else {
      fetchByProject();
    }
  }, [id, state?.projectObject, userId]);

  return (
    <section className="w-full h-screen flex flex-col bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950 text-white">
      <NavBar
        shareRequired
        authRequired
        projectName={
          project
            ? `${project.projectName} / ${project.template?.label || "No Label"}`
            : ""
        }
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
