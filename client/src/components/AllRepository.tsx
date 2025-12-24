import { useEffect, useState } from "react";
import RecentCard from "./RecentCard";
import SplashScreen from "./PageScreenLoader";
import { useOutletContext } from "react-router-dom";
import type { DashboardOutlet } from "./Types";

export default function AllRepository() {
  const {
    project,
    handleDelete,
    handleRename,
  }: DashboardOutlet = useOutletContext();

  const [loading, setLoading] = useState(true);

  /* ---------- PAGE LOADER ---------- */
  useEffect(() => {
    if (project) {
      setLoading(false);
    }
  }, [project]);

  if (loading) {
    return <SplashScreen />;
  }

  const latestProjects = project
    .filter((p) => p.updatedAt)
    .sort(
      (a, b) =>
        new Date(b.updatedAt!).getTime() -
        new Date(a.updatedAt!).getTime()
    );

  return (
    <div className="w-full flex flex-col">
      {/* HEADER */}
      <h1 className="text-2xl p-6 font-semibold tracking-wide">
        All Repository
      </h1>

      {/* CONTENT */}
      <div className="flex items-center flex-wrap gap-8 p-6">
        <RecentCard
          project={latestProjects}
          onDelete={handleDelete}
          onRename={handleRename}
        />
      </div>
    </div>
  );
}
