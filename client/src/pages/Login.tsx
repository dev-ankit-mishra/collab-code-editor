import NavBar from "../components/NavBar";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent,useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function LogIn() {
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading,setLoading] = useState<boolean>(false)

  useEffect(() => {
      if (error) {
        const timer = setTimeout(() => setError(null), 5000);
        return () => clearTimeout(timer);
      }
    }, [error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { success, data, error } = await signInUser(email, password);

      if (!success || !data?.session?.user?.id) {
        setError(error || "Login failed")
        throw new Error(error || "Login failed");
      }

      const userId = data.session.user.id;

      // Fetch user data from your backend (do NOT create user)
      const res = await fetch(`https://codevspace-aqhw.onrender.com/api/users/${userId}`);
      const result = await res.json();

      if (res.status === 404 || !result?.data) {
        setError("User not found in database.")
        throw new Error("User not found in database.");
      }

      // Success — user exists, proceed
      console.log("User data:", result.data);
      navigate("/dashboard", { replace: true });
      setLoading(false)

    } catch (err) {
      console.error("Login error:", err);
      setLoading(false)
    }
  };

  return (
    <section className="w-full h-screen flex flex-col">
      <NavBar authRequired={false} />
      <main className="flex-1 flex flex-col items-center text-white bg-gradient-to-b from-black via-gray-900 to-[#0c0f1a]">
        <div className="bg-black/40 border border-white/10 text-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto mt-20">
          <h2 className="text-2xl font-bold mb-3 text-center">Log in to CoDevSpace</h2>
          <p className="text-sm text-gray-300 text-center mb-5">
            Access your projects, join your team, and start coding together.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
              <Input id="password" name="password" type="password" placeholder="••••••••" />
            </div>

            <Button type="submit" disabled={loading} className="mt-4">{loading?"Logging...":"Log in"}</Button>
          </form>

          {error && <p className="text-red-500 pt-4 text-center">{error}</p>}

          <a className="text-blue-500 hover:text-blue-400 text-sm cursor-pointer underline block text-center mt-4">
            Forgot Password?
          </a>

          <div className="flex gap-2 justify-between mt-4">
            <button className="rounded-md bg-gray-800 text-gray-300 py-2 px-3 text-xs flex items-center gap-2 hover:bg-gray-900 transition-all duration-200 hover:scale-102 cursor-pointer">
              <FcGoogle size={18} /> Continue with Google
            </button>
            <button className="rounded-md bg-gray-800 text-gray-300 py-2 px-3 text-xs flex items-center gap-2 hover:scale-102 hover:bg-gray-900 transition-all duration-200 cursor-pointer">
              <SiGithub size={18} /> Continue with GitHub
            </button>
          </div>

          <p className="text-sm text-center mt-4 text-gray-300">
            New to CoDevSpace? <Link to="/signup" className="text-blue-500 underline hover:text-blue-400 cursor-pointer">Sign up</Link>
          </p>
        </div>
      </main>
    </section>
  );
}
