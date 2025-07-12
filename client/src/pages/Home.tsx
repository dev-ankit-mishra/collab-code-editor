import { ArrowRight } from 'lucide-react';
import NavBar from '../components/NavBar';
import Button from "../components/Button"
import Footer from '../components/Footer';
import {useNavigate} from "react-router-dom"
import { useAuth } from '../context/AuthContext';

export default function HomePage(){
  const {session}=useAuth()
  const navigate=useNavigate()

  function tryEditorBtn(){
    if(session){
      navigate("/dashboard")
    }else{
      navigate("/signup")
    }
  }

  function getStartedBtn(){
    if(session){
      navigate("/dashboard")
    }else{
      navigate("/signup")
    }
  }

  return(
    <section className="w-full min-h-screen flex flex-col text-white ">
      <NavBar authRequired={true}/>
      <main className="bg-gradient-to-b from-black via-gray-900 to-[#0c0f1a] w-full   flex-1  flex flex-col justify-center items-center px-6">
        <h1 className="text-4xl text-center font-bold mb-4 tracking-wide shadow-lg">Collaborative Code Editing Made Simple</h1>
        <p className="text-center max-w-xl mb-8 tracking-wide leading-relaxed">Write, edit and share code in real-time with your team. No setup required just open the editor and start coding.</p>
        <div className="flex gap-6">
          
          <Button className='px-4 py-2 text-gray-300' onClick={tryEditorBtn}>Try Live Editor</Button>
          <Button isTransparent={true} className='px-4 py-2' onClick={getStartedBtn}>Get Started  <ArrowRight size={20}/></Button>
        </div>
      </main>
      <Footer/>
    </section>

  )
}