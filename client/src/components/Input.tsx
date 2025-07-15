import type { JSX } from "react"

type InputProps={
  id?:string
  type?:string
  className?:string
  placeholder?:string
  name?:string
  
}


export default function Input({type,className,placeholder,name,id}:InputProps):JSX.Element{
  return(
    <>
      <input
                id={id}
                autoComplete="off"
                name={name}
                type={type}
                required
                className={`w-full px-3 py-1 rounded-md bg-gray-800 border border-white/10  text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${className}`}
                placeholder={placeholder}
              />
    </>
  )
}