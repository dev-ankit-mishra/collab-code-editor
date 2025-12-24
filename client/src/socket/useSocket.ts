// src/socket/useSocket.ts
import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "./socket_temp";
import { useAuth } from "../context/useAuth";

export function useSocket() {
  const { session } = useAuth();

  useEffect(() => {
    if (!session?.access_token) return;

    // Connect socket after login
    connectSocket(session.access_token);

    return () => {
      // Optional cleanup on unmount
      // disconnectSocket();
    };
  }, [session]);
}
