import Button from "./Button"
import {type JSX } from "react"
import { Play } from 'lucide-react';



type OutputProps={
  onClick : ()=>void
  children : string
  bgClass : string
  isLoading: boolean
}


export default function Output({onClick,children,bgClass,isLoading}:OutputProps):JSX.Element{
  return(
    <main className="w-[34rem] h-full p-4 flex flex-col gap-4">
      <Button className="h-8 px-3 w-fit" onClick={onClick} disabled={isLoading}>{isLoading ? (<div className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin'/>) : <><Play size={16}/> Run</>}</Button>
      <div className={`flex-1 p-4 text-sm rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] ${bgClass}`}>
        <h1 className="text-lg font-medium mb-4">Output -</h1>
          {children}
      </div>
    </main>
  )
}