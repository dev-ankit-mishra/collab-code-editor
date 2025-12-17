import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import SplashScreen from "./SplashScreen";

/* ---------- TYPES ---------- */
type SharedProject = {
  _id: string;               // projectId
  projectName: string;
  role: "VIEWER" | "EDITOR";
  updatedAt: string;
};

export default function SharedWithMe() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<SharedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------- FETCH SHARED PROJECTS ---------- */
  useEffect(() => {
    // If auth is still resolving
    if (session === undefined) return;

    // If not logged in
    if (!session) {
      setLoading(false);
      return;
    }

    async function fetchSharedProjects() {
      try {
        const res = await fetch(
          "https://codevspace-aqhw.onrender.com/api/projects/shared-with-me",
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to load projects");
        }

        const data: SharedProject[] = await res.json();
        setProjects(data);
      } catch (err: any) {
        console.error("❌ Failed to fetch shared projects:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchSharedProjects();
  }, [session]);

  /* ---------- UI STATES ---------- */

  if (loading) return <SplashScreen />;

  if (!session) {
    return (
      <p className="text-gray-400 text-center mt-10">
        Please log in to see shared projects.
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">
        {error}
      </p>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-10">
        No projects shared with you yet.
      </p>
    );
  }

  /* ---------- MAIN UI ---------- */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-neutral-800 border border-white/10 rounded-lg p-4 hover:shadow-lg transition-all"
        >
          {/* Project name */}
          <h3 className="text-lg font-semibold text-white">
            {project.projectName}
          </h3>

          {/* Role */}
          <p className="text-sm text-gray-400 mt-1">
            Permission:{" "}
            <span className="font-medium">
              {project.role === "EDITOR" ? "Can edit" : "Can view"}
            </span>
          </p>

          {/* Action */}
          <button
            className="mt-4 text-sm text-blue-400 hover:underline"
            onClick={() =>
              navigate(`/editor/${project._id}`, {
                state: { accessRole: project.role },
              })
            }
          >
            Open Project
          </button>
        </div>
      ))}
    </div>
  );
}
