import { ArrowRight } from 'lucide-react';

export default function HomePage(){
  return(
    <section className="w-full min-h-screen flex flex-col text-white ">
      <header className="bg-[#0c0f1a] opacity-96 shadow-md shadow-black/40 border-b border-b-white/5  w-full py-3 flex flex-row justify-between items-center px-40">
        <h1 className="text-xl font-semibold text-gray-200 hover:text-green-500">CodeCollab</h1>
        <div className="flex flex-row gap-6 items-center">
          <button className="rounded-lg px-4 py-2 font-medium border border-green-800 transition-all duration-200 hover:scale-102 hover:bg-green-600/10 cursor-pointer shadow-lg shadow-black/40 hover:shadow-xl">Log In</button>
          <button className="rounded-lg bg-green-800 font-medium shadow-lg shadow-black/40 hover:bg-green-700 hover:scale-102 hover:shadow-xl transition-all duration-200 cursor-pointer   px-4 py-2">Sign Up</button>
        </div>
      </header>
      <main className="bg-gradient-to-b from-black via-gray-900 to-[#0c0f1a] w-full   flex-1  flex flex-col justify-center items-center px-6">
        <h1 className="text-4xl font-bold mb-4 tracking-wide shadow-lg">Collaborative Code Editing Made Simple</h1>
        <p className="text-center max-w-xl mb-8 tracking-wide leading-relaxed">Write, edit and share code in real-time with your team. No setup required just open the editor and start coding.</p>
        <div className="flex gap-6">
          <button className="rounded-lg bg-green-800 text-lg font-medium px-6 py-3 shadow-lg shadow-black/40 hover:bg-green-700 hover:shadow-xl hover:scale-102 transition-all duration-200 cursor-pointer">Try Live Editor</button>
          <button className="rounded-lg px-6 py-3 font-medium text-green-600 border border-green-800 shadow-lg shadow-black/40 hover:shadow-xl flex gap-2 transition-all duration-200 hover:bg-green-600/10 hover:scale-102 cursor-pointer">Get Started <ArrowRight/></button>
        </div>
      </main>
      <footer className="w-full bg-gray-950 text-gray-400 border-t border-t-white/5">
        <p className="text-center py-2 text-sm  text-gray-300 tracking-wide">
          © 2025 CodeCollab . All rights reserved .
        </p>
      </footer>
    </section>

  )
}