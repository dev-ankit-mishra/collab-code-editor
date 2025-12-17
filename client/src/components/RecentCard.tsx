import type { RecentCardProps } from "./Types";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Code, User, Clock, Ellipsis } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import RenameModals from "./RenameModals";

export default function RecentCard({ project, onDelete, onRename }: RecentCardProps) {
  const navigate = useNavigate();

  const { session } = useAuth();
  const accessToken = session?.access_token; // 🔐 JWT

  const [showOptionId, setShowOptionId] = useState<string>();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string>();

  const cardDropDownRef = useRef<HTMLDivElement>(null);

  /* ---------- CLOSE DROPDOWN ---------- */
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (cardDropDownRef.current && !cardDropDownRef.current.contains(e.target as Node)) {
        setShowOptionId(undefined);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowOptionId(undefined);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  /* ---------- DELETE PROJECT (SECURE) ---------- */
  async function handleDelete(projectId?: string) {
    if (!projectId || !accessToken) return;

    try {
      const res = await fetch(
        `https://codevspace-aqhw.onrender.com/api/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`, // 🔐 REQUIRED
          },
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      onDelete(projectId);
      console.log("✅ Project deleted");
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  }

  function handleRename(projectId?: string) {
    setCurrentId(projectId);
    setOpen(true);
  }

  return (
    <>
      {project.map((p) => (
        <div
          key={p._id}
          className="w-68 h-40 bg-gray-700/30 border border-white/10 shadow-md hover:scale-[1.02] hover:shadow-xl transition-all cursor-pointer duration-300 p-5 rounded-md flex flex-col justify-between"
          onClick={() => navigate(`/editor/${p._id}`)}
        >
          {/* ---------- TOP ---------- */}
          <div className="relative flex items-center justify-between">
            <span className="text-lg font-semibold text-white">
              {p.projectName}
            </span>

            <button
              className="text-gray-400 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setShowOptionId((prev) => (prev === p._id ? undefined : p._id));
              }}
            >
              <Ellipsis size={16} />
            </button>

            {showOptionId === p._id && (
              <div
                ref={cardDropDownRef}
                className="absolute right-0 top-full mt-1 bg-neutral-900 rounded shadow"
              >
                <ul className="p-2">
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRename(p._id);
                    }}
                    className="hover:bg-gray-800 text-sm px-3 py-1 rounded cursor-pointer"
                  >
                    Rename
                  </li>

                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(p._id);
                    }}
                    className="hover:bg-gray-800 text-sm px-3 py-1 rounded cursor-pointer"
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* ---------- META ---------- */}
          <div className="space-y-1 pt-2 text-sm text-zinc-400">
            <p className="flex items-center gap-2">
              <Code size={14} />
              <span>
                Template: {p.template?.label ?? "Unknown"}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <User size={14} />
              Created by you
            </p>
          </div>

          {/* ---------- TIME ---------- */}
          <p className="flex items-center gap-2 text-sm text-zinc-400 mt-3">
            <Clock size={14} />
            {formatDistanceToNow(new Date(p.updatedAt ?? 0), {
              addSuffix: true,
            })}
          </p>
        </div>
      ))}

      {open && (
        <RenameModals
          setOpen={setOpen}
          id={currentId}
          onRename={onRename}
        />
      )}
    </>
  );
}
