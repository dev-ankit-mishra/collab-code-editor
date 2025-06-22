import { ArrowRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import Button from "../components/Button"

export default function HomePage(){
  return(
    <section className="w-full min-h-screen flex flex-col text-white ">
      <NavBar authRequired={true}/>
      <main className="bg-gradient-to-b from-black via-gray-900 to-[#0c0f1a] w-full   flex-1  flex flex-col justify-center items-center px-6">
        <h1 className="text-4xl font-bold mb-4 tracking-wide shadow-lg">Collaborative Code Editing Made Simple</h1>
        <p className="text-center max-w-xl mb-8 tracking-wide leading-relaxed">Write, edit and share code in real-time with your team. No setup required just open the editor and start coding.</p>
        <div className="flex gap-6">
          
          <Button className='px-6 py-3'>Try Live Editor</Button>
          <Button isTransparent={true} className='px-6 py-3'>Get Started <ArrowRight/></Button>
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