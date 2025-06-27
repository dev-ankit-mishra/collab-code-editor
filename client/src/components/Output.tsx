import Button from "./Button"
import type { JSX } from "react"
import { Play } from 'lucide-react';


type OutputProps={
  onClick : ()=>void
  children : string
  bgClass : string
}


export default function Output({onClick,children,bgClass}:OutputProps):JSX.Element{
  return(
    <main className="w-[34rem] h-full p-4 flex flex-col gap-4">
      <Button className="w-fit px-3" onClick={onClick}><Play size={16}/> Run</Button>
      <div className={`flex-1 p-4 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] ${bgClass}`}>
          {children}
      </div>
    </main>
  )
}