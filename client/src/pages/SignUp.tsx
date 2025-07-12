import NavBar from "../components/NavBar";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import Button from "../components/Button";
import Input from "../components/Input";
import {Link,useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useState,useEffect } from "react";
import type { FormEvent } from "react";

export default function SignUp() {

  const {signUpUser}=useAuth()
  const navigate=useNavigate()

  const [error,setError]=useState<string | null>(null)
  const [loading,setLoading] = useState<boolean>(false)

   useEffect(() => {
        if (error) {
          const timer = setTimeout(() => setError(null), 5000);
          return () => clearTimeout(timer);
        }
      }, [error]);



async function handleSignUp(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true)
  const formData = new FormData(e.currentTarget);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { success, data, error } = await signUpUser!(email, password);
    if (error) {
      setError(error)
      throw new Error(error);
    }

    if (success && data?.session) {
      const userId = data.session.user.id;

      // Create user immediately after signup
      const res = await fetch("https://codevspace-aqhw.onrender.com/api/users/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          userName: name,
          userEmail:email
        })
      });

      const responseData = await res.json();
      console.log("User creation response:", responseData);

      if (!res.ok){
        setError(responseData.message || "Failed to create user")
        throw new Error(responseData.message || "Failed to create user");
      } 

      navigate("/dashboard", { replace: true });
      setLoading(false)
    }
  } catch (err) {
    console.error("Signup error:", err);
    setLoading(false)
  }
}

  return (
    <section className="w-full h-screen flex flex-col ">
      <NavBar authRequired={false} />
      <main className="flex-1 flex flex-col text-gray-300 text-sm  bg-gradient-to-b from-black via-gray-900 to-[#0c0f1a]">
        <div className="flex flex-col p-8 max-w-md bg-black/40 shadow-2xl border border-white/10 rounded-lg mx-auto my-auto">
          <h1 className="text-2xl text-center text-white font-bold mb-3">
            Create your CoDevSpace account
          </h1>
          <p className="text-center mb-5">
            Start coding together — join projects, connect with your team, and
            build collaboratively.
          </p>
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block pb-1">Full Name</label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label htmlFor="email" className="block pb-1">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block pb-1">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" disabled={loading}
             className="mt-4">
              {loading ?"Signing up" :"Sign up"}
            </Button>
            {
              error && <p className="text-red-500 pt-2 text-center">{error}</p>
            }
          </form>
          <p className="text-center mt-4">
            Already have an account? <Link to={"/login"} className="text-blue-500 hover:text-blue-600 underline">Log in</Link>
          </p>
          <div className="flex gap-2 justify-between mt-4">
            <button className="rounded-md bg-gray-800 text-gray-300 py-2 px-3 text-xs flex items-center gap-2 hover:bg-gray-900 transition-all duration-200 hover:scale-102 cursor-pointer">
              <FcGoogle size={18} />
              Continue with google
            </button>
            <button className="rounded-md bg-gray-800 text-gray-300 py-2 px-3 text-xs flex items-center gap-2 hover:scale-102 hover:bg-gray-900 transition-all duration-200 cursor-pointer">
              <SiGithub size={18} />
              Continue with github
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
