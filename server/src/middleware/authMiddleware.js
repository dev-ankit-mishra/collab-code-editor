import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ✅ Must be service role
);

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔒 Check for missing or malformed token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid token" });
    }

    // 🔓 Extract the actual token
    const token = authHeader.replace("Bearer ", "").trim();

    // 🔐 Validate token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // ✅ Attach user to request for downstream use
    req.user = {
      id: data.user.id,
      email: data.user.email,
    };

    next();
  } catch (err) {
    console.error("❌ Auth error:", err);
    return res.status(500).json({ message: "Server error during authentication" });
  }
};
