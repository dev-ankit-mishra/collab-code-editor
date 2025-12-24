import { useEffect, useState } from "react";
import SettingItem from "./SettingItem";
import StatCard from "./StatCard";
import SplashScreen from "./PageScreenLoader";

export default function Settings() {
  const [loading, setLoading] = useState(true);

  /* ---------- SIMULATE / FETCH SETTINGS DATA ---------- */
  useEffect(() => {
    // Replace this timeout with real API calls later
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  /* ---------- PAGE LOADER ---------- */
  if (loading) {
    return <SplashScreen />;
  }

  /* ---------- PAGE CONTENT ---------- */
  return (
    <section className="w-full p-6 max-w-7xl">
      {/* PAGE HEADER */}
      <h1 className="text-2xl font-semibold tracking-wide">
        Settings
      </h1>
      <p className="text-sm text-zinc-400 mt-1">
        Manage your account preferences and security
      </p>

      {/* ACCOUNT OVERVIEW */}
      <div className="mt-6">
        <h2 className="text-lg font-medium text-white mb-3">
          Account Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard value={10} label="Total projects worked on" />
          <StatCard value={6} label="Created by you" />
          <StatCard value={4} label="Collaborated projects" />
        </div>
      </div>

      {/* ACCOUNT SETTINGS */}
      <div className="mt-10">
        <h2 className="text-lg font-medium text-white mb-3">
          Account Settings
        </h2>

        <div className="space-y-4">
          <SettingItem
            title="Change username"
            description="Update how your name appears across projects and chats"
            actionLabel="Update"
          />

          <SettingItem
            title="Update profile photo"
            description="Change your avatar visible to collaborators"
            actionLabel="Update"
          />

          <SettingItem
            title="Change email address"
            description="Update your registered email"
            actionLabel="Change"
          />

          <SettingItem
            title="Reset password"
            description="Secure your account with a new password"
            actionLabel="Reset"
          />

          <SettingItem
            title="Delete account"
            description="This action is permanent and cannot be undone"
            actionLabel="Delete"
            danger
          />
        </div>
      </div>
    </section>
  );
}
