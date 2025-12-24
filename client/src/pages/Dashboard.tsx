import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import Modals from "../components/Modals";
import type { ProjectDetails } from "../components/Types";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [showModals, setShowModals] = useState(false);
  const [project, setProject] = useState<ProjectDetails[]>([]);
  const [loading, setLoading] = useState(false);

  const { session } = useAuth(); // Supabase session
  const accessToken = session?.access_token;
 // 🔑 JWT

  const location = useLocation();
  const navigate = useNavigate();


  /* ==========================================
     TOAST HANDLING (unchanged)
     ========================================== */
  useEffect(() => {
    if (location.state?.showToast === "SignIn") {
      toast.success("Successfully Logged in!");
      navigate(location.pathname, { replace: true });
    } else if (location.state?.showToast === "SignUp") {
      toast.success("Successfully Signed up!");
      navigate(location.pathname, { replace: true });
    } else if (location.state?.showToast === "PasswordChanged") {
      toast.success("Successfully Changed Password!");
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  /* ==========================================
     FETCH PROJECTS (SECURE VERSION)
     ========================================== */
  useEffect(() => {
    if (!accessToken) return;

    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://codevspace-aqhw.onrender.com/api/projects",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // 🔐 REQUIRED
            },
          }
        );

        if (!res.ok) {
          throw new Error("Unauthorized or failed to fetch");
        }

        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [accessToken]);

  /* ==========================================
     CREATE PROJECT (SECURE VERSION)
     ========================================== */
  async function handleCreate(project: ProjectDetails) {
    try {
      const response = await axios.post(
        "https://codevspace-aqhw.onrender.com/api/projects",
        project,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 🔐 REQUIRED
          },
        }
      );

      const newProject = response.data;
      setProject((prev) => [...prev, newProject]);
      return newProject._id;
    } catch (err) {
      console.error("Create project failed:", err);
    }
  }

  /* ==========================================
     UI HELPERS (unchanged)
     ========================================== */
  function handleDelete(_id: string) {
    setProject((prev) => prev.filter((p) => p._id !== _id));
  }

  function handleRename(_id: string | undefined, projectName: string) {
    setProject((prev) =>
      prev.map((p) =>
        p._id === _id ? { ...p, projectName } : p
      )
    );
  }

  return (
    <section className="h-screen w-full flex flex-col bg-gradient-to-br from-[#0a0a0a] to-[#000000] text-white">
      <NavBar authRequired={true} />

      <div className="flex flex-1">
        <Menu setShowModals={setShowModals} />
        
        <main className="ml-52 pt-14 bg-neutral-950 flex-1 overflow-y-auto">
  <Outlet
    context={{
      project,
      setShowModals,
      handleDelete,
      handleRename,
    }}
  />

  {!loading && project.length === 0 && (
    <div className="text-gray-400 text-xl text-center mt-10">
      You don’t have any projects yet. Click{" "}
      <span className="font-semibold">New Project</span>{" "}
      to get started!
    </div>
  )}
</main>
      </div>

      {showModals && (
        <Modals setShowModals={setShowModals} create={handleCreate} />
      )}
    </section>
  );
}
