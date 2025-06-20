import NavBar from "../components/NavBar";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
export default function LogIn() {
  return (
    <section className="w-full h-screen flex flex-col">
      <NavBar authRequired={false} />
      <main className="flex-1 flex flex-col items-center text-white bg-gradient-to-b from-black via-gray-900 to-[#0c0f1a]">
        <div className="bg-black/40 border border-white/10 text-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto mt-20">
          <h2 className="text-2xl font-bold mb-3 text-center">
            Log in to CodeCollab
          </h2>
          <p className="text-sm text-gray-300 text-center mb-5">
            Access your projects, join your team, and start coding together.
          </p>

          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-700 hover:bg-green-800 cursor-pointer text-white py-2 px-4 rounded-md transition"
            >
              Submit
            </button>
          </form>
          <a 
            
            className="text-blue-500  hover:text-blue-400 text-sm cursor-pointer underline block text-center pt-6"
          >
            Forgot Password?
          </a>
          <div className="flex gap-2 justify-between mt-6">
            <button className="rounded-md bg-gray-800 text-gray-300 py-2 px-3 text-sm flex items-center gap-2 hover:bg-gray-900 transition-all duration-200 hover:scale-102 cursor-pointer"><FcGoogle size={18}/>Continue with google</button>
            <button className="rounded-md bg-gray-800 text-gray-300 py-2 px-3 text-sm flex items-center gap-2 hover:scale-102 hover:bg-gray-900 transition-all duration-200 cursor-pointer"><SiGithub size={18}/>Continue with github</button>
          </div>

          <p className="text-sm text-center mt-6 text-gray-300">New to CodeCollab? <a className="text-blue-500 underline hover:text-blue-400 cursor-pointer">Sign up</a> </p>

        </div>
      </main>
    </section>
  );
}
