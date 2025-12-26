import { useEffect, useState } from "react";
import RecentCard from "./RecentCard";
import SplashScreen from "./PageScreenLoader";
import { useAuth } from "../context/useAuth";
import type { ProjectDetails } from "./Types";

export default function AllRepository() {
  const { session } = useAuth();

  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH ALL WORKED-ON PROJECTS
     =============================== */
  useEffect(() => {
    if (!session?.access_token) return;

    setLoading(true);

    fetch(
      "https://codevspace-aqhw.onrender.com/api/projects/all",
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        return res.json();
      })
      .then((data) => {
        // backend already returns owned + shared
        setProjects(
          data.sort(
            (a: ProjectDetails, b: ProjectDetails) =>
              new Date(b.updatedAt ?? 0).getTime() -
              new Date(a.updatedAt ?? 0).getTime()
          )
        );
      })
      .catch((err) =>
        console.error("❌ Failed to load repositories:", err)
      )
      .finally(() => setLoading(false));
  }, [session]);

  /* ===============================
     OPTIMISTIC HANDLERS
     =============================== */
  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  const handleRename = (id: string, name: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, projectName: name } : p
      )
    );
  };

  /* ===============================
     LOADING STATE
     =============================== */
  if (loading) return <SplashScreen />;

  return (
    <div className="w-full flex flex-col p-6">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold tracking-wide">
        All Repository
      </h1>
      <p className="text-sm text-neutral-400 mt-1 pb-10">
        All projects you have created or collaborated on
      </p>

      {/* CONTENT */}
      <div className="flex items-center flex-wrap gap-8">
        {projects.length > 0 ? (
          <RecentCard
            project={projects}
            onDelete={handleDelete}
            onRename={handleRename}
          />
        ) : (
          <p className="w-full text-gray-400 text-xl text-center mt-10">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
}
