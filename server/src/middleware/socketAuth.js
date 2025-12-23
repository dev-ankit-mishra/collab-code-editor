import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return next(new Error("Unauthorized"));
    }

    // 🔥 SAME STRUCTURE AS req.user
    socket.user = {
      id: data.user.id,
      email: data.user.email,
      name:
        data.user.user_metadata?.name ||
        data.user.email?.split("@")[0],
    };

    next();
  } catch (err) {
    console.error("Socket auth error:", err);
    next(new Error("Unauthorized"));
  }
};
