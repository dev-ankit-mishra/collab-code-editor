import RecentCard from "./RecentCard"
import { useOutletContext } from "react-router-dom"
import type { DashboardOutlet } from "./Types"

export default function AllRepository(){
  const {project}:DashboardOutlet=useOutletContext()
  return(
    <div className="w-full flex flex-col">
          
          <h1 className="text-2xl p-6 font-semibold tracking-wide">All Repository</h1>
          
          <div className="flex items-center flex-wrap gap-8 p-6">
            
            <RecentCard project={project}/>
            
          </div>
        </div>
  )
}