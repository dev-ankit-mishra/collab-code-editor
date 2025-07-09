import type { JSX } from "react"

type InputProps={
  type?:string
  className?:string
  placeholder?:string
  name?:string
}


export default function Input({type,className,placeholder,name}:InputProps):JSX.Element{
  return(
    <>
      <input
                autoComplete="off"
                name={name}
                type={type}
                className={`w-full px-3 py-2 rounded-md bg-gray-800 border border-white/10  text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${className}`}
                placeholder={placeholder}
              />
    </>
  )
}