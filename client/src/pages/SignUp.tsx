import NavBar from "../components/NavBar";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
export default function SignUp() {
  return (
    <section className="w-full h-screen flex flex-col ">
      <NavBar authRequired={false} />
      <main className="flex-1 flex flex-col text-gray-300 text-sm  bg-gradient-to-b from-black via-gray-900 to-[#0c0f1a]">
        <div className="flex flex-col p-8 max-w-md bg-black/40 shadow-2xl border border-white/10 rounded-lg mx-auto my-auto">
          <h1 className="text-2xl text-center text-white font-bold mb-3">
            Create your CodeCollab account
          </h1>
          <p className="text-center mb-5">
            Start coding together — join projects, connect with your team, and
            build collaboratively.
          </p>
          <form className="flex flex-col gap-5">
            <div>
              <label className="block pb-1">Full Name</label>
              <input
                className="w-full py-2 px-3 rounded-md transition-all duration-200 bg-gray-800 border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="text"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block pb-1">Email</label>
              <input
                className="w-full py-2 px-3 rounded-md transition-all duration-200 bg-gray-800 border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="email"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block pb-1">Password</label>
              <input
                className="w-full py-2 px-3 rounded-md transition-all duration-200 bg-gray-800 border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block pb-1">Confirm Password</label>
              <input
                className="w-full py-2 px-3 rounded-md transition-all duration-200 bg-gray-800 border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <button className="mt-4 bg-green-700 text-base transition-all duration-200 hover:bg-green-800 cursor-pointer text-white py-2 px-4 rounded-md">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account? <a className="text-blue-500 hover:text-blue-600 underline">Log in</a>
          </p>
          <div className="flex gap-2 justify-between mt-4">
            <button className="rounded-md bg-gray-800 text-gray-300 py-2 px-3 text-sm flex items-center gap-2 hover:bg-gray-900 transition-all duration-200 hover:scale-102 cursor-pointer">
              <FcGoogle size={18} />
              Continue with google
            </button>
            <button className="rounded-md bg-gray-800 text-gray-300 py-2 px-3 text-sm flex items-center gap-2 hover:scale-102 hover:bg-gray-900 transition-all duration-200 cursor-pointer">
              <SiGithub size={18} />
              Continue with github
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
