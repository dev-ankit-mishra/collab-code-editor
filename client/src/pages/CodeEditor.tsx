import NavBar from "../components/NavBar";
import CodeArea from "../components/CodeArea";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { ProjectDetails } from "../components/Types";
import { useAuth } from "../context/useAuth";
import SplashScreen from "../components/SplashScreen";

export default function CodeEditor() {
  const { id } = useParams<{ id: string }>();

  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [accessRole, setAccessRole] = useState<
    "OWNER" | "EDITOR" | "VIEWER"
  >("VIEWER");

  const { session } = useAuth();
  const accessToken = session?.access_token;

  useEffect(() => {
    const fetchProject = async () => {
      if (!id || !accessToken) return;

      try {
        const res = await fetch(
          `https://codevspace-aqhw.onrender.com/api/projects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(`Fetch failed: ${res.status} - ${errMsg}`);
        }

        /**
         * Expected backend response:
         * {
         *   project: ProjectDetails,
         *   role: "OWNER" | "EDITOR" | "VIEWER"
         * }
         */
        const data = await res.json();

        setProject(data.project);
        setAccessRole(data.role);
      } catch (err) {
        console.error("❌ Failed to load project:", err);
      }
    };

    fetchProject();
  }, [id, accessToken]);

  return (
    <section className="w-full h-screen flex flex-col bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950 text-white">
      <NavBar
        authRequired
        shareRequired={accessRole === "OWNER"}
        projectName={
          project
            ? `${project.projectName} / ${project.template?.label || "No Label"}`
            : ""
        }
      />

      <main className="w-full h-full flex-1 flex">
        <div className="flex-1">
          {project ? (
            <CodeArea
              projectObject={project}
              accessRole={accessRole}
            />
          ) : (
            <SplashScreen />
          )}
        </div>
      </main>
    </section>
  );
}
