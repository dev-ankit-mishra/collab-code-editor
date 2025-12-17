import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import Button from "./Button";
import SplashScreen from "./SplashScreen";

type Invitation = {
  _id: string;
  role: "VIEWER" | "EDITOR";
  projectId: {
    _id: string;
    projectName: string;
  };
};

export default function Invitations() {
  const { session } = useAuth();
  const [invites, setInvites] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------- FETCH INVITES ---------- */
  useEffect(() => {
    async function fetchInvites() {
      try {
        const res = await fetch(
          "https://codevspace-aqhw.onrender.com/api/projects/invites",
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch invites");
        }

        setInvites(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (session) fetchInvites();
  }, [session]);

  /* ---------- ACTIONS ---------- */
  async function handleAction(inviteId: string, action: "accept" | "reject") {
    try {
      await fetch(
        `https://codevspace-aqhw.onrender.com/api/projects/invites/${inviteId}/${action}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      // Remove invite from UI instantly
      setInvites((prev) => prev.filter((i) => i._id !== inviteId));
    } catch (err) {
      console.error("Invite action failed", err);
    }
  }

  /* ---------- UI STATES ---------- */
  if (loading) return <SplashScreen />;

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  if (invites.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-10">
        No pending invitations.
      </p>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {invites.map((invite) => (
        <div
          key={invite._id}
          className="bg-neutral-800 border border-white/10 rounded-lg p-4"
        >
          <h3 className="text-lg font-semibold">
            {invite.projectId.projectName}
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            Permission:{" "}
            {invite.role === "EDITOR" ? "Can edit" : "Can view"}
          </p>

          <div className="flex gap-3 mt-4">
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleAction(invite._id, "accept")}
            >
              Accept
            </Button>

            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => handleAction(invite._id, "reject")}
            >
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
