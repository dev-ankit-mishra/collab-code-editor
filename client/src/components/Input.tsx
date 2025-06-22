import type { JSX } from "react"

type InputProps={
  type?:string
  className?:string
  placeholder?:string
}


export default function Input({type="text",className="",placeholder=""}:InputProps):JSX.Element{
  return(
    <>
      <input
                type={type}
                className={`w-full px-3 py-2 rounded-md bg-gray-800 border border-white/10  text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${className}`}
                placeholder={placeholder}
              />
    </>
  )
}