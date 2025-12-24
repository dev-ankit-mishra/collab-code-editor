import { useEffect, useState } from "react";
import Button from "./Button";
import RecentCard from "./RecentCard";
import SplashScreen from "./PageScreenLoader";
import { PlusCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import type { DashboardOutlet } from "./Types";

export default function Recent() {
  const {
    project,
    setShowModals,
    handleDelete,
    handleRename,
  }: DashboardOutlet = useOutletContext();

  const [loading, setLoading] = useState(true);

  /* ---------- PAGE LOADER ---------- */
  useEffect(() => {
    // When project data is available, stop loading
    if (project) {
      setLoading(false);
    }
  }, [project]);

  if (loading) {
    return <SplashScreen />;
  }

  const top5Projects = project
    .filter((p) => p.updatedAt)
    .sort(
      (a, b) =>
        new Date(b.updatedAt!).getTime() -
        new Date(a.updatedAt!).getTime()
    )
    .slice(0, 5);

  return (
    <div className="w-full flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between p-6">
        <h1 className="text-2xl font-semibold tracking-wide">
          Recent
        </h1>
        <Button onClick={() => setShowModals(true)}>
          <PlusCircle size={16} /> New Project
        </Button>
      </div>

      {/* CONTENT */}
      <div className="flex items-center flex-wrap gap-8 p-6">
        <RecentCard
          project={top5Projects}
          onDelete={handleDelete}
          onRename={handleRename}
        />
      </div>
    </div>
  );
}
