
import { LogOut, Settings, FileText, Users } from "lucide-react";

const mockProjects = [
  { name: "Realtime Chat", role: "Owner", updated: "5 mins ago" },
  { name: "Code Editor UI", role: "Collaborator", updated: "2 hours ago" },
  { name: "Backend API", role: "Viewer", updated: "Yesterday" },
];

const mockSessions = [
  { filename: "auth.js", collaborators: ["@samdev"], duration: "15 mins" },
  { filename: "layout.tsx", collaborators: ["@nina"], duration: "7 mins" }
];

const mockTeams = [
  { name: "Frontend Team", members: 4 },
  { name: "API Squad", members: 3 }
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white py-10 px-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-20 w-20 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-bold">
          JD
        </div>
        <div>
          <h2 className="text-3xl font-semibold">Jane Doe</h2>
          <p className="text-sm text-gray-400">@janedoe — Full-stack Developer</p>
        </div>
        <button className="ml-auto px-4 py-2 bg-white/10 text-sm rounded hover:bg-white/20">Edit Profile</button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-4 bg-gray-800 rounded-md">Projects: <strong>6</strong></div>
        <div className="p-4 bg-gray-800 rounded-md">Active Sessions: <strong>2</strong></div>
        <div className="p-4 bg-gray-800 rounded-md">Languages: <span className="text-sm">JS, TS, Python</span></div>
      </div>

      {/* Projects Section */}
      <div className="mb-10">
        <h3 className="text-xl font-medium mb-4 flex items-center gap-2"><FileText size={18}/> Your Projects</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {mockProjects.map((project, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-md">
              <h4 className="font-medium text-lg">{project.name}</h4>
              <p className="text-sm text-gray-400">Role: {project.role}</p>
              <p className="text-xs text-gray-500 mt-1">Updated {project.updated}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Sessions */}
      <div className="mb-10">
        <h3 className="text-xl font-medium mb-4 flex items-center gap-2"><Users size={18}/> Live Sessions</h3>
        <div className="space-y-4">
          {mockSessions.map((session, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-md flex justify-between items-center">
              <div>
                <p className="text-sm">Editing <strong>{session.filename}</strong></p>
                <p className="text-xs text-gray-400">With {session.collaborators.join(", ")}</p>
              </div>
              <span className="text-xs text-gray-400">{session.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Teams Section */}
      <div className="mb-10">
        <h3 className="text-xl font-medium mb-4">Your Teams</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {mockTeams.map((team, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-md">
              <h4 className="font-medium">{team.name}</h4>
              <p className="text-sm text-gray-400">Members: {team.members}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings and Logout */}
      <div className="mb-10">
        <h3 className="text-xl font-medium mb-4"><Settings size={18} className="inline-block mr-2" /> Settings</h3>
        <div className="space-y-4">
          <button className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">Change Password</button>
          <button className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">Editor Preferences</button>
          <button className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">Notification Settings</button>
        </div>
      </div>

      <div className="text-right">
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded flex items-center gap-2 ml-auto">
          <LogOut size={16}/> Logout
        </button>
      </div>
    </div>
  );
}
