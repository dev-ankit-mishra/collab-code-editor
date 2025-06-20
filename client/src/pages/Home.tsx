import { ArrowRight } from 'lucide-react';
import NavBar from '../components/NavBar';

export default function HomePage(){
  return(
    <section className="w-full min-h-screen flex flex-col text-white ">
      <NavBar authRequired={true}/>
      <main className="bg-gradient-to-b from-black via-gray-900 to-[#0c0f1a] w-full   flex-1  flex flex-col justify-center items-center px-6">
        <h1 className="text-4xl font-bold mb-4 tracking-wide shadow-lg">Collaborative Code Editing Made Simple</h1>
        <p className="text-center max-w-xl mb-8 tracking-wide leading-relaxed">Write, edit and share code in real-time with your team. No setup required just open the editor and start coding.</p>
        <div className="flex gap-6">
          <button className="rounded-lg bg-green-700  font-medium px-6 py-3 shadow-lg shadow-black/40 hover:bg-green-600 hover:shadow-xl hover:scale-102 transition-all duration-200 cursor-pointer">Try Live Editor</button>
          <button className="rounded-lg px-6 py-3 font-medium text-green-600 border border-green-700 shadow-lg shadow-black/40 hover:shadow-xl flex gap-2 transition-all duration-200 hover:bg-green-500/20 hover:scale-102 cursor-pointer">Get Started <ArrowRight/></button>
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